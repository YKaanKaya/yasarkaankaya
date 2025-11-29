import { 
  Database, 
  BarChart3, 
  CircuitBoard, 
  Code, 
  BookOpen, 
  Linkedin, 
  Mail, 
  Github 
} from 'lucide-react'

export const personalInfo = {
  name: "Kaan KAYA",
  title: "Business Intelligence Engineer & Data Engineer",
  email: "ysr.kaan.kaya@outlook.com",
  linkedin: "https://linkedin.com/in/yasarkaankaya",
  github: "https://github.com/YKaanKaya",
  roles: [
    { label: "Data Engineer", icon: Database, color: "blue" },
    { label: "BI Engineer", icon: BarChart3, color: "purple" },
    { label: "ML Engineer", icon: CircuitBoard, color: "green" },
  ],
  bio: [
    "I am a Business Intelligence Engineer & Data Engineer with a passion for transforming complex data into actionable insights. With extensive experience across various industries, I specialize in designing robust data pipelines, implementing advanced analytics, and developing machine learning solutions.",
    "Currently pursuing an MSc in Computer Science at Heriot Watt University, I'm expanding my expertise in software development and machine learning engineering to build more sophisticated data-driven applications.",
    "I thrive at the intersection of data, software, and AI, enabling organizations to leverage their data assets for strategic decision-making and innovation. My goal is to combine my data engineering foundation with cutting-edge software development practices to create impactful machine learning solutions."
  ]
}

export const experience = [
  {
    title: 'Business Intelligence Engineer',
    company: 'Amazon',
    period: 'Jan 2025 - Present',
    description: 'Designing and implementing data pipelines and analytics solutions to support compliance monitoring and risk management. Collaborating with machine learning engineers and data scientists to develop predictive models for risk detection.',
    tags: ['ETL', 'AWS', 'Python', 'SQL', 'Data Modeling']
  },
  {
    title: 'Senior Data Analyst',
    company: 'A startup',
    period: 'Aug 2024 - Jan 2025',
    description: 'Designed and automated ETL pipelines, performed text analytics and sentiment analysis, created intuitive dashboards using Power BI and Python, and implemented AI-driven workflows for automation in ratings systems.',
    tags: ['NLP', 'Power BI', 'Python', 'Automation']
  },
  {
    title: 'Technical Business Analyst',
    company: 'Schroders',
    period: 'May 2022 - Jul 2024',
    description: 'Led transformation of financial reporting processes, managed the full software development lifecycle, and built strong relationships with internal stakeholders.',
    tags: ['Financial Reporting', 'SDLC', 'Requirements Analysis']
  },
  {
    title: 'Data Consultancy & Contract work',
    company: 'Lingaro, Carmignac',
    period: 'Aug 2021 - Apr 2022',
    description: 'Supported clients with data management, automation, and reporting solutions to optimize decision-making processes and meet regulatory requirements.',
    tags: ['Consultancy', 'Data Management', 'Regulatory Reporting']
  },
  {
    title: 'Technical Business Analyst',
    company: 'Standard Chartered Bank',
    period: 'Nov 2019 - Jul 2021',
    description: 'Led strategic redesign of market risk reporting systems, automated liquidity and financial reporting processes, and managed regulatory projects.',
    tags: ['Market Risk', 'Automation', 'Regulatory Compliance']
  }
]

export const projects = [
  {
    title: 'AI Code Arena Quest',
    description: 'An educational platform at PractAI.life designed to help people practice Machine Learning and AI concepts through interactive exercises and challenges. Created to bridge the gap between theoretical knowledge and practical application in AI education.',
    link: '/showcase/AICodeArena',
    demoLink: 'https://www.practai.life/',
    tags: ['React', 'Machine Learning', 'AI Education', 'JavaScript', 'Interactive Learning']
  },
  {
    title: 'Machine Learning Specialization',
    description: 'A comprehensive showcase of my journey through Andrew Ng\'s Machine Learning Specialization, featuring implementations of algorithms from basic regression to advanced reinforcement learning with practical demos like the Lunar Lander.',
    link: 'https://github.com/YKaanKaya/Machine-learning',
    demoLink: '/showcase/MachineLearning',
    tags: ['Python', 'TensorFlow', 'scikit-learn', 'Deep Learning', 'Reinforcement Learning']
  },
  {
    title: 'PyTorch for Deep Learning',
    description: 'Professional certificate from DeepLearning.AI covering production-ready deep learning with PyTorch. From neural network fundamentals to advanced architectures, computer vision, NLP, and model deployment with ONNX and MLflow.',
    link: 'https://github.com/YKaanKaya/deeplearning-ai-pytorch',
    demoLink: '/showcase/PyTorchDeepLearning',
    tags: ['PyTorch', 'Deep Learning', 'Computer Vision', 'NLP', 'MLOps', 'ONNX']
  },
  {
    title: 'DeFtunes Data Pipeline',
    description: 'A comprehensive data engineering solution for DeFtunes, a music streaming platform. Implements a robust data pipeline that extracts purchase data, processes it through transformation layers, and delivers analytics insights using AWS services (S3, Glue, Redshift), Apache Airflow, dbt, and Apache Superset.',
    link: 'https://github.com/YKaanKaya/deftunes-data-pipeline',
    demoLink: '/showcase/deftunes',
    tags: ['AWS', 'Airflow', 'dbt', 'Python', 'Data Engineering']
  },
  {
    title: 'Stock Performance and ESG Scores',
    description: 'Developed an application for demonstrating, visualizing, and interacting with various stock performance indicators and ESG scores.',
    link: 'https://gsinfo.streamlit.app/',
    tags: ['Streamlit', 'Python', 'Financial Analytics', 'ESG']
  },
  {
    title: 'NVIDIA Multimodal AI Agents',
    description: 'Showcase for NVIDIA\'s "Building AI Agents with Multimodal Models" course, including project notebooks and certification.',
    link: 'showcase/NvidiaMultimodalAI/',
    tags: ['NVIDIA', 'Multimodal', 'AI Agents', 'Deep Learning', 'Jupyter']
  },
  {
    title: 'LectureNotes RAG System',
    description: 'GPU-accelerated Retrieval-Augmented Generation system for intelligent Q&A over lecture notes and academic documents. Features FAISS vector search with RTX 5090 optimization, multi-format document support, and LM Studio integration for private LLM inference.',
    link: 'showcase/LectureNotesRAG',
    demoLink: 'https://github.com/YKaanKaya/LectureNotes-RAG-System',
    tags: ['Python', 'FAISS', 'GPU Acceleration', 'RAG', 'Vector Database', 'PyTorch', 'NLP']
  }
]

