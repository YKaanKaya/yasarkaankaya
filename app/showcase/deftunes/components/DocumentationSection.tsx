"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CodeBlock } from "./CodeBlock"

export function DocumentationSection() {
  return (
    <Tabs defaultValue="setup" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="setup">Setup Guide</TabsTrigger>
        <TabsTrigger value="usage">Usage Instructions</TabsTrigger>
        <TabsTrigger value="architecture">Architecture Document</TabsTrigger>
      </TabsList>
      
      <TabsContent value="setup" className="pt-4">
        <div className="flex flex-col gap-4">
          <h3 className="text-xl font-semibold">Project Setup Guide</h3>
          <p className="text-muted-foreground">
            Follow these steps to set up the DeFtunes data pipeline in your environment.
          </p>
          
          <div className="p-6 border border-solid border-black/[.08] dark:border-white/[.145] rounded-lg">
            <h4 className="text-lg font-medium mb-3">Prerequisites</h4>
            <ul className="list-disc pl-5 space-y-2">
              <li>AWS Account with appropriate permissions</li>
              <li>Terraform v1.5+ installed</li>
              <li>Docker and Docker Compose installed</li>
              <li>Python 3.10+ installed</li>
              <li>AWS CLI configured with appropriate credentials</li>
            </ul>
            
            <h4 className="text-lg font-medium mt-6 mb-3">Installation Steps</h4>
            <ol className="list-decimal pl-5 space-y-3">
              <li>
                <p className="font-semibold">Clone the repository</p>
                <CodeBlock
                  language="bash"
                  code={`git clone https://github.com/YKaanKaya/deftunes-data-pipeline.git
cd deftunes-data-pipeline`}
                />
              </li>
              
              <li>
                <p className="font-semibold">Create infrastructure with Terraform</p>
                <CodeBlock
                  language="bash"
                  code={`cd terraform
# Initialize Terraform
terraform init

# Create a terraform.tfvars file with your configuration
cat > terraform.tfvars << EOL
aws_region       = "us-west-2"
environment      = "dev"
redshift_username = "admin"
redshift_password = "YourSecurePassword"
redshift_node_type = "dc2.large"
db_username      = "admin"
db_password      = "YourSecureDBPassword"
EOL

# Apply the Terraform configuration
terraform apply`}
                />
              </li>
              
              <li>
                <p className="font-semibold">Set up Airflow</p>
                <CodeBlock
                  language="bash"
                  code={`cd ../airflow

# Build the Airflow Docker image
docker build -t deftunes-airflow:latest .

# Create an .env file with your AWS credentials
cat > .env << EOL
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
AWS_REGION=us-west-2
AIRFLOW_WWW_USER_USERNAME=admin
AIRFLOW_WWW_USER_PASSWORD=admin
EOL

# Start Airflow services
docker-compose up -d`}
                />
              </li>
              
              <li>
                <p className="font-semibold">Configure data sources</p>
                <p className="text-sm text-muted-foreground mb-2">Edit the configuration files in the <code>config</code> directory to point to your data sources:</p>
                <CodeBlock
                  language="bash"
                  code={`cd ../config
# Edit the source configuration file
nano sources.yaml`}
                />
              </li>
              
              <li>
                <p className="font-semibold">Test the pipeline</p>
                <CodeBlock
                  language="bash"
                  code={`# Trigger a test run of the workflow
cd ../scripts
./trigger_workflow.sh deftunes-api-data-workflow-dev`}
                />
              </li>
            </ol>
          </div>
        </div>
      </TabsContent>
      
      <TabsContent value="usage" className="pt-4">
        <div className="flex flex-col gap-4">
          <h3 className="text-xl font-semibold">Usage Instructions</h3>
          <p className="text-muted-foreground">
            Learn how to use the DeFtunes data pipeline to process and analyze music streaming data.
          </p>
          
          <div className="p-6 border border-solid border-black/[.08] dark:border-white/[.145] rounded-lg">
            <h4 className="text-lg font-medium mb-3">Running the Pipeline</h4>
            <p className="mb-4">The pipeline is scheduled to run automatically on a monthly basis. However, you can also trigger it manually.</p>
            
            <h5 className="font-medium mt-4 mb-2">1. Using Airflow UI</h5>
            <ol className="list-decimal pl-5 space-y-2">
              <li>Open the Airflow UI at <code>http://localhost:8080</code></li>
              <li>Navigate to the DAGs view</li>
              <li>Locate the <code>deftunes_api_pipeline_dag</code> or <code>deftunes_songs_pipeline_dag</code></li>
              <li>Trigger the DAG by clicking the &quot;Play&quot; button and selecting the appropriate execution date</li>
            </ol>
            
            <h5 className="font-medium mt-4 mb-2">2. Using AWS Console</h5>
            <ol className="list-decimal pl-5 space-y-2">
              <li>Log in to the AWS Management Console</li>
              <li>Navigate to AWS Glue → Workflows</li>
              <li>Select the <code>deftunes-api-data-workflow-dev</code> workflow</li>
              <li>Click &quot;Run&quot; to start the workflow</li>
            </ol>
            
            <h5 className="font-medium mt-4 mb-2">3. Using AWS CLI</h5>
            <CodeBlock
              language="bash"
              code={`# Start the Glue workflow
aws glue start-workflow-run --name deftunes-api-data-workflow-dev

# Start a specific Glue job
aws glue start-job-run --job-name deftunes-extract-api-sessions --arguments '{"--year":"2023","--month":"06"}'`}
            />
            
            <h4 className="text-lg font-medium mt-6 mb-3">Accessing the Data</h4>
            <p className="mb-4">The processed data is available in multiple locations based on the layer:</p>
            
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Raw Data (Bronze):</strong> <code>s3://deftunes-data-lake-dev/raw/</code></li>
              <li><strong>Processed Data (Silver):</strong> <code>s3://deftunes-data-lake-dev/silver/</code></li>
              <li><strong>Analytics Tables (Gold):</strong> Redshift cluster <code>deftunes-warehouse-dev</code>, schema <code>gold</code></li>
            </ul>
            
            <h5 className="font-medium mt-4 mb-2">Querying Data in Redshift</h5>
            <p className="mb-2">Connect to Redshift and run analytical queries:</p>
            <CodeBlock
              language="sql"
              code={`-- Connect to Redshift using your preferred SQL client
-- Example query: Top 10 artists by revenue
SELECT
    da.artist_name,
    SUM(fs.price) AS total_revenue,
    COUNT(DISTINCT fs.session_id) AS play_count
FROM gold.fact_session fs
JOIN gold.dim_artists da ON fs.artist_id = da.artist_id
GROUP BY da.artist_name
ORDER BY total_revenue DESC
LIMIT 10;`}
            />
            
            <h5 className="font-medium mt-4 mb-2">Visualization with Apache Superset</h5>
            <p className="mb-2">Access the Superset dashboard:</p>
            <ol className="list-decimal pl-5 space-y-2">
              <li>Open Superset at the configured URL</li>
              <li>Navigate to the &quot;DeFtunes Analytics&quot; dashboard</li>
              <li>Use filters to explore data by time period, geography, or artist</li>
            </ol>
          </div>
        </div>
      </TabsContent>
      
      <TabsContent value="architecture" className="pt-4">
        <div className="flex flex-col gap-4">
          <h3 className="text-xl font-semibold">Architecture Documentation</h3>
          <p className="text-muted-foreground">
            Detailed documentation of the pipeline architecture and design decisions.
          </p>
          
          <div className="p-6 border border-solid border-black/[.08] dark:border-white/[.145] rounded-lg">
            <h4 className="text-lg font-medium mb-3">Architecture Overview</h4>
            <p className="mb-4">
              The DeFtunes data pipeline is designed as a modern lakehouse architecture, combining the flexibility of a data lake with the analytics capabilities of a data warehouse. It follows the medallion architecture pattern with three layers: Bronze (raw), Silver (transformed), and Gold (analytics).
            </p>
            
            <h5 className="font-medium mt-4 mb-2">Core Components</h5>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>Data Extraction:</strong> AWS Lambda and Glue jobs extract data from API endpoints and source databases.
              </li>
              <li>
                <strong>Data Storage:</strong> S3 serves as the primary storage for all data layers, with Iceberg tables providing versioning and metadata management.
              </li>
              <li>
                <strong>Data Processing:</strong> AWS Glue with PySpark performs ETL operations, with data quality checks built into the pipeline.
              </li>
              <li>
                <strong>Data Modeling:</strong> dbt builds the dimensional model in Redshift, transforming data into analytics-ready tables.
              </li>
              <li>
                <strong>Orchestration:</strong> Apache Airflow orchestrates the entire pipeline, providing dependency management and scheduling.
              </li>
              <li>
                <strong>Visualization:</strong> Apache Superset provides a dashboard for business users to explore data.
              </li>
            </ul>
            
            <h4 className="text-lg font-medium mt-6 mb-3">Data Flow</h4>
            <p className="mb-2 font-medium">1. Data Ingestion</p>
            <ul className="list-disc pl-5 space-y-1 mb-3">
              <li>Session data from API endpoints is extracted daily via Lambda functions</li>
              <li>Song and artist data from the MySQL database is extracted via Glue jobs</li>
              <li>All raw data is stored in S3 in the Bronze layer with date-based partitioning</li>
            </ul>
            
            <p className="mb-2 font-medium">2. Data Processing</p>
            <ul className="list-disc pl-5 space-y-1 mb-3">
              <li>Glue jobs transform and clean the data, performing column renaming, type casting, and data validation</li>
              <li>Duplicate records are removed and data quality checks are performed</li>
              <li>Transformed data is stored in the Silver layer as Apache Iceberg tables</li>
            </ul>
            
            <p className="mb-2 font-medium">3. Data Modeling</p>
            <ul className="list-disc pl-5 space-y-1 mb-3">
              <li>dbt models create a star schema with fact and dimension tables</li>
              <li>Data is loaded into Redshift for fast analytical queries</li>
              <li>Additional views and aggregates are created for specific analytical needs</li>
            </ul>
            
            <h4 className="text-lg font-medium mt-6 mb-3">Design Decisions</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h5 className="font-medium mb-2">Why AWS Glue?</h5>
                <p className="text-sm mb-3">AWS Glue was chosen for its serverless nature, which reduces operational overhead and provides automatic scaling. It also integrates well with other AWS services like S3 and Data Quality.</p>
              </div>
              <div>
                <h5 className="font-medium mb-2">Why Apache Iceberg?</h5>
                <p className="text-sm">Iceberg provides table format capabilities on top of S3, enabling version control, schema evolution, and efficient querying. This gives us &quot;database-like&quot; features in our &quot;data lake&quot; storage.</p>
              </div>
              <div>
                <h5 className="font-medium mb-2">Why Redshift for Analytics?</h5>
                <p className="text-sm mb-3">Redshift&apos;s MPP architecture makes it well-suited for analytical workloads, with excellent performance for complex queries and aggregations over large datasets.</p>
              </div>
              <div>
                <h5 className="font-medium mb-2">Why dbt?</h5>
                <p className="text-sm mb-3">dbt enables version-controlled, testable transformations using SQL, making it accessible to data analysts. It also provides documentation and lineage features critical for data governance.</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h5 className="font-medium mb-2">Why Medallion Architecture?</h5>
                <p className="text-sm">The medallion approach (Bronze/Silver/Gold) provides clean separation of concerns and enables different teams to work at different layers. It also supports the &quot;extract once, transform many times&quot; philosophy, preserving raw data for future use cases.</p>
              </div>
            </div>
            
            <h4 className="text-lg font-medium mt-6 mb-3">Security and Governance</h4>
            <ul className="list-disc pl-5 space-y-2">
              <li>All data is encrypted at rest and in transit</li>
              <li>Access control is implemented at both the AWS IAM level and within Redshift</li>
              <li>Data lineage is tracked through dbt and AWS Glue Data Catalog</li>
              <li>PII data is masked or encrypted based on data classification</li>
              <li>All pipeline runs are logged for audit purposes</li>
            </ul>
          </div>
        </div>
      </TabsContent>
    </Tabs>
  );
} 