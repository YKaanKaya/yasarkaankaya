"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CodeBlock } from "./CodeBlock"

export function ETLExamples() {
  return (
    <Tabs defaultValue="extraction" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="extraction">Data Extraction</TabsTrigger>
        <TabsTrigger value="transformation">Transformation</TabsTrigger>
        <TabsTrigger value="loading">Loading</TabsTrigger>
      </TabsList>
      
      <TabsContent value="extraction" className="pt-4">
        <div className="flex flex-col gap-4">
          <h3 className="text-xl font-semibold">Data Extraction Process</h3>
          <p className="text-muted-foreground">
            The extraction process pulls data from API endpoints and databases using AWS Glue jobs.
          </p>
          
          <CodeBlock
            language="python"
            title="api_extract.py"
            code={`import requests
import json
import boto3
import os
from datetime import datetime
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def get_api_data(endpoint, api_key, params=None):
    """
    Fetch data from API endpoint with authentication
    """
    headers = {
        'Authorization': f'Bearer {api_key}',
        'Content-Type': 'application/json'
    }
    
    try:
        response = requests.get(endpoint, headers=headers, params=params)
        response.raise_for_status()
        return response.json()
    except requests.exceptions.HTTPError as e:
        logger.error(f"HTTP Error: {e}")
        raise
    except requests.exceptions.ConnectionError as e:
        logger.error(f"Connection Error: {e}")
        raise
    except requests.exceptions.Timeout as e:
        logger.error(f"Timeout Error: {e}")
        raise
    except requests.exceptions.RequestException as e:
        logger.error(f"Request Exception: {e}")
        raise

def upload_to_s3(data, bucket, key):
    """
    Upload data to S3 bucket
    """
    s3_client = boto3.client('s3')
    try:
        s3_client.put_object(
            Body=json.dumps(data),
            Bucket=bucket,
            Key=key
        )
        logger.info(f"Successfully uploaded data to s3://{bucket}/{key}")
    except Exception as e:
        logger.error(f"Error uploading to S3: {e}")
        raise

def lambda_handler(event, context):
    """
    AWS Lambda handler for API data extraction
    """
    # Get environment variables
    api_endpoint = os.environ['API_ENDPOINT']
    api_key = os.environ['API_KEY']
    s3_bucket = os.environ['S3_BUCKET']
    
    # Extract date parameters
    year = event.get('year', datetime.now().strftime('%Y'))
    month = event.get('month', datetime.now().strftime('%m'))
    
    # Get API data
    logger.info(f"Fetching data from {api_endpoint}")
    api_data = get_api_data(api_endpoint, api_key)
    
    # Upload to S3
    s3_key = f"raw/api_data/year={year}/month={month}/data_{datetime.now().strftime('%Y%m%d%H%M%S')}.json"
    upload_to_s3(api_data, s3_bucket, s3_key)
    
    return {
        'statusCode': 200,
        'body': json.dumps(f"Data extraction completed successfully. Written to s3://{s3_bucket}/{s3_key}")
    }`}
          />
          
          <CodeBlock
            language="python"
            title="db_extract_glue_job.py"
            code={`import sys
import datetime
from awsglue.transforms import *
from awsglue.utils import getResolvedOptions
from pyspark.context import SparkContext
from awsglue.context import GlueContext
from awsglue.job import Job
from awsglue.dynamicframe import DynamicFrame
from pyspark.sql import functions as F

# Get job parameters
args = getResolvedOptions(sys.argv, [
    'JOB_NAME',
    'database_name',
    'table_name',
    'connection_name',
    's3_target_path',
    'year',
    'month'
])

# Initialize Spark context
sc = SparkContext()
glueContext = GlueContext(sc)
spark = glueContext.spark_session
job = Job(glueContext)
job.init(args['JOB_NAME'], args)

# Define the JDBC connection
connection_options = {
    "url": f"jdbc:mysql://deftunes-db.cluster-xyz.us-west-2.rds.amazonaws.com:3306/{args['database_name']}",
    "dbtable": args['table_name'],
    "user": "glue_user",
    "password": "{{resolve:secretsmanager:deftunes/db-credentials:SecretString:password}}",
    "classification": "mysql"
}

# Extract data from source database
print(f"Extracting data from {args['database_name']}.{args['table_name']}")
df = glueContext.create_dynamic_frame.from_options(
    connection_type="mysql",
    connection_options=connection_options
).toDF()

# Add extraction metadata
df = df.withColumn("extract_date", F.lit(datetime.datetime.now()))
df = df.withColumn("source_table", F.lit(f"{args['database_name']}.{args['table_name']}"))

# Write to S3
output_path = f"{args['s3_target_path']}/year={args['year']}/month={args['month']}"
print(f"Writing data to {output_path}")

glueContext.write_dynamic_frame.from_options(
    frame=DynamicFrame.fromDF(df, glueContext, "df"),
    connection_type="s3",
    connection_options={"path": output_path},
    format="parquet"
)

# Commit the job
job.commit()`}
          />
        </div>
      </TabsContent>
      
      <TabsContent value="transformation" className="pt-4">
        <div className="flex flex-col gap-4">
          <h3 className="text-xl font-semibold">Data Transformation Logic</h3>
          <p className="text-muted-foreground">
            Transformation processes clean and structure the data for analytics.
          </p>
          
          <CodeBlock
            language="python"
            title="transform_sessions.py"
            code={`import sys
from awsglue.transforms import *
from awsglue.utils import getResolvedOptions
from pyspark.context import SparkContext
from awsglue.context import GlueContext
from awsglue.job import Job
from pyspark.sql import SparkSession
from pyspark.sql import functions as F
from pyspark.sql.types import *
from pyspark.sql.window import Window

# Get job parameters
args = getResolvedOptions(sys.argv, [
    'JOB_NAME',
    'source_path',
    'target_path',
    'year',
    'month'
])

# Initialize Spark context
sc = SparkContext()
glueContext = GlueContext(sc)
spark = glueContext.spark_session
job = Job(glueContext)
job.init(args['JOB_NAME'], args)

# Read source data
source_path = f"{args['source_path']}/year={args['year']}/month={args['month']}"
print(f"Reading data from {source_path}")

df = spark.read.parquet(source_path)

# Data quality check - filter out rows with missing values in critical fields
print("Applying data quality filters")
df_filtered = df.filter(
    F.col("session_id").isNotNull() & 
    F.col("user_id").isNotNull() & 
    F.col("song_id").isNotNull()
)

# Add calculated fields
print("Adding calculated fields")
df_transformed = df_filtered \
    .withColumn("session_date", F.to_date(F.col("session_start_time"))) \
    .withColumn("session_hour", F.hour(F.col("session_start_time"))) \
    .withColumn("session_day_of_week", F.dayofweek(F.col("session_start_time"))) \
    .withColumn("session_month", F.month(F.col("session_start_time"))) \
    .withColumn("session_year", F.year(F.col("session_start_time")))

# Handle duplicates - keep the latest record based on processing_date
print("Handling duplicate records")
window_spec = Window.partitionBy("session_id").orderBy(F.desc("processing_date"))
df_deduped = df_transformed \
    .withColumn("row_num", F.row_number().over(window_spec)) \
    .filter(F.col("row_num") == 1) \
    .drop("row_num")

# Convert duration from milliseconds to seconds if needed
print("Standardizing duration field")
df_final = df_deduped \
    .withColumn(
        "duration_seconds", 
        F.when(F.col("duration_milliseconds").isNotNull(), 
               F.col("duration_milliseconds") / 1000
              ).otherwise(F.col("duration_seconds"))
    ) \
    .drop("duration_milliseconds")

# Write transformed data to target
target_path = f"{args['target_path']}/year={args['year']}/month={args['month']}"
print(f"Writing transformed data to {target_path}")

df_final.write \
    .mode("overwrite") \
    .partitionBy("session_year", "session_month") \
    .parquet(target_path)

print(f"Transformation completed. Processed {df.count()} records.")
job.commit()`}
          />
          
          <CodeBlock
            language="python"
            title="data_enrichment.py"
            code={`import sys
from awsglue.transforms import *
from awsglue.utils import getResolvedOptions
from pyspark.context import SparkContext
from awsglue.context import GlueContext
from awsglue.job import Job
from pyspark.sql import functions as F
from pyspark.sql.types import *

# Get job parameters
args = getResolvedOptions(sys.argv, [
    'JOB_NAME',
    'sessions_path',
    'songs_path',
    'artists_path',
    'target_path',
    'year',
    'month'
])

# Initialize Spark context
sc = SparkContext()
glueContext = GlueContext(sc)
spark = glueContext.spark_session
job = Job(glueContext)
job.init(args['JOB_NAME'], args)

# Load datasets
print("Loading data sources")
sessions_df = spark.read.parquet(f"{args['sessions_path']}/year={args['year']}/month={args['month']}")
songs_df = spark.read.parquet(args['songs_path'])
artists_df = spark.read.parquet(args['artists_path'])

# Enrich sessions with song and artist information
print("Joining data sources for enrichment")
enriched_df = sessions_df.join(
    songs_df, 
    on="song_id", 
    how="left"
).join(
    artists_df, 
    on="artist_id", 
    how="left"
)

# Add geo-enrichment (country region mapping)
country_region_mapping = spark.createDataFrame([
    ("US", "North America"), 
    ("CA", "North America"),
    ("MX", "North America"),
    ("GB", "Europe"),
    ("FR", "Europe"),
    ("DE", "Europe"),
    ("ES", "Europe"),
    ("IT", "Europe"),
    ("JP", "Asia Pacific"),
    ("CN", "Asia Pacific"),
    ("AU", "Asia Pacific"),
    ("BR", "South America"),
    ("AR", "South America")
], ["country_code", "region"])

# Join with region information
print("Adding geographic enrichment")
geo_enriched_df = enriched_df.join(
    country_region_mapping,
    enriched_df.country == country_region_mapping.country_code,
    "left"
).drop("country_code")

# Calculate session metrics
print("Calculating metrics")
final_df = geo_enriched_df.withColumn(
    "is_premium", 
    F.when(F.col("subscription_type") == "premium", 1).otherwise(0)
).withColumn(
    "session_revenue", 
    F.when(F.col("price").isNotNull(), F.col("price")).otherwise(0)
)

# Write enriched data to target
target_path = f"{args['target_path']}/year={args['year']}/month={args['month']}"
print(f"Writing enriched data to {target_path}")

final_df.write \
    .mode("overwrite") \
    .partitionBy("session_year", "session_month", "region") \
    .parquet(target_path)

print(f"Enrichment completed. Processed {sessions_df.count()} sessions.")
job.commit()`}
          />
        </div>
      </TabsContent>
      
      <TabsContent value="loading" className="pt-4">
        <div className="flex flex-col gap-4">
          <h3 className="text-xl font-semibold">Data Loading to Analytics Layer</h3>
          <p className="text-muted-foreground">
            The final stage loads transformed data into analytical databases and data warehouses.
          </p>
          
          <CodeBlock
            language="python"
            title="load_to_redshift.py"
            code={`import sys
import boto3
import time
from awsglue.transforms import *
from awsglue.utils import getResolvedOptions
from pyspark.context import SparkContext
from awsglue.context import GlueContext
from awsglue.job import Job

# Get job parameters
args = getResolvedOptions(sys.argv, [
    'JOB_NAME',
    'source_path',
    'redshift_connection',
    'redshift_db',
    'redshift_schema',
    'redshift_table',
    'redshift_iam_role',
    'year',
    'month'
])

# Initialize Spark context
sc = SparkContext()
glueContext = GlueContext(sc)
spark = glueContext.spark_session
job = Job(glueContext)
job.init(args['JOB_NAME'], args)

# Source S3 path
source_path = f"{args['source_path']}/year={args['year']}/month={args['month']}"
print(f"Loading data from: {source_path}")

# Create dynamic frame from S3
dynamic_frame = glueContext.create_dynamic_frame.from_options(
    connection_type="s3",
    connection_options={
        "paths": [source_path]
    },
    format="parquet"
)

# Map data types appropriately
print("Applying schema mapping")
mapped_dynamic_frame = ApplyMapping.apply(
    frame=dynamic_frame,
    mappings=[
        ("session_id", "string", "session_id", "varchar(64)"),
        ("user_id", "string", "user_id", "varchar(64)"),
        ("song_id", "string", "song_id", "varchar(64)"),
        ("artist_id", "string", "artist_id", "varchar(64)"),
        ("session_start_time", "timestamp", "session_start_time", "timestamp"),
        ("duration_seconds", "int", "duration_seconds", "int"),
        ("price", "double", "price", "decimal(10,2)"),
        ("country", "string", "country", "varchar(2)"),
        ("device_type", "string", "device_type", "varchar(32)"),
        ("session_year", "int", "session_year", "int"),
        ("session_month", "int", "session_month", "int"),
        ("region", "string", "region", "varchar(32)"),
        ("session_revenue", "double", "session_revenue", "decimal(10,2)")
    ]
)

# Set up Redshift connection options
redshift_connection_options = {
    "url": f"jdbc:redshift://{args['redshift_connection']}/{args['redshift_db']}",
    "dbtable": f"{args['redshift_schema']}.{args['redshift_table']}",
    "redshiftTmpDir": args.get("TempDir", "s3://deftunes-glue-temp/"),
    "aws_iam_role": args["redshift_iam_role"]
}

# Truncate and load strategy for the table
print(f"Loading data to Redshift table: {args['redshift_schema']}.{args['redshift_table']}")

# Option 1: Direct load to Redshift
glueContext.write_dynamic_frame.from_jdbc_conf(
    frame=mapped_dynamic_frame,
    catalog_connection=args['redshift_connection'],
    connection_options=redshift_connection_options,
    redshift_tmp_dir=args.get("TempDir", "s3://deftunes-glue-temp/")
)

# Option 2: COPY command (for better performance with larger datasets)
# First, write to S3 in a format Redshift can read
s3_output = f"s3://deftunes-redshift-stage/load/{args['redshift_table']}/{time.time()}"
glueContext.write_dynamic_frame.from_options(
    frame=mapped_dynamic_frame,
    connection_type="s3",
    connection_options={"path": s3_output},
    format="csv"
)

# Execute COPY command via Redshift Data API
print(f"Executing COPY command from {s3_output}")
redshift_client = boto3.client('redshift-data')
copy_sql = f"""
COPY {args['redshift_schema']}.{args['redshift_table']}
FROM '{s3_output}'
IAM_ROLE '{args["redshift_iam_role"]}'
FORMAT AS CSV
DELIMITER ','
REGION 'us-west-2';
"""

response = redshift_client.execute_statement(
    ClusterIdentifier=args['redshift_connection'].split('.')[0],
    Database=args['redshift_db'],
    DbUser='admin',
    Sql=copy_sql
)

print(f"Data loading completed successfully. ID: {response['Id']}")
job.commit()`}
          />
          
          <CodeBlock
            language="python"
            title="load_to_superset.py"
            code={`import os
import pandas as pd
import psycopg2
import sqlalchemy
from sqlalchemy import create_engine
from dotenv import load_dotenv
import logging

# Configure logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

# Load environment variables
load_dotenv()

# Database connection parameters
DB_HOST = os.getenv('SUPERSET_DB_HOST')
DB_PORT = os.getenv('SUPERSET_DB_PORT')
DB_NAME = os.getenv('SUPERSET_DB_NAME')
DB_USER = os.getenv('SUPERSET_DB_USER')
DB_PASSWORD = os.getenv('SUPERSET_DB_PASSWORD')

# Create connection string
conn_string = f"postgresql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}"

def create_analytics_views():
    """
    Create or update analytics views in Superset metadata database
    """
    try:
        # Create SQLAlchemy engine
        engine = create_engine(conn_string)
        
        # Create views for Superset
        logger.info("Creating analytics views")
        
        # Sales by Artist View
        sales_by_artist_sql = """
        CREATE OR REPLACE VIEW analytics.sales_by_artist AS
        SELECT
            da.artist_name,
            date_part('year', fs.session_start_time) AS year,
            date_part('month', fs.session_start_time) AS month,
            SUM(fs.price) AS total_sales,
            COUNT(DISTINCT fs.session_id) AS total_sessions,
            COUNT(DISTINCT fs.user_id) AS unique_listeners
        FROM gold.fact_session fs
        JOIN gold.dim_artists da ON fs.artist_id = da.artist_id
        GROUP BY 1, 2, 3
        ORDER BY total_sales DESC;
        """
        
        # User Activity View
        user_activity_sql = """
        CREATE OR REPLACE VIEW analytics.user_activity AS
        SELECT
            du.user_id,
            du.country,
            du.signup_date,
            du.subscription_type,
            COUNT(DISTINCT fs.session_id) AS session_count,
            SUM(fs.duration_seconds) AS total_listening_time,
            AVG(fs.duration_seconds) AS avg_session_time,
            SUM(fs.price) AS total_spent
        FROM gold.fact_session fs
        JOIN gold.dim_users du ON fs.user_id = du.user_id
        GROUP BY 1, 2, 3, 4;
        """
        
        # Geographic Distribution View
        geographic_sql = """
        CREATE OR REPLACE VIEW analytics.geographic_distribution AS
        SELECT
            du.country,
            COUNT(DISTINCT du.user_id) AS user_count,
            COUNT(DISTINCT fs.session_id) AS session_count,
            SUM(fs.price) AS total_revenue,
            AVG(fs.price) AS avg_revenue_per_session
        FROM gold.fact_session fs
        JOIN gold.dim_users du ON fs.user_id = du.user_id
        GROUP BY 1
        ORDER BY user_count DESC;
        """
        
        # Song Popularity View
        song_popularity_sql = """
        CREATE OR REPLACE VIEW analytics.song_popularity AS
        SELECT
            ds.song_title,
            da.artist_name,
            ds.genre,
            ds.release_year,
            COUNT(DISTINCT fs.session_id) AS play_count,
            COUNT(DISTINCT fs.user_id) AS unique_listeners,
            SUM(fs.price) AS total_revenue
        FROM gold.fact_session fs
        JOIN gold.dim_songs ds ON fs.song_id = ds.song_id
        JOIN gold.dim_artists da ON ds.artist_id = da.artist_id
        GROUP BY 1, 2, 3, 4
        ORDER BY play_count DESC;
        """
        
        # Execute SQL statements
        with engine.connect() as connection:
            connection.execute("CREATE SCHEMA IF NOT EXISTS analytics;")
            connection.execute(sales_by_artist_sql)
            connection.execute(user_activity_sql)
            connection.execute(geographic_sql)
            connection.execute(song_popularity_sql)
            
        logger.info("Successfully created analytics views")
        return True
        
    except Exception as e:
        logger.error(f"Error creating analytics views: {e}")
        return False

if __name__ == "__main__":
    create_analytics_views()`}
          />
        </div>
      </TabsContent>
    </Tabs>
  );
} 