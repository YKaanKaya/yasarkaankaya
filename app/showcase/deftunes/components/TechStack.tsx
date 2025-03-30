"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import { Cloud, Database, Server, Code, Infinity, Activity, GitBranch } from 'lucide-react'

// Tech categories with icons
const techCategories = [
  {
    name: "Cloud Infrastructure",
    icon: <Cloud className="h-5 w-5" />,
    technologies: [
      { name: "AWS S3", description: "Object storage for the data lake" },
      { name: "AWS Glue", description: "Serverless ETL service" },
      { name: "AWS Lambda", description: "Serverless compute for data ingestion" },
      { name: "AWS Redshift", description: "Data warehouse for analytics" },
    ]
  },
  {
    name: "Data Processing",
    icon: <Database className="h-5 w-5" />,
    technologies: [
      { name: "Apache Spark", description: "Distributed data processing" },
      { name: "Apache Iceberg", description: "Table format for data lakes" },
      { name: "AWS Glue Data Quality", description: "Data validation service" },
      { name: "dbt", description: "Data transformation tool" },
    ]
  },
  {
    name: "Orchestration",
    icon: <Infinity className="h-5 w-5" />,
    technologies: [
      { name: "Apache Airflow", description: "Workflow orchestration platform" },
      { name: "AWS Step Functions", description: "Serverless workflow service" },
      { name: "AWS Glue Workflow", description: "Managed ETL workflows" },
    ]
  },
  {
    name: "Infrastructure as Code",
    icon: <Server className="h-5 w-5" />,
    technologies: [
      { name: "Terraform", description: "Infrastructure provisioning" },
      { name: "AWS CloudFormation", description: "AWS resource templating" },
      { name: "Docker", description: "Container platform for services" },
    ]
  },
  {
    name: "Languages & Frameworks",
    icon: <Code className="h-5 w-5" />,
    technologies: [
      { name: "Python", description: "Primary programming language" },
      { name: "SQL", description: "Data query language" },
      { name: "PySpark", description: "Python API for Apache Spark" },
    ]
  },
  {
    name: "Version Control & CI/CD",
    icon: <GitBranch className="h-5 w-5" />,
    technologies: [
      { name: "Git", description: "Version control system" },
      { name: "GitHub Actions", description: "CI/CD automation" },
    ]
  },
  {
    name: "Monitoring & Visualization",
    icon: <Activity className="h-5 w-5" />,
    technologies: [
      { name: "Apache Superset", description: "Data visualization platform" },
      { name: "AWS CloudWatch", description: "Monitoring and observability" },
      { name: "Grafana", description: "Metrics visualization" },
    ]
  },
]

export function TechStack() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }
  
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  }

  return (
    <div className="space-y-8">
      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {techCategories.map((category) => (
          <motion.div
            key={category.name}
            variants={item}
            whileHover={{ scale: 1.02 }}
            className="bg-card border rounded-lg shadow-sm hover:shadow-md transition-all overflow-hidden"
          >
            <div className="p-4 bg-muted/30 border-b flex items-center gap-2">
              <div className="bg-primary/10 p-2 rounded-md">
                {category.icon}
              </div>
              <h3 className="font-medium">{category.name}</h3>
            </div>
            <div className="p-4">
              <ul className="space-y-3">
                {category.technologies.map((tech) => (
                  <li key={tech.name} className="flex items-start">
                    <div className="h-1.5 w-1.5 mt-2 rounded-full bg-primary mr-2" />
                    <div>
                      <span className="font-medium text-sm">{tech.name}</span>
                      <p className="text-xs text-muted-foreground">{tech.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </motion.div>
      
      <div className="pt-4 border-t">
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-sm font-medium text-muted-foreground">Other tools:</span>
          <Badge variant="outline">Pytest</Badge>
          <Badge variant="outline">Black</Badge>
          <Badge variant="outline">VS Code</Badge>
          <Badge variant="outline">AWS CLI</Badge>
          <Badge variant="outline">DataHub</Badge>
          <Badge variant="outline">Great Expectations</Badge>
          <Badge variant="outline">Jupyter Notebooks</Badge>
        </div>
      </div>
    </div>
  )
} 