"use client"

import Image from "next/image";
import { CodeBlock } from "@/components/ui/code-block";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function MedallionArchitecture() {
  return (
    <Tabs defaultValue="bronze" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="bronze">Bronze Layer</TabsTrigger>
        <TabsTrigger value="silver">Silver Layer</TabsTrigger>
        <TabsTrigger value="gold">Gold Layer</TabsTrigger>
      </TabsList>

      <TabsContent value="bronze" className="pt-4">
        <div className="flex flex-col gap-4">
          <h3 className="text-xl font-semibold">Bronze Layer (Raw Data)</h3>
          <p className="text-muted-foreground">
            The raw data layer stores data in its original form without any transformations,
            creating the foundation for downstream processing.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <h4 className="text-lg font-medium">Implementation</h4>
              <div className="p-4 rounded-lg border border-solid border-black/[.08] dark:border-white/[.145]">
                <ul className="list-disc pl-5 space-y-2">
                  <li>Raw data stored in AWS S3 buckets with date-based partitioning</li>
                  <li>Data files preserved in their original format (JSON, CSV)</li>
                  <li>Separation between API data and database extracts</li>
                  <li>Glue crawlers used to catalog the raw data schema</li>
                </ul>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <h4 className="text-lg font-medium">AWS Glue Extract Job</h4>
              <CodeBlock
                language="python"
                title="glue_extract_job.py"
                code={`import sys
from awsglue.transforms import *
from awsglue.utils import getResolvedOptions
from pyspark.context import SparkContext
from awsglue.context import GlueContext
from awsglue.job import Job

args = getResolvedOptions(sys.argv, ['JOB_NAME', 'source_table', 'target_path', 'year', 'month'])

sc = SparkContext()
glueContext = GlueContext(sc)
spark = glueContext.spark_session
job = Job(glueContext)
job.init(args['JOB_NAME'], args)

# Get source data
source_data = glueContext.create_dynamic_frame.from_catalog(
    database="deftunes_database",
    table_name=args['source_table']
)

# Write to S3 (bronze layer)
output_path = f"{args['target_path']}/year={args['year']}/month={args['month']}"

glueContext.write_dynamic_frame.from_options(
    frame=source_data,
    connection_type="s3",
    connection_options={"path": output_path},
    format="json"
)

job.commit()`}
              />
            </div>
          </div>
        </div>
      </TabsContent>

      <TabsContent value="silver" className="pt-4">
        <div className="flex flex-col gap-4">
          <h3 className="text-xl font-semibold">Silver Layer (Cleaned Data)</h3>
          <p className="text-muted-foreground">
            The silver layer contains data that has been cleaned, validated, and transformed
            into a more usable format while maintaining all information from the source.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <h4 className="text-lg font-medium">ETL Pipeline</h4>
              <div className="rounded-lg overflow-hidden border border-solid border-black/[.08] dark:border-white/[.145] p-2">
                <Image
                  src="/images/glue_job_task_output.png"
                  alt="ETL Pipeline"
                  width={500}
                  height={300}
                  className="w-full h-auto"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <h4 className="text-lg font-medium">Data Quality Checks</h4>
              <div className="p-4 rounded-lg border border-solid border-black/[.08] dark:border-white/[.145]">
                <ul className="list-disc pl-5 space-y-2">
                  <li>Type validation (data type check)</li>
                  <li>Completeness checks (presence of required fields)</li>
                  <li>Referential integrity validation</li>
                  <li>Uniqueness constraints on primary keys</li>
                  <li>Range validation for numerical and date fields</li>
                </ul>
              </div>
              <div className="rounded-lg overflow-hidden border border-solid border-black/[.08] dark:border-white/[.145] p-2 mt-2">
                <Image
                  src="/images/data_quality_task_output.png"
                  alt="Data Quality Report"
                  width={500}
                  height={300}
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>

          <h4 className="text-lg font-medium mt-4">Silver Layer Transform Code</h4>
          <CodeBlock
            language="python"
            title="glue_transform_job.py"
            code={`import sys
from awsglue.transforms import *
from awsglue.utils import getResolvedOptions
from pyspark.context import SparkContext
from awsglue.context import GlueContext
from awsglue.job import Job
from pyspark.sql import functions as F
from pyspark.sql.types import *
from datetime import datetime

args = getResolvedOptions(sys.argv, ['JOB_NAME', 'source_path', 'target_path', 'year', 'month'])

sc = SparkContext()
glueContext = GlueContext(sc)
spark = glueContext.spark_session
job = Job(glueContext)
job.init(args['JOB_NAME'], args)

# Read raw data from Bronze layer
source_path = f"{args['source_path']}/year={args['year']}/month={args['month']}"
raw_data = glueContext.create_dynamic_frame.from_options(
    connection_type="s3",
    connection_options={"paths": [source_path]},
    format="json"
).toDF()

# Apply transformations
transformed_data = raw_data.withColumn(
    "processing_date", F.lit(datetime.now().strftime("%Y-%m-%d %H:%M:%S"))
).withColumn(
    "source_file", F.input_file_name()
)

# Type casting and cleaning
if "sessions" in args['source_path']:
    transformed_data = transformed_data.withColumn(
        "duration_seconds", F.col("duration_seconds").cast(IntegerType())
    ).withColumn(
        "session_start_time", F.to_timestamp(F.col("session_start_time"))
    ).filter(
        F.col("user_id").isNotNull()
    )

# Write to Silver layer (Iceberg tables)
output_path = f"{args['target_path']}/year={args['year']}/month={args['month']}"

glueContext.write_dynamic_frame.from_options(
    frame=DynamicFrame.fromDF(transformed_data, glueContext, "transformed_data"),
    connection_type="s3",
    connection_options={"path": output_path},
    format="parquet"
)

job.commit()`}
          />
        </div>
      </TabsContent>

      <TabsContent value="gold" className="pt-4">
        <div className="flex flex-col gap-4">
          <h3 className="text-xl font-semibold">Gold Layer (Analytical Data)</h3>
          <p className="text-muted-foreground">
            The gold layer provides business-ready data models optimized for reporting and analytics,
            including aggregations and dimensional models.
          </p>

          <div className="grid grid-cols-1 gap-4">
            <div className="p-4 rounded-lg border border-solid border-black/[.08] dark:border-white/[.145]">
              <h4 className="text-lg font-medium mb-2">Star Schema Implementation</h4>
              <p className="mb-4">
                The dbt models create a star schema with fact and dimension tables.
                These are loaded into Amazon Redshift for analytical querying.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h5 className="font-medium mb-2">Fact Tables</h5>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>fact_session (streaming sessions)</li>
                    <li>fact_purchase (song purchases)</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-medium mb-2">Dimension Tables</h5>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>dim_users (user demographics)</li>
                    <li>dim_songs (song metadata)</li>
                    <li>dim_artists (artist information)</li>
                    <li>dim_time (time period attributes)</li>
                  </ul>
                </div>
              </div>
              <div className="rounded-lg overflow-hidden border border-solid border-black/[.08] dark:border-white/[.145] p-2 mt-4">
                <Image
                  src="/images/dbt_task_output.png"
                  alt="dbt Model Output"
                  width={600}
                  height={400}
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>

          <h4 className="text-lg font-medium mt-4">dbt Model Definition</h4>
          <CodeBlock
            language="sql"
            title="fact_session.sql"
            code={`{{ config(
    materialized = 'table',
    unique_key = 'session_id',
    sort = 'session_start_time',
    dist = 'user_id'
) }}

WITH source_sessions AS (
    SELECT * FROM {{ source('silver', 'sessions') }}
),
source_songs AS (
    SELECT * FROM {{ source('silver', 'songs') }}
),
enriched_sessions AS (
    SELECT
        s.session_id,
        s.user_id,
        s.song_id,
        so.artist_id,
        s.session_start_time,
        s.duration_seconds,
        s.price,
        s.country,
        s.device_type,
        s.processing_date
    FROM source_sessions s
    LEFT JOIN source_songs so ON s.song_id = so.song_id
)
SELECT
    session_id,
    user_id,
    song_id,
    artist_id,
    session_start_time,
    duration_seconds,
    price,
    country,
    device_type,
    processing_date,
    EXTRACT(year FROM session_start_time) AS session_year,
    EXTRACT(month FROM session_start_time) AS session_month,
    EXTRACT(day FROM session_start_time) AS session_day,
    EXTRACT(hour FROM session_start_time) AS session_hour
FROM enriched_sessions`}
          />
        </div>
      </TabsContent>
    </Tabs>
  );
} 