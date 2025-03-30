"use client"

import * as React from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CodeBlock } from "./CodeBlock"

export function InfrastructureCode() {
  return (
    <Tabs defaultValue="terraform" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="terraform">Terraform</TabsTrigger>
        <TabsTrigger value="cloudformation">CloudFormation</TabsTrigger>
        <TabsTrigger value="docker">Docker</TabsTrigger>
      </TabsList>
      
      <TabsContent value="terraform" className="pt-4">
        <div className="flex flex-col gap-4">
          <h3 className="text-xl font-semibold">Infrastructure as Code with Terraform</h3>
          <p className="text-muted-foreground">
            Terraform is used to provision and manage the AWS infrastructure components.
          </p>
          
          <CodeBlock
            language="hcl"
            title="main.tf"
            code={`provider "aws" {
  region = var.aws_region
}

module "vpc" {
  source  = "terraform-aws-modules/vpc/aws"
  version = "~> 4.0"

  name = "deftunes-vpc"
  cidr = "10.0.0.0/16"

  azs             = ["us-west-2a", "us-west-2b", "us-west-2c"]
  private_subnets = ["10.0.1.0/24", "10.0.2.0/24", "10.0.3.0/24"]
  public_subnets  = ["10.0.101.0/24", "10.0.102.0/24", "10.0.103.0/24"]

  enable_nat_gateway = true
  single_nat_gateway = true

  tags = {
    Project     = "deftunes"
    Environment = var.environment
  }
}`}
          />
          
          <CodeBlock
            language="hcl"
            title="glue_jobs.tf"
            code={`# Glue ETL Jobs
resource "aws_glue_job" "extract_api_sessions" {
  name     = "deftunes-extract-api-sessions"
  role_arn = aws_iam_role.glue_service_role.arn
  glue_version = "3.0"
  worker_type = "G.1X"
  number_of_workers = 2
  timeout = 60

  command {
    script_location = "s3://data-lake-bucket/scripts/glue/extract_api_sessions.py"
    python_version  = "3"
  }

  default_arguments = {
    "--job-language"            = "python"
    "--TempDir"                 = "s3://data-lake-bucket/temp/"
    "--enable-metrics"          = "true"
    "--enable-continuous-cloudwatch-log" = "true"
    "--enable-spark-ui"         = "true"
    "--spark-event-logs-path"   = "s3://data-lake-bucket/spark-logs/"
  }
}`}
          />
        </div>
      </TabsContent>
      
      <TabsContent value="cloudformation" className="pt-4">
        <div className="flex flex-col gap-4">
          <h3 className="text-xl font-semibold">CloudFormation Templates</h3>
          <p className="text-muted-foreground">
            CloudFormation templates for components that are not managed by Terraform.
          </p>
          
          <CodeBlock
            language="yaml"
            title="glue-workflow.yaml"
            code={`AWSTemplateFormatVersion: '2010-09-09'
Description: 'CloudFormation template for DeFtunes Glue Workflows'

Parameters:
  Environment:
    Description: Deployment environment
    Type: String
    Default: dev
    
Resources:
  GlueWorkflowApiData:
    Type: AWS::Glue::Workflow
    Properties:
      Name: deftunes-api-data-workflow
      Description: Workflow for processing API data`}
          />
        </div>
      </TabsContent>
      
      <TabsContent value="docker" className="pt-4">
        <div className="flex flex-col gap-4">
          <h3 className="text-xl font-semibold">Docker and Airflow Setup</h3>
          <p className="text-muted-foreground">
            Docker configuration for running Airflow and other services.
          </p>
          
          <CodeBlock
            language="dockerfile"
            title="Dockerfile"
            code={`FROM apache/airflow:2.5.3-python3.10

USER root

# Install system dependencies
RUN apt-get update \
  && apt-get install -y --no-install-recommends \
         build-essential \
         libpq-dev

USER airflow

# Install Python dependencies
COPY requirements.txt /tmp/requirements.txt
RUN pip install --no-cache-dir -r /tmp/requirements.txt`}
          />
        </div>
      </TabsContent>
    </Tabs>
  )
} 