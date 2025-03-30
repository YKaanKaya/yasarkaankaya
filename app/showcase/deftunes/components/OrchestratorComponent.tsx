"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CodeBlock } from "./CodeBlock"

export function OrchestratorComponent() {
  return (
    <Tabs defaultValue="airflow" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="airflow">Airflow DAGs</TabsTrigger>
        <TabsTrigger value="workflow">Workflow Orchestration</TabsTrigger>
      </TabsList>
      
      <TabsContent value="airflow" className="pt-4">
        <div className="flex flex-col gap-4">
          <h3 className="text-xl font-semibold">Airflow DAG Definitions</h3>
          <p className="text-muted-foreground">
            Apache Airflow is used to orchestrate the entire data pipeline with Directed Acyclic Graphs (DAGs).
          </p>
          
          <CodeBlock
            language="python"
            title="deftunes_api_pipeline.py"
            code={`import os
from datetime import datetime, timedelta

from airflow import DAG
from airflow.operators.dummy import DummyOperator
from airflow.providers.amazon.aws.operators.glue import GlueJobOperator
from airflow.providers.amazon.aws.operators.glue_databrew import GlueDataBrewStartJobRunOperator
from airflow.operators.python import PythonOperator
from airflow.providers.docker.operators.docker import DockerOperator

# Set default arguments for the DAG
default_args = {
    'owner': 'airflow',
    'depends_on_past': False,
    'email_on_failure': True,
    'email_on_retry': False,
    'email': ['data-pipeline-alerts@deftunes.com'],
    'retries': 1,
    'retry_delay': timedelta(minutes=5),
}

@dag(
    default_args=default_args,
    description="DefTunes pipeline for API data. Run AWS Glue jobs with parameters and perform data quality checks",
    schedule_interval="0 0 1 * *",  # Runs at midnight on the first day of every month
    start_date=datetime(2023, 1, 1),
    catchup=True,
    max_active_runs=1,
    tags=['deftunes', 'api'],
    dag_id="deftunes_api_pipeline_dag",
)
def deftunes_api_pipeline():
    # Start the pipeline
    start = DummyOperator(task_id="start")
    
    # Extract API sessions data
    api_sessions_extract = GlueJobOperator(
        task_id='extract_api_sessions',
        job_name='deftunes-extract-api-sessions',
        script_location='s3://deftunes-data-lake-{{ var.value.environment }}/scripts/glue/extract_api_sessions.py',
        s3_bucket='deftunes-data-lake-{{ var.value.environment }}',
        iam_role_name='deftunes-glue-service-role',
        region_name='us-west-2',
        script_args={
            '--year': '{{ execution_date.strftime("%Y") }}',
            '--month': '{{ execution_date.strftime("%m") }}',
            '--source_table': 'api_sessions',
            '--target_path': 's3://deftunes-data-lake-{{ var.value.environment }}/raw/api_sessions'
        },
    )
    
    # Extract API users data
    api_users_extract = GlueJobOperator(
        task_id='extract_api_users',
        job_name='deftunes-extract-api-users',
        script_location='s3://deftunes-data-lake-{{ var.value.environment }}/scripts/glue/extract_api_users.py',
        s3_bucket='deftunes-data-lake-{{ var.value.environment }}',
        iam_role_name='deftunes-glue-service-role',
        region_name='us-west-2',
        script_args={
            '--year': '{{ execution_date.strftime("%Y") }}',
            '--month': '{{ execution_date.strftime("%m") }}',
            '--source_table': 'api_users',
            '--target_path': 's3://deftunes-data-lake-{{ var.value.environment }}/raw/api_users'
        },
    )
    
    # Transform API data
    transform_api_data = GlueJobOperator(
        task_id='transform_api_data',
        job_name='deftunes-transform-api-data',
        script_location='s3://deftunes-data-lake-{{ var.value.environment }}/scripts/glue/transform_api_data.py',
        s3_bucket='deftunes-data-lake-{{ var.value.environment }}',
        iam_role_name='deftunes-glue-service-role',
        region_name='us-west-2',
        script_args={
            '--year': '{{ execution_date.strftime("%Y") }}',
            '--month': '{{ execution_date.strftime("%m") }}',
            '--sessions_source_path': 's3://deftunes-data-lake-{{ var.value.environment }}/raw/api_sessions',
            '--users_source_path': 's3://deftunes-data-lake-{{ var.value.environment }}/raw/api_users',
            '--target_path': 's3://deftunes-data-lake-{{ var.value.environment }}/silver/api_data'
        },
    )
    
    # Data quality check for sessions
    dq_check_sessions = GlueDataBrewStartJobRunOperator(
        task_id='data_quality_sessions',
        job_name='deftunes-dq-sessions',
        log_group_name='/aws-glue/databrew',
        aws_conn_id='aws_default',
    )
    
    # Data quality check for users
    dq_check_users = GlueDataBrewStartJobRunOperator(
        task_id='data_quality_users',
        job_name='deftunes-dq-users',
        log_group_name='/aws-glue/databrew',
        aws_conn_id='aws_default',
    )
    
    # Run dbt for data modeling
    dbt_models = DockerOperator(
        task_id='run_dbt_models',
        image='deftunes/dbt:latest',
        api_version='auto',
        auto_remove=True,
        command=f'run --profiles-dir /dbt --project-dir /dbt --target {{ var.value.environment }} --vars \\'{{{{ "target_schema": "gold", "year": "{{ execution_date.strftime(\\"%Y\\") }}", "month": "{{ execution_date.strftime(\\"%m\\") }}" }}}}\\' --select tag:api',
        docker_url='unix://var/run/docker.sock',
        volumes=['/opt/airflow/dbt:/dbt'],
        environment={
            'DBT_REDSHIFT_USER': '{{ var.value.redshift_user }}',
            'DBT_REDSHIFT_PASSWORD': '{{ var.value.redshift_password }}',
            'DBT_REDSHIFT_HOST': '{{ var.value.redshift_host }}',
            'DBT_REDSHIFT_DATABASE': 'deftunes',
            'DBT_SCHEMA': 'gold',
            'AWS_ACCESS_KEY_ID': '{{ var.value.aws_access_key_id }}',
            'AWS_SECRET_ACCESS_KEY': '{{ var.value.aws_secret_access_key }}',
            'AWS_REGION': 'us-west-2'
        },
    )
    
    # Create analytics views in Redshift
    create_analytics_views = DockerOperator(
        task_id='create_analytics_views',
        image='deftunes/python:latest',
        api_version='auto',
        auto_remove=True,
        command='python /scripts/create_analytics_views.py',
        docker_url='unix://var/run/docker.sock',
        volumes=['/opt/airflow/scripts:/scripts'],
        environment={
            'REDSHIFT_USER': '{{ var.value.redshift_user }}',
            'REDSHIFT_PASSWORD': '{{ var.value.redshift_password }}',
            'REDSHIFT_HOST': '{{ var.value.redshift_host }}',
            'REDSHIFT_DATABASE': 'deftunes',
            'REDSHIFT_PORT': '5439'
        },
    )
    
    # End the pipeline
    end = DummyOperator(task_id="end")
    
    # Set task dependencies
    start >> [api_sessions_extract, api_users_extract]
    [api_sessions_extract, api_users_extract] >> transform_api_data
    transform_api_data >> [dq_check_sessions, dq_check_users]
    [dq_check_sessions, dq_check_users] >> dbt_models
    dbt_models >> create_analytics_views
    create_analytics_views >> end

# Create the DAG
deftunes_api_dag = deftunes_api_pipeline()`}
          />
          
          <CodeBlock
            language="python"
            title="deftunes_songs_pipeline.py"
            code={`import os
from datetime import datetime, timedelta

from airflow import DAG
from airflow.operators.dummy import DummyOperator
from airflow.providers.amazon.aws.operators.glue import GlueJobOperator
from airflow.providers.amazon.aws.operators.glue_databrew import GlueDataBrewStartJobRunOperator
from airflow.operators.python import PythonOperator
from airflow.providers.docker.operators.docker import DockerOperator

# Set default arguments for the DAG
default_args = {
    'owner': 'airflow',
    'depends_on_past': False,
    'email_on_failure': True,
    'email_on_retry': False,
    'email': ['data-pipeline-alerts@deftunes.com'],
    'retries': 1,
    'retry_delay': timedelta(minutes=5),
}

@dag(
    default_args=default_args,
    description="DefTunes pipeline for Songs data. Extract from database and process through the pipeline",
    schedule_interval="0 0 1 * *",  # Runs at midnight on the first day of every month
    start_date=datetime(2023, 1, 1),
    catchup=True,
    max_active_runs=1,
    tags=['deftunes', 'songs'],
    dag_id="deftunes_songs_pipeline_dag",
)
def deftunes_songs_pipeline():
    # Start the pipeline
    start = DummyOperator(task_id="start")
    
    # Extract songs data from database
    songs_extract = GlueJobOperator(
        task_id='extract_songs_data',
        job_name='deftunes-extract-songs',
        script_location='s3://deftunes-data-lake-{{ var.value.environment }}/scripts/glue/extract_songs.py',
        s3_bucket='deftunes-data-lake-{{ var.value.environment }}',
        iam_role_name='deftunes-glue-service-role',
        region_name='us-west-2',
        script_args={
            '--year': '{{ execution_date.strftime("%Y") }}',
            '--month': '{{ execution_date.strftime("%m") }}',
            '--database_name': 'deftunes',
            '--table_name': 'songs',
            '--connection_name': 'deftunes-db-connection',
            '--s3_target_path': 's3://deftunes-data-lake-{{ var.value.environment }}/raw/songs'
        },
    )
    
    # Extract artists data from database
    artists_extract = GlueJobOperator(
        task_id='extract_artists_data',
        job_name='deftunes-extract-artists',
        script_location='s3://deftunes-data-lake-{{ var.value.environment }}/scripts/glue/extract_artists.py',
        s3_bucket='deftunes-data-lake-{{ var.value.environment }}',
        iam_role_name='deftunes-glue-service-role',
        region_name='us-west-2',
        script_args={
            '--year': '{{ execution_date.strftime("%Y") }}',
            '--month': '{{ execution_date.strftime("%m") }}',
            '--database_name': 'deftunes',
            '--table_name': 'artists',
            '--connection_name': 'deftunes-db-connection',
            '--s3_target_path': 's3://deftunes-data-lake-{{ var.value.environment }}/raw/artists'
        },
    )
    
    # Transform songs data
    transform_songs = GlueJobOperator(
        task_id='transform_songs_data',
        job_name='deftunes-transform-songs',
        script_location='s3://deftunes-data-lake-{{ var.value.environment }}/scripts/glue/transform_songs.py',
        s3_bucket='deftunes-data-lake-{{ var.value.environment }}',
        iam_role_name='deftunes-glue-service-role',
        region_name='us-west-2',
        script_args={
            '--year': '{{ execution_date.strftime("%Y") }}',
            '--month': '{{ execution_date.strftime("%m") }}',
            '--source_path': 's3://deftunes-data-lake-{{ var.value.environment }}/raw/songs',
            '--target_path': 's3://deftunes-data-lake-{{ var.value.environment }}/silver/songs'
        },
    )
    
    # Transform artists data
    transform_artists = GlueJobOperator(
        task_id='transform_artists_data',
        job_name='deftunes-transform-artists',
        script_location='s3://deftunes-data-lake-{{ var.value.environment }}/scripts/glue/transform_artists.py',
        s3_bucket='deftunes-data-lake-{{ var.value.environment }}',
        iam_role_name='deftunes-glue-service-role',
        region_name='us-west-2',
        script_args={
            '--year': '{{ execution_date.strftime("%Y") }}',
            '--month': '{{ execution_date.strftime("%m") }}',
            '--source_path': 's3://deftunes-data-lake-{{ var.value.environment }}/raw/artists',
            '--target_path': 's3://deftunes-data-lake-{{ var.value.environment }}/silver/artists'
        },
    )
    
    # Enrich songs with artist data
    enrich_songs = GlueJobOperator(
        task_id='enrich_songs_data',
        job_name='deftunes-enrich-songs',
        script_location='s3://deftunes-data-lake-{{ var.value.environment }}/scripts/glue/enrich_songs.py',
        s3_bucket='deftunes-data-lake-{{ var.value.environment }}',
        iam_role_name='deftunes-glue-service-role',
        region_name='us-west-2',
        script_args={
            '--year': '{{ execution_date.strftime("%Y") }}',
            '--month': '{{ execution_date.strftime("%m") }}',
            '--songs_path': 's3://deftunes-data-lake-{{ var.value.environment }}/silver/songs',
            '--artists_path': 's3://deftunes-data-lake-{{ var.value.environment }}/silver/artists',
            '--target_path': 's3://deftunes-data-lake-{{ var.value.environment }}/silver/enriched_songs'
        },
    )
    
    # Data quality check
    dq_check = GlueDataBrewStartJobRunOperator(
        task_id='data_quality_songs',
        job_name='deftunes-dq-songs',
        log_group_name='/aws-glue/databrew',
        aws_conn_id='aws_default',
    )
    
    # Run dbt for data modeling
    dbt_models = DockerOperator(
        task_id='run_dbt_models',
        image='deftunes/dbt:latest',
        api_version='auto',
        auto_remove=True,
        command=f'run --profiles-dir /dbt --project-dir /dbt --target {{ var.value.environment }} --vars \\'{{{{ "target_schema": "gold", "year": "{{ execution_date.strftime(\\"%Y\\") }}", "month": "{{ execution_date.strftime(\\"%m\\") }}" }}}}\\' --select tag:songs',
        docker_url='unix://var/run/docker.sock',
        volumes=['/opt/airflow/dbt:/dbt'],
        environment={
            'DBT_REDSHIFT_USER': '{{ var.value.redshift_user }}',
            'DBT_REDSHIFT_PASSWORD': '{{ var.value.redshift_password }}',
            'DBT_REDSHIFT_HOST': '{{ var.value.redshift_host }}',
            'DBT_REDSHIFT_DATABASE': 'deftunes',
            'DBT_SCHEMA': 'gold',
            'AWS_ACCESS_KEY_ID': '{{ var.value.aws_access_key_id }}',
            'AWS_SECRET_ACCESS_KEY': '{{ var.value.aws_secret_access_key }}',
            'AWS_REGION': 'us-west-2'
        },
    )
    
    # Create analytics views
    create_analytics_views = DockerOperator(
        task_id='create_analytics_views',
        image='deftunes/python:latest',
        api_version='auto',
        auto_remove=True,
        command='python /scripts/create_analytics_views.py',
        docker_url='unix://var/run/docker.sock',
        volumes=['/opt/airflow/scripts:/scripts'],
        environment={
            'REDSHIFT_USER': '{{ var.value.redshift_user }}',
            'REDSHIFT_PASSWORD': '{{ var.value.redshift_password }}',
            'REDSHIFT_HOST': '{{ var.value.redshift_host }}',
            'REDSHIFT_DATABASE': 'deftunes',
            'REDSHIFT_PORT': '5439'
        },
    )
    
    # End the pipeline
    end = DummyOperator(task_id="end")
    
    # Set task dependencies
    start >> [songs_extract, artists_extract]
    songs_extract >> transform_songs
    artists_extract >> transform_artists
    [transform_songs, transform_artists] >> enrich_songs
    enrich_songs >> dq_check
    dq_check >> dbt_models
    dbt_models >> create_analytics_views
    create_analytics_views >> end

# Create the DAG
deftunes_songs_dag = deftunes_songs_pipeline()`}
          />
        </div>
      </TabsContent>
      
      <TabsContent value="workflow" className="pt-4">
        <div className="flex flex-col gap-4">
          <h3 className="text-xl font-semibold">Pipeline Workflow Orchestration</h3>
          <p className="text-muted-foreground">
            Details of how the pipeline is orchestrated across different systems.
          </p>
          
          <div className="p-6 border border-solid border-black/[.08] dark:border-white/[.145] rounded-lg">
            <h4 className="text-lg font-medium mb-3">Orchestration Components</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h5 className="font-medium mb-2">Apache Airflow</h5>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Centralized orchestration platform</li>
                  <li>Manages DAG dependencies and scheduling</li>
                  <li>Monitors job execution and provides alerting</li>
                  <li>Handles backfills and retries</li>
                </ul>
              </div>
              
              <div>
                <h5 className="font-medium mb-2">AWS Glue Workflows</h5>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Manages AWS-specific job dependencies</li>
                  <li>Coordinates Glue jobs, crawlers, and triggers</li>
                  <li>Provides visual workflow representation</li>
                  <li>Captures execution metadata</li>
                </ul>
              </div>
            </div>
            
            <h4 className="text-lg font-medium mb-3">Scheduling Strategy</h4>
            <p className="mb-3">
              The pipeline is scheduled to run on a monthly basis, with different components having specific schedules:
            </p>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-300 dark:divide-gray-700">
                <thead>
                  <tr>
                    <th className="px-3 py-3 bg-gray-100 dark:bg-gray-800 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Component</th>
                    <th className="px-3 py-3 bg-gray-100 dark:bg-gray-800 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Schedule</th>
                    <th className="px-3 py-3 bg-gray-100 dark:bg-gray-800 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Description</th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-800">
                  <tr>
                    <td className="px-3 py-4 whitespace-nowrap text-sm">API Data Pipeline</td>
                    <td className="px-3 py-4 whitespace-nowrap text-sm"><code>0 0 1 * *</code></td>
                    <td className="px-3 py-4 text-sm">Runs at midnight on the first day of every month</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-4 whitespace-nowrap text-sm">Songs Pipeline</td>
                    <td className="px-3 py-4 whitespace-nowrap text-sm"><code>0 0 1 * *</code></td>
                    <td className="px-3 py-4 text-sm">Runs at midnight on the first day of every month</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-4 whitespace-nowrap text-sm">Data Quality Checks</td>
                    <td className="px-3 py-4 whitespace-nowrap text-sm">Event-driven</td>
                    <td className="px-3 py-4 text-sm">Triggered after transformation jobs complete</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-4 whitespace-nowrap text-sm">Analytics Refresh</td>
                    <td className="px-3 py-4 whitespace-nowrap text-sm"><code>0 6 2 * *</code></td>
                    <td className="px-3 py-4 text-sm">Runs at 6 AM on the second day of every month</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <h4 className="text-lg font-medium mt-6 mb-3">Error Handling and Recovery</h4>
            <p className="mb-3">
              The pipeline includes comprehensive error handling and recovery mechanisms:
            </p>
            
            <ul className="list-disc pl-5 space-y-2">
              <li><span className="font-medium">Retries:</span> Each task has configurable retry settings, with most tasks set to retry once after a 5-minute delay</li>
              <li><span className="font-medium">Alerts:</span> Email notifications are sent to the data team when tasks fail after exhausting retries</li>
              <li><span className="font-medium">Dead-letter Handling:</span> Failed records are stored in a separate S3 location for later analysis and recovery</li>
              <li><span className="font-medium">Checkpointing:</span> Glue jobs use checkpointing to resume from the last successful point after failures</li>
              <li><span className="font-medium">Transaction Support:</span> Apache Iceberg tables provide transactional guarantees to prevent data corruption</li>
            </ul>
            
            <h4 className="text-lg font-medium mt-6 mb-3">Monitoring and Observability</h4>
            <p className="mb-3">
              Pipeline health and performance are monitored through several channels:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 border border-solid border-black/[.08] dark:border-white/[.145] rounded-lg">
                <h5 className="font-medium mb-2">CloudWatch Metrics</h5>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>Job runtime duration</li>
                  <li>Job memory utilization</li>
                  <li>Records processed/failed</li>
                  <li>DataBrew quality score</li>
                </ul>
              </div>
              
              <div className="p-4 border border-solid border-black/[.08] dark:border-white/[.145] rounded-lg">
                <h5 className="font-medium mb-2">Airflow Dashboard</h5>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>DAG run history</li>
                  <li>Task success/failure rates</li>
                  <li>Execution timelines</li>
                  <li>Gantt charts of task duration</li>
                </ul>
              </div>
              
              <div className="p-4 border border-solid border-black/[.08] dark:border-white/[.145] rounded-lg">
                <h5 className="font-medium mb-2">Data Quality Metrics</h5>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>Completeness scores</li>
                  <li>Validation rule pass rates</li>
                  <li>Schema drift detection</li>
                  <li>Data freshness metrics</li>
                </ul>
              </div>
              
              <div className="p-4 border border-solid border-black/[.08] dark:border-white/[.145] rounded-lg">
                <h5 className="font-medium mb-2">Custom Pipeline Dashboard</h5>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>End-to-end pipeline health</li>
                  <li>SLA compliance tracking</li>
                  <li>Data volume trends</li>
                  <li>Cross-system dependencies</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </TabsContent>
    </Tabs>
  );
} 