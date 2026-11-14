import {
  Database,
  BarChart3,
  Brain
} from 'lucide-react'

export const personalInfo = {
  name: "Kaan KAYA",
  title: "Data Scientist",
  email: "kaankaya@live.com",
  phone: "+352 621 748 595",
  location: "Luxembourg",
  linkedin: "https://linkedin.com/in/yasarkaankaya",
  github: "https://github.com/YKaanKaya",
  roles: [
    { label: "Data Scientist", icon: Brain, color: "blue" },
    { label: "Platform Builder", icon: Database, color: "purple" },
    { label: "Causal ML", icon: BarChart3, color: "green" },
  ],
  tagline: "From financial controls to decision systems.",
  bio: [
    "I spent a decade moving upstream—from reconciling financial numbers, to building the data platforms behind them, to modelling what informs a decision.",
    "Today I work across prediction, explainability, and causal inference, with an emphasis on systems that can be understood, challenged, and used.",
    "My path through e-commerce, banking, asset management, fintech, and data science shapes how I approach the last mile between a model and a real decision."
  ],
  languages: [
    { name: "Turkish", level: "Native" },
    { name: "English", level: "Native" },
    { name: "Polish", level: "Conversational" },
    { name: "Luxembourgish", level: "A2" },
    { name: "French", level: "Learning" },
  ],
  hobbies: ["Gardening", "Electric Guitars", "Piano"]
}

export const experience = [
  {
    title: 'Data Scientist',
    company: 'Amazon',
    period: 'Jan 2025 - Present',
    location: 'Luxembourg',
    description: 'Building data products and analytical tools for operational decision support.',
    highlights: [
      'Building reusable analytics foundations that support modelling, evaluation, and decision workflows',
      'Developing explainable machine-learning workflows that turn complex signals into clear, actionable insights',
      'Applying causal-inference methods and robust validation to strengthen analytical decision support'
    ],
    tags: ['Data Science', 'Machine Learning', 'Explainable AI', 'Causal Inference', 'Platform Engineering']
  },
  {
    title: 'Senior Data Analyst (Head of Data)',
    company: 'Hubfinance',
    period: 'Aug 2024 - Jan 2025',
    location: 'Luxembourg',
    description: 'Led data strategy and implementation for a fintech startup.',
    highlights: [
      'Designed and automated ETL/ELT pipelines to consolidate product and customer data into a central analytics store',
      'Implemented AI-driven workflows and rating systems using text analytics and sentiment analysis',
      'Transformed unstructured feedback into actionable metrics for leadership'
    ],
    tags: ['NLP', 'Power BI', 'Python', 'ETL/ELT', 'Sentiment Analysis']
  },
  {
    title: 'Technical Business Analyst (Data Analyst)',
    company: 'Schroders',
    period: 'May 2022 - Jul 2024',
    location: 'Luxembourg',
    description: 'Transformed financial and regulatory reporting processes for a global asset manager.',
    highlights: [
      'Led the redesign of financial and regulatory reporting processes, migrating manual reports to automated data pipelines',
      'Defined data models and reporting requirements with portfolio management and finance teams',
      'Ensured consistency and auditability of investment and risk data'
    ],
    tags: ['Financial Reporting', 'Data Modeling', 'SDLC', 'Regulatory Compliance']
  },
  {
    title: 'Data Consultancy & Contract Work',
    company: 'Lingaro, Carmignac',
    period: 'Aug 2021 - Apr 2022',
    location: 'Warsaw & Luxembourg',
    description: 'Delivered data management, automation, and reporting solutions for multiple clients.',
    highlights: [
      'Supported clients with data management and automation solutions',
      'Optimized decision-making processes through improved reporting',
      'Met regulatory requirements for financial institutions'
    ],
    tags: ['Consultancy', 'Data Management', 'Regulatory Reporting']
  },
  {
    title: 'Technical Business Analyst (Associate Director)',
    company: 'Standard Chartered Bank',
    period: 'May 2020 - Jul 2021',
    location: 'Warsaw',
    description: 'Led strategic redesign of market risk reporting systems for a global bank.',
    highlights: [
      'Led initiatives to redesign market risk reporting systems, consolidating data from multiple trading and risk platforms',
      'Designed and implemented automation for liquidity and financial reporting',
      'Reduced manual effort and improved timeliness of regulatory submissions'
    ],
    tags: ['Market Risk', 'Automation', 'Regulatory Compliance', 'Data Consolidation']
  },
  {
    title: 'Senior Financial Analyst',
    company: 'J.P. Morgan',
    period: 'Oct 2018 - Oct 2019',
    location: 'Warsaw',
    description: 'Partnered with trading desks and risk teams on P&L reconciliation and data quality.',
    highlights: [
      'Reconciled P&L and positions with trading desks and risk teams',
      'Improved data quality and control over trading and market risk metrics',
      'Enhanced internal reporting accuracy'
    ],
    tags: ['P&L', 'Trading Analytics', 'Risk Metrics', 'Data Quality']
  },
  {
    title: 'Financial Analyst',
    company: 'NatWest Markets',
    period: 'Jul 2016 - Sep 2018',
    location: 'Warsaw',
    description: 'Contributed to standardization and automation of daily P&L reports.',
    highlights: [
      'Standardized and automated daily P&L reports',
      'Ensured data consistency across front office and finance teams',
      'Reduced manual reconciliation effort significantly'
    ],
    tags: ['P&L Reporting', 'Automation', 'Data Consistency']
  },
  {
    title: 'Data Scientist',
    company: 'FRU.PL',
    period: 'Mar 2015 - Jul 2016',
    location: 'Warsaw',
    description: 'Built early ETL pipelines and dashboards for a high-growth e-commerce business.',
    highlights: [
      'Built early ETL pipelines and dashboards for real-time analytics',
      'Integrated multiple data sources to support commercial decision-making',
      'Enabled data-driven growth strategies'
    ],
    tags: ['ETL', 'Dashboards', 'E-commerce Analytics', 'Big Data']
  }
]

