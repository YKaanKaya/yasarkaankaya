"use client"

import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Github, Star, GitFork, Eye } from 'lucide-react'

export function GitHubRepo() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h2 className="text-3xl font-bold">GitHub Repository</h2>
        <Button variant="outline" asChild className="mt-4 md:mt-0">
          <a 
            href="https://github.com/YKaanKaya/ai-code-arena-quest" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center"
          >
            <Github className="mr-2 h-4 w-4" /> View on GitHub
          </a>
        </Button>
      </div>
      
      <Card>
        <CardContent className="p-6">
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-lg mb-4">
              The AI Code Arena Quest project is open source and available on GitHub. The repository includes the complete codebase, documentation, and setup instructions.
            </p>
            
            <h3 className="text-xl font-semibold mt-6 mb-3">Repository Structure</h3>
            <div className="bg-muted p-4 rounded-md border border-border font-mono text-sm mb-6 overflow-x-auto">
              <pre>
{`ai-code-arena-quest/
├── client/                # React front-end application
│   ├── public/            # Static assets
│   └── src/               # Source code
│       ├── components/    # UI components
│       ├── contexts/      # React contexts
│       ├── hooks/         # Custom React hooks
│       ├── pages/         # Application pages
│       ├── utils/         # Utility functions
│       └── App.js         # Main application component
├── server/                # Node.js backend
│   ├── controllers/       # Route controllers
│   ├── models/            # Database models
│   ├── routes/            # API routes
│   ├── services/          # Business logic
│   └── index.js           # Server entry point
├── ml/                    # Machine learning evaluation system
│   ├── models/            # TensorFlow models
│   ├── notebooks/         # Jupyter notebooks
│   └── utils/             # ML utilities
├── docs/                  # Documentation
├── .env.example           # Environment variables example
├── docker-compose.yml     # Docker configuration
├── README.md              # Project documentation
└── package.json           # Project dependencies`}
              </pre>
            </div>
            
            <h3 className="text-xl font-semibold mt-6 mb-3">Getting Involved</h3>
            <p className="mb-4">
              The project welcomes contributions from the community. Here are some ways to get involved:
            </p>
            
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li><strong>Reporting Issues:</strong> Help improve the platform by reporting bugs and suggesting enhancements</li>
              <li><strong>Contributing Code:</strong> Submit pull requests for new features or bug fixes</li>
              <li><strong>Creating Content:</strong> Develop new challenges and learning materials</li>
              <li><strong>Documentation:</strong> Improve project documentation and guides</li>
              <li><strong>Testing:</strong> Help test the platform and provide feedback</li>
            </ul>
            
            <div className="flex items-center space-x-4 mt-8 text-sm text-muted-foreground">
              <div className="flex items-center">
                <Star className="h-4 w-4 mr-1" />
                <span>Stars: 24</span>
              </div>
              <div className="flex items-center">
                <GitFork className="h-4 w-4 mr-1" />
                <span>Forks: 8</span>
              </div>
              <div className="flex items-center">
                <Eye className="h-4 w-4 mr-1" />
                <span>Watchers: 12</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
