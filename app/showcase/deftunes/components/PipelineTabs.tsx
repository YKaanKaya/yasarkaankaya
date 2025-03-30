"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CodeBlock } from "./CodeBlock";
import Image from "next/image";

export function PipelineTabs() {
  return (
    <Tabs defaultValue="architecture" className="w-full">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="architecture">Architecture</TabsTrigger>
        <TabsTrigger value="workflow">Workflow</TabsTrigger>
        <TabsTrigger value="data-models">Data Models</TabsTrigger>
        <TabsTrigger value="dashboards">Dashboards</TabsTrigger>
      </TabsList>
      
      <TabsContent value="architecture" className="pt-4">
        <div className="flex flex-col gap-4">
          <h3 className="text-xl font-semibold">Data Architecture</h3>
          <p className="text-muted-foreground">
            The DeFtunes pipeline implements a modern lakehouse pattern with multiple layers
            for data processing and analytics.
          </p>
          <div className="rounded-lg overflow-hidden border border-solid border-black/[.08] dark:border-white/[.145] p-2">
            <Image
              src="/images/Capstone-diagram2.png"
              alt="DeFtunes Architecture Diagram"
              width={800}
              height={500}
              className="w-full h-auto"
            />
          </div>
          <h4 className="text-lg font-medium mt-2">Key Components</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg border border-solid border-black/[.08] dark:border-white/[.145]">
              <h5 className="font-medium mb-2">Extract Layer</h5>
              <p className="text-sm">
                AWS Glue jobs extract data from API endpoints and RDS databases,
                storing raw data in S3 landing zone with date-based partitioning.
              </p>
            </div>
            <div className="p-4 rounded-lg border border-solid border-black/[.08] dark:border-white/[.145]">
              <h5 className="font-medium mb-2">Transform Layer</h5>
              <p className="text-sm">
                Glue ETL jobs transform data, adding metadata and proper formatting,
                storing the result in Apache Iceberg tables.
              </p>
            </div>
            <div className="p-4 rounded-lg border border-solid border-black/[.08] dark:border-white/[.145]">
              <h5 className="font-medium mb-2">Data Quality</h5>
              <p className="text-sm">
                AWS Glue Data Quality validates data against rule sets that check
                for completeness, uniqueness, and data type compliance.
              </p>
            </div>
            <div className="p-4 rounded-lg border border-solid border-black/[.08] dark:border-white/[.145]">
              <h5 className="font-medium mb-2">Serving Layer</h5>
              <p className="text-sm">
                Amazon Redshift hosts the dimensional model (star schema) created 
                with dbt, serving as a data warehouse for analytics.
              </p>
            </div>
          </div>
        </div>
      </TabsContent>
      
      <TabsContent value="workflow" className="pt-4">
        <div className="flex flex-col gap-4">
          <h3 className="text-xl font-semibold">Pipeline Workflow</h3>
          <p className="text-muted-foreground">
            Apache Airflow orchestrates the pipeline through DAGs that define the entire data flow
            from extraction to analytics.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <h4 className="text-lg font-medium">API Pipeline DAG</h4>
              <div className="rounded-lg overflow-hidden border border-solid border-black/[.08] dark:border-white/[.145] p-2">
                <Image
                  src="/images/deftunes_api_dag.png"
                  alt="API Pipeline DAG"
                  width={400}
                  height={300}
                  className="w-full h-auto"
                />
              </div>
              <p className="text-sm text-muted-foreground">
                Processes user and session data from API endpoints
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <h4 className="text-lg font-medium">Songs Pipeline DAG</h4>
              <div className="rounded-lg overflow-hidden border border-solid border-black/[.08] dark:border-white/[.145] p-2">
                <Image
                  src="/images/deftunes_songs_dag.png"
                  alt="Songs Pipeline DAG"
                  width={400}
                  height={300}
                  className="w-full h-auto"
                />
              </div>
              <p className="text-sm text-muted-foreground">
                Processes song data from the RDS database
              </p>
            </div>
          </div>
          
          <h4 className="text-lg font-medium mt-4">Workflow Pipeline Code</h4>
          <CodeBlock 
            title="Airflow DAG Definition (deftunes_api_pipeline.py)" 
            language="python"
            code={`@dag(
    default_args=default_args,
    description="DefTunes pipeline. Run AWS Glue jobs with parameters and perform data quality checks",
    schedule_interval="0 0 1 * *",  # Runs at midnight on the first day of every month
    start_date=datetime(2020, 2, 1),
    end_date=datetime(2020, 4, 1),
    catchup=True,
    max_active_runs=1,
    dag_id="deftunes_api_pipeline_dag",
)
def deftunes_pipeline():
    # Pipeline tasks definition
    start = DummyOperator(task_id="start")
    
    # Extract tasks
    api_users_extract_glue_job = GlueJobOperator(...)
    api_sessions_extract_glue_job = GlueJobOperator(...)
    
    # Transform task
    json_transform_glue_job = GlueJobOperator(...)
    
    # Data quality tasks
    dq_check_users_job = GlueDataQualityRuleSetEvaluationRunOperator(...)
    dq_check_sessions_job = GlueDataQualityRuleSetEvaluationRunOperator(...)
    
    # Data modeling task
    task_dbt = DockerOperator(...)
    
    end = DummyOperator(task_id="end")
    
    # Define task dependencies
    start >> [api_users_extract_glue_job, api_sessions_extract_glue_job]
    [api_users_extract_glue_job, api_sessions_extract_glue_job] >> json_transform_glue_job
    json_transform_glue_job >> [dq_check_users_job, dq_check_sessions_job]
    [dq_check_users_job, dq_check_sessions_job] >> task_dbt
    task_dbt >> end`}
          />
        </div>
      </TabsContent>
      
      <TabsContent value="data-models" className="pt-4">
        <div className="flex flex-col gap-4">
          <h3 className="text-xl font-semibold">Data Models</h3>
          <p className="text-muted-foreground">
            The project uses dbt to implement a star schema model and analytical views for business intelligence.
          </p>
          
          <div className="grid grid-cols-1 gap-4">
            <div className="p-4 rounded-lg border border-solid border-black/[.08] dark:border-white/[.145]">
              <h4 className="text-lg font-medium mb-2">Star Schema Model</h4>
              <p className="mb-2">
                The dimensional model consists of fact tables (sessions, purchases) and dimension tables 
                (users, artists, songs, time) to support analytical queries.
              </p>
              <div className="rounded-lg overflow-hidden border border-solid border-black/[.08] dark:border-white/[.145] p-2">
                <Image
                  src="/images/dbt_config.png"
                  alt="dbt Configuration"
                  width={600}
                  height={400}
                  className="w-full h-auto"
                />
              </div>
            </div>
            
            <h4 className="text-lg font-medium mt-2">BI Views</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <CodeBlock 
                title="Sales per Artist View" 
                language="sql"
                code={`SELECT
  date_part('year', fs.session_start_time) AS session_year,
  da.artist_name,
  SUM(fs.price) AS total_sales
FROM {{var("target_schema")}}.fact_session fs
LEFT JOIN {{var("target_schema")}}.dim_artists da
ON fs.artist_id = da.artist_id
GROUP BY 1,2`}
              />
              
              <CodeBlock 
                title="User Activity View" 
                language="sql"
                code={`SELECT
  du.user_id,
  du.country,
  COUNT(DISTINCT fs.session_id) AS session_count,
  SUM(fs.duration_seconds) AS total_listening_time,
  AVG(fs.duration_seconds) AS avg_session_time
FROM {{var("target_schema")}}.fact_session fs
JOIN {{var("target_schema")}}.dim_users du
ON fs.user_id = du.user_id
GROUP BY 1, 2`}
              />
            </div>
          </div>
        </div>
      </TabsContent>
      
      <TabsContent value="dashboards" className="pt-4">
        <div className="flex flex-col gap-4">
          <h3 className="text-xl font-semibold">Analytics Dashboards</h3>
          <p className="text-muted-foreground">
            The pipeline integrates with Apache Superset to provide visualization dashboards
            for business insights.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <h4 className="text-lg font-medium">Superset Dataset Configuration</h4>
              <div className="rounded-lg overflow-hidden border border-solid border-black/[.08] dark:border-white/[.145] p-2">
                <Image
                  src="/images/datasets_ui.png"
                  alt="Superset Datasets"
                  width={500}
                  height={300}
                  className="w-full h-auto"
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <h4 className="text-lg font-medium">Visualization Dashboard</h4>
              <div className="rounded-lg overflow-hidden border border-solid border-black/[.08] dark:border-white/[.145] p-2">
                <Image
                  src="/images/superset_ui.png"
                  alt="Superset Dashboard"
                  width={500}
                  height={300}
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
          
          <div className="mt-4">
            <h4 className="text-lg font-medium">Analytics Use Cases</h4>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li><span className="font-medium">Sales Analysis:</span> Track revenue by artist, country, and time period</li>
              <li><span className="font-medium">User Engagement:</span> Analyze user activity and session patterns</li>
              <li><span className="font-medium">Content Performance:</span> Measure song and artist popularity</li>
              <li><span className="font-medium">Geographic Insights:</span> Visualize user distribution and regional preferences</li>
            </ul>
          </div>
        </div>
      </TabsContent>
    </Tabs>
  );
} 