export const projects = [
  {
    title: 'Evaluating and Improving Agentic Applications',
    description: 'Documented DeepLearning.AI coursework on Phoenix tracing, benchmark design, evaluator validation, layered agent checks and case-aligned regression analysis.',
    link: 'https://github.com/YKaanKaya/deeplearning-ai-agentic-evaluation',
    demoLink: '/showcase/agentic-evaluation/',
    tags: ['Python', 'Phoenix', 'Agent Evaluation', 'LLM Judges', 'Regression Testing']
  },
  {
    title: 'AI Code Arena Quest',
    description: 'An educational platform at PractAI.life designed to help people practice Machine Learning and AI concepts through interactive exercises and challenges. Created to bridge the gap between theoretical knowledge and practical application in AI education.',
    link: '/showcase/AICodeArena',
    demoLink: 'https://practai-8qr1e.netlify.app/',
    tags: ['React', 'Machine Learning', 'AI Education', 'Full-Stack'],
    featured: true
  },
  {
    title: 'DeFtunes Data Pipeline',
    description: 'A comprehensive data engineering solution for a music streaming platform. Implements a robust data pipeline that extracts purchase data, processes it through transformation layers, and delivers analytics insights using AWS services.',
    link: 'https://github.com/YKaanKaya/deftunes-data-pipeline',
    demoLink: '/showcase/deftunes',
    tags: ['AWS', 'Airflow', 'dbt', 'Redshift', 'Superset'],
    featured: true
  },
  {
    title: 'GraphFlow ETL Suite',
    description: 'An AI-assisted migration toolkit for turning tabular data into graph-ready models and Neo4j workflows, with schema discovery and repeatable ETL at its core.',
    link: 'https://github.com/YKaanKaya/graphify',
    tags: ['TypeScript', 'Neo4j', 'ETL', 'AI-Assisted']
  },
  {
    title: 'Machine Learning Specialization',
    description: 'A comprehensive showcase of implementations from Andrew Ng\'s Machine Learning Specialization, featuring algorithms from basic regression to advanced reinforcement learning with practical demos.',
    link: 'https://github.com/YKaanKaya/Machine-learning',
    demoLink: '/showcase/MachineLearning',
    tags: ['Python', 'TensorFlow', 'scikit-learn', 'Deep Learning']
  },
  {
    title: 'PyTorch for Deep Learning',
    description: 'Professional Certificate from DeepLearning.AI ✅ completed January 2026. All 3 courses complete: PyTorch Exploration (neural networks, CNNs, image classification), Techniques & Ecosystem (optimization, Optuna, transfer learning), and Advanced Architectures (Siamese Networks, ResNet, DenseNet, Stable Diffusion, ONNX deployment).',
    link: 'https://github.com/YKaanKaya/deeplearning-ai-pytorch',
    demoLink: '/showcase/PyTorchDeepLearning',
    tags: ['PyTorch', 'Deep Learning', 'TorchVision', 'Optuna', 'MLOps', 'Transfer Learning', 'ONNX']
  },
  {
    title: 'Stock Performance & ESG Scores',
    description: 'Application for demonstrating, visualizing, and interacting with various stock performance indicators and ESG scores for sustainable investing analysis.',
    link: 'https://github.com/YKaanKaya/globalstockinfo',
    demoLink: 'https://gsinfo.streamlit.app/',
    tags: ['Streamlit', 'Python', 'Financial Analytics', 'ESG']
  },
  {
    title: 'NVIDIA Multimodal AI Agents',
    description: 'Showcase for NVIDIA\'s "Building AI Agents with Multimodal Models" course, demonstrating advanced multimodal techniques combining vision, language, and structured data.',
    link: '/showcase/NvidiaMultimodalAI/',
    tags: ['NVIDIA', 'Multimodal AI', 'AI Agents', 'Deep Learning']
  },
  {
    title: 'LectureNotes RAG System',
    description: 'GPU-accelerated Retrieval-Augmented Generation system for intelligent Q&A over lecture notes. Features FAISS vector search, multi-format document support, and LM Studio integration.',
    link: '/showcase/LectureNotesRAG',
    demoLink: 'https://github.com/YKaanKaya/LectureNotes-RAG-System',
    tags: ['RAG', 'FAISS', 'GPU Acceleration', 'PyTorch', 'NLP']
  }
]