export const skills = {
  dataEngineering: [
    { name: 'Python', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
    { name: 'SQL', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
    { name: 'AWS', logo: 'https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg' },
    { name: 'Airflow', logo: 'https://upload.wikimedia.org/wikipedia/commons/d/de/AirflowLogo.png' },
    { name: 'dbt', logo: 'https://seeklogo.com/images/D/dbt-logo-500AB0BAA7-seeklogo.com.png' },
    { name: 'Spark', logo: 'https://upload.wikimedia.org/wikipedia/commons/f/f3/Apache_Spark_logo.svg' }
  ],
  bi: [
    { name: 'Power BI', logo: 'https://upload.wikimedia.org/wikipedia/commons/c/cf/New_Power_BI_Logo.svg' },
    { name: 'Tableau', logo: 'https://cdn.worldvectorlogo.com/logos/tableau-software.svg' },
    { name: 'Looker', logo: 'https://www.gstatic.com/images/branding/product/1x/looker_48dp.png', isSvg: true }, // Note: handling SVG path separately in component if needed, or using a URL
    { name: 'QuickSight', logo: 'https://miro.medium.com/v2/resize:fit:4800/format:webp/1*KL4vQyb9MEI9y2eyb4WEGQ.png' },
    { name: 'Superset', logo: 'https://upload.wikimedia.org/wikipedia/commons/6/6f/Superset-logo.svg' },
    { name: 'Excel', logo: 'https://upload.wikimedia.org/wikipedia/commons/3/34/Microsoft_Office_Excel_%282019%E2%80%93present%29.svg' }
  ],
  ml: [
    { name: 'TensorFlow', logo: 'https://upload.wikimedia.org/wikipedia/commons/2/2d/Tensorflow_logo.svg' },
    { name: 'PyTorch', logo: 'https://pytorch.org/assets/images/pytorch-logo.png' },
    { name: 'JavaScript', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
    { name: 'React', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
    { name: 'Docker', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
    { name: 'Git', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' }
  ]
}

export const certificates = [
  { name: 'Google Advanced Data Analytics', issuer: 'Google', link: 'https://www.coursera.org/account/accomplishments/professional-cert/AALR5T4XSEY6' },
  { name: 'AZ-900: Microsoft Azure Fundamentals', issuer: 'Microsoft', link: 'https://learn.microsoft.com/api/achievements/share/en-us/YasarKAYA-5240/JY5EYETG?sharingId=7FE4C6AF70E73B72' },
  { name: 'PSM 1 - Professional Scrum Master', issuer: 'Scrum.org', link: 'https://www.scrum.org/certificates/1021848' },
  { name: 'Machine Learning Specialization', issuer: 'Stanford University', link: 'https://www.coursera.org/account/accomplishments/specialization/U89AFBFR4NMM' },
  { name: 'DeepLearning.AI Data Engineering and AWS', issuer: 'DeepLearning.AI', link: 'https://www.coursera.org/account/accomplishments/specialization/OUGD3WNPRZ1I' },
]

export const education = {
  degree: "MSc in Computer Science",
  period: "2024 - Present",
  school: "Heriot Watt University",
  description: "Focused on advanced software development methodologies, machine learning algorithms, and AI applications for building innovative technical solutions.",
  tags: ["Machine Learning", "Software Engineering", "AI Systems", "Algorithms"]
}