export const skills = {
  dataEngineering: [
    { name: 'Python', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg', proficiency: 95 },
    { name: 'SQL', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg', proficiency: 95 },
    { name: 'AWS', logo: 'https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg', proficiency: 90 },
    { name: 'Airflow', logo: 'https://upload.wikimedia.org/wikipedia/commons/d/de/AirflowLogo.png', proficiency: 85 },
    { name: 'dbt', logo: 'https://seeklogo.com/images/D/dbt-logo-500AB0BAA7-seeklogo.com.png', proficiency: 85 },
    { name: 'Spark', logo: 'https://upload.wikimedia.org/wikipedia/commons/f/f3/Apache_Spark_logo.svg', proficiency: 80 }
  ],
  ai: [
    { name: 'GenAI', logo: 'https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg', proficiency: 90 },
    { name: 'TensorFlow', logo: 'https://upload.wikimedia.org/wikipedia/commons/2/2d/Tensorflow_logo.svg', proficiency: 85 },
    { name: 'PyTorch', logo: 'https://pytorch.org/assets/images/pytorch-logo.png', proficiency: 85 },
    { name: 'scikit-learn', logo: 'https://upload.wikimedia.org/wikipedia/commons/0/05/Scikit_learn_logo_small.svg', proficiency: 90 },
    { name: 'NLP', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg', proficiency: 85 },
    { name: 'Pandas', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg', proficiency: 95 }
  ],
  bi: [
    { name: 'Power BI', logo: 'https://upload.wikimedia.org/wikipedia/commons/c/cf/New_Power_BI_Logo.svg', proficiency: 95 },
    { name: 'Tableau', logo: 'https://cdn.worldvectorlogo.com/logos/tableau-software.svg', proficiency: 90 },
    { name: 'Looker', logo: 'https://www.gstatic.com/images/branding/product/1x/looker_48dp.png', proficiency: 80 },
    { name: 'QuickSight', logo: 'https://miro.medium.com/v2/resize:fit:4800/format:webp/1*KL4vQyb9MEI9y2eyb4WEGQ.png', proficiency: 85 },
    { name: 'Superset', logo: 'https://upload.wikimedia.org/wikipedia/commons/6/6f/Superset-logo.svg', proficiency: 80 },
    { name: 'Excel', logo: 'https://upload.wikimedia.org/wikipedia/commons/3/34/Microsoft_Office_Excel_%282019%E2%80%93present%29.svg', proficiency: 95 }
  ]
}

export const skillCategories = [
  { id: 'dataEngineering', label: 'Data Platforms & Engineering', icon: Database, color: 'text-blue-600 dark:text-blue-400', description: 'End-to-end ETL/ELT, data warehousing, pipeline orchestration' },
  { id: 'ai', label: 'Machine Learning & AI', icon: Brain, color: 'text-purple-600 dark:text-purple-400', description: 'GenAI, multimodal models, text analytics, AI-driven workflows' },
  { id: 'bi', label: 'Business Intelligence', icon: BarChart3, color: 'text-green-600 dark:text-green-400', description: 'Dashboarding, reporting automation, data storytelling' },
]

export const certificates = [
  { name: 'Evaluating and Improving Agentic Applications', issuer: 'DeepLearning.AI', link: 'https://learn.deeplearning.ai/certificates/03976233-64c4-4195-a504-d5676a73f825', year: '2026' },
  { name: 'PyTorch for Deep Learning Professional Certificate', issuer: 'DeepLearning.AI', link: 'https://learn.deeplearning.ai/certificates/2a9c2778-7424-4379-b34a-384272c9303c', year: '2026' },
  { name: 'Building AI Agents with Multimodal Models', issuer: 'NVIDIA DLI', link: 'https://learn.nvidia.com/certificates?id=kpMpsOlPTBKph9g3PLBXpw', year: '2025' },
  { name: 'Machine Learning Specialization', issuer: 'Stanford University', link: 'https://www.coursera.org/account/accomplishments/specialization/U89AFBFR4NMM', year: '2023' },
  { name: 'Data Engineering and AWS', issuer: 'DeepLearning.AI', link: 'https://www.coursera.org/account/accomplishments/specialization/OUGD3WNPRZ1I', year: '2024' },
  { name: 'Advanced Data Analytics Professional Certificate', issuer: 'Google', link: 'https://www.coursera.org/account/accomplishments/professional-cert/AALR5T4XSEY6', year: '2023' },
  { name: 'AZ-900: Microsoft Azure Fundamentals', issuer: 'Microsoft', link: 'https://learn.microsoft.com/api/achievements/share/en-us/YasarKAYA-5240/JY5EYETG?sharingId=7FE4C6AF70E73B72', year: '2023' },
  { name: 'Professional Scrum Master (PSM I)', issuer: 'Scrum.org', link: 'https://www.scrum.org/certificates/1021848', year: '2022' },
  { name: 'Certified Scrum Product Owner', issuer: 'Scrum Alliance', link: '#', year: '2022' },
]

export const education = [
  {
    degree: "MSc in Computer Science",
    period: "2024 - 2027",
    school: "Heriot-Watt University",
    description: "Studying computer science alongside my data-science practice, with a focus on the software and machine-learning foundations behind reliable systems.",
    tags: ["Machine Learning", "Software Engineering", "AI Systems", "Algorithms"],
    current: true
  },
  {
    degree: "Master in Finance and Accounting",
    period: "2015 - 2017",
    school: "Kozminski University",
    description: "Where I learned to reconcile numbers, understand P&L, and treat analytical outputs as something that must stand up to scrutiny.",
    tags: ["Finance", "Accounting", "Financial Analysis", "Corporate Finance"],
    current: false
  }
]
