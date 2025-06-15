"use client"

import { useEffect, useRef, useState } from 'react'
import { ArrowDown, Linkedin, Mail, Github, Code, BookOpen, BarChart3, Database, CircuitBoard } from 'lucide-react'
import Image from 'next/image'
import { useTheme } from "next-themes"

import { Button, buttonVariants } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ThemeToggle } from "@/components/ui/theme-toggle"

export function PortfolioComponent() {
  const [activeSection, setActiveSection] = useState('profile')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState('')
  const [tableauLoaded, setTableauLoaded] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  const profileRef = useRef<HTMLElement>(null)
  const aboutRef = useRef<HTMLElement>(null)
  const experienceRef = useRef<HTMLElement>(null)
  const projectsRef = useRef<HTMLElement>(null)
  const skillsRef = useRef<HTMLElement>(null)
  const educationRef = useRef<HTMLElement>(null)
  const certificatesRef = useRef<HTMLElement>(null)
  const biPlaygroundRef = useRef<HTMLElement>(null)
  const contactRef = useRef<HTMLElement>(null)

  const sectionRefs = {
    profile: profileRef,
    about: aboutRef,
    experience: experienceRef,
    projects: projectsRef,
    skills: skillsRef,
    education: educationRef,
    certificates: certificatesRef,
    biPlayground: biPlaygroundRef,
    contact: contactRef,
  }

  const sectionHeaderRefs = useRef<{ [key: string]: HTMLHeadingElement }>({})

  // Make sure we're mounted before rendering theme-dependent UI
  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-10% 0px -10% 0px',
      threshold: 0.1,
    }

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id)
          entry.target.classList.add('animate-fade-in-up')
        }
      })
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)

    Object.values(sectionRefs).forEach((ref) => {
      if (ref.current) {
        observer.observe(ref.current)
      }
    })

    return () => observer.disconnect()
  }, [sectionRefs])

  useEffect(() => {
    const handleScroll = () => {
      Object.entries(sectionHeaderRefs.current).forEach(([, ref]) => {
        if (ref && isElementInViewport(ref)) {
          ref.classList.add('visible')
        }
      })
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Initial check

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const isElementInViewport = (el: HTMLElement) => {
    const rect = el.getBoundingClientRect()
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    )
  }

  const scrollToSection = (sectionId: keyof typeof sectionRefs) => {
    sectionRefs[sectionId].current?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSubmitting(true)
    setSubmitMessage('')

    const formData = new FormData(event.currentTarget)
    const email = formData.get('email')

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000))

    setIsSubmitting(false)
    setSubmitMessage(`Email ${email} submitted successfully!`)
  }

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  useEffect(() => {
    const loadTableauScript = () => {
      const script = document.createElement('script');
      script.src = 'https://public.tableau.com/javascripts/api/viz_v1.js';
      script.async = true;
      script.onload = () => {
        setTableauLoaded(true);
      };
      document.body.appendChild(script);
    };

    loadTableauScript();

    return () => {
      const script = document.querySelector('script[src="https://public.tableau.com/javascripts/api/viz_v1.js"]');
      if (script) {
        document.body.removeChild(script);
      }
    };
  }, []);

  useEffect(() => {
    if (tableauLoaded) {
      const divElement = document.getElementById('viz1729591853089');
      if (divElement) {
        const vizElement = divElement.getElementsByTagName('object')[0];
        if (vizElement) {
          vizElement.style.width = '100%';
          vizElement.style.height = '700px';
          const scriptElement = document.createElement('script');
          scriptElement.src = 'https://public.tableau.com/javascripts/api/viz_v1.js';
          vizElement.parentNode?.insertBefore(scriptElement, vizElement);
        }
      }
    }
  }, [tableauLoaded]);

  // Wait for client-side hydration
  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen">
      <div className="bg-background text-foreground min-h-screen transition-colors duration-300">
        <style jsx global>{`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .animate-fade-in-up {
            animation: fadeInUp 0.6s ease-out forwards;
          }
          .section-header {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease-out, transform 0.6s ease-out;
          }
          .section-header.visible {
            opacity: 1;
            transform: translateY(0);
          }
          .button-outline {
            color: inherit;
            background-color: transparent;
            border-color: currentColor;
          }
          .button-outline:hover {
            background-color: rgba(127, 127, 127, 0.1);
          }
          .gradient-text {
            background: linear-gradient(90deg, #3b82f6 0%, #8b5cf6 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }
          .card-hover {
            transition: transform 0.3s ease, box-shadow 0.3s ease;
          }
          .card-hover:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
          }
        `}</style>
        <nav className="sticky top-0 z-50 bg-background/90 backdrop-blur-md shadow-sm">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="font-bold text-xl text-blue-600 dark:text-blue-400">
                Kaan KAYA
              </div>
              <ul className="hidden md:flex space-x-4 mr-4">
                {(Object.keys(sectionRefs) as Array<keyof typeof sectionRefs>).map((section) => (
                  <li key={section}>
                    <button
                      onClick={() => scrollToSection(section)}
                      className={`text-sm font-medium transition-colors hover:text-blue-600 dark:hover:text-blue-400 ${
                        activeSection === section ? 'text-blue-600 dark:text-blue-400' : 'text-muted-foreground'
                      }`}
                    >
                      {section === 'biPlayground' ? 'BI Playground' : section.charAt(0).toUpperCase() + section.slice(1)}
                    </button>
                  </li>
                ))}
              </ul>
              <ThemeToggle />
            </div>
          </div>
        </nav>

        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <section id="profile" ref={sectionRefs.profile} className="min-h-screen flex flex-col items-center justify-center py-20">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-5xl font-bold mb-4">Kaan KAYA</h1>
              <div className="flex justify-center gap-3 mb-4">
                <Badge variant="outline" className="text-md py-1 px-3 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 border-blue-300 dark:border-blue-700">
                  <Database className="mr-1 h-4 w-4" /> Data Engineer
                </Badge>
                <Badge variant="outline" className="text-md py-1 px-3 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 border-purple-300 dark:border-purple-700">
                  <BarChart3 className="mr-1 h-4 w-4" /> BI Engineer
                </Badge>
                <Badge variant="outline" className="text-md py-1 px-3 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 border-green-300 dark:border-green-700">
                  <CircuitBoard className="mr-1 h-4 w-4" /> ML Engineer
                </Badge>
              </div>
              <p className="text-xl text-muted-foreground mb-8">Building data-driven solutions with code and creativity</p>
              <Button onClick={() => scrollToSection('about')} className="animate-bounce">
                <ArrowDown className="mr-2 h-4 w-4" /> Learn More
              </Button>
            </div>
          </section>

          <section id="about" ref={sectionRefs.about} className="py-20">
            <h2 ref={el => { if (el) sectionHeaderRefs.current.about = el }} className="text-3xl font-bold mb-8 text-center section-header">About Me</h2>
            <Card className="border-border shadow-md">
              <CardContent className="p-8">
                <p className="text-foreground mb-4 text-lg">
                  I am a <span className="font-semibold">Business Intelligence Engineer & Data Engineer</span> with a passion for transforming complex data into actionable insights. With extensive experience across various industries, I specialize in designing robust data pipelines, implementing advanced analytics, and developing machine learning solutions.
                </p>
                <p className="text-foreground mb-4 text-lg">
                  Currently pursuing an <span className="font-semibold">MSc in Computer Science at Heriot Watt University</span>, I&apos;m expanding my expertise in software development and machine learning engineering to build more sophisticated data-driven applications.
                </p>
                <p className="text-foreground text-lg">
                  I thrive at the intersection of data, software, and AI, enabling organizations to leverage their data assets for strategic decision-making and innovation. My goal is to combine my data engineering foundation with cutting-edge software development practices to create impactful machine learning solutions.
                </p>
              </CardContent>
            </Card>
          </section>

          <section id="experience" ref={sectionRefs.experience} className="py-20">
            <h2 ref={el => { if (el) sectionHeaderRefs.current.experience = el }} className="text-3xl font-bold mb-8 text-center section-header">Experience</h2>
            <div className="space-y-8">
              {[
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
              ].map((job, index) => (
                <Card key={index} className="border-border shadow-md card-hover">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-3">
                      <h3 className="text-xl font-semibold">{job.title}</h3>
                      <p className="text-muted-foreground text-sm md:text-right">{job.period}</p>
                    </div>
                    <p className="text-muted-foreground font-medium mb-3">{job.company}</p>
                    <p className="mt-2 text-foreground mb-4">{job.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {job.tags.map((tag, i) => (
                        <Badge key={i} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <section id="education" ref={sectionRefs.education} className="py-20">
            <h2 ref={el => { if (el) sectionHeaderRefs.current.education = el }} className="text-3xl font-bold mb-8 text-center section-header">Education</h2>
            <Card className="border-border shadow-md">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row justify-between items-start mb-3">
                  <h3 className="text-xl font-semibold">MSc in Computer Science</h3>
                  <p className="text-muted-foreground text-sm">2024 - Present</p>
                </div>
                <p className="text-muted-foreground font-medium mb-3">Heriot Watt University</p>
                <p className="text-foreground mb-4">
                  Focused on advanced software development methodologies, machine learning algorithms, and AI applications for building innovative technical solutions.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">
                    Machine Learning
                  </Badge>
                  <Badge variant="secondary">
                    Software Engineering
                  </Badge>
                  <Badge variant="secondary">
                    AI Systems
                  </Badge>
                  <Badge variant="secondary">
                    Algorithms
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </section>

          <section id="projects" ref={sectionRefs.projects} className="py-20">
            <h2 ref={el => { if (el) sectionHeaderRefs.current.projects = el }} className="text-3xl font-bold mb-8 text-center section-header">Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
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
                  description: 'Showcase for NVIDIA’s “Building AI Agents with Multimodal Models” course, including project notebooks and certification.',
                  link: '/showcase/NvidiaMultimodalAI',
                  tags: ['NVIDIA', 'Multimodal', 'AI Agents', 'Deep Learning', 'Jupyter']
                }
              ].map((project, index) => (
                <Card key={index} className="border-border shadow-md card-hover">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                    <p className="text-muted-foreground mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map((tag, i) => (
                        <Badge key={i} variant="secondary" className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" asChild>
                        {project.title === 'NVIDIA Multimodal AI Agents' ? (
                          <a href={project.link}>View Project</a>
                        ) : (
                          <a href={project.link} target="_blank" rel="noopener noreferrer">View Project</a>
                        )}
                      </Button>
                      {project.demoLink && (
                        <Button variant="default" asChild>
                          <a href={project.demoLink} target="_blank" rel="noopener noreferrer">View Demo</a>
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <section id="skills" ref={sectionRefs.skills} className="py-20">
            <h2 ref={el => { if (el) sectionHeaderRefs.current.skills = el }} className="text-3xl font-bold mb-8 text-center section-header">Skills</h2>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              <Card className="border-border shadow-md card-hover">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <Database className="h-6 w-6 text-blue-600 dark:text-blue-400 mr-2" />
                    <h3 className="text-xl font-semibold">Data Engineering</h3>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {[
                      { name: 'Python', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
                      { name: 'SQL', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
                      { name: 'AWS', logo: 'https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg' },
                      { name: 'Airflow', logo: 'https://upload.wikimedia.org/wikipedia/commons/d/de/AirflowLogo.png' },
                      { name: 'dbt', logo: 'https://seeklogo.com/images/D/dbt-logo-500AB0BAA7-seeklogo.com.png' },
                      { name: 'Spark', logo: 'https://upload.wikimedia.org/wikipedia/commons/f/f3/Apache_Spark_logo.svg' }
                    ].map((skill) => (
                      <div key={skill.name} className="flex flex-col items-center">
                        <div className="w-12 h-12 flex items-center justify-center mb-2 bg-card rounded-full p-2">
                          <Image
                            src={skill.logo}
                            alt={`${skill.name} logo`}
                            width={32}
                            height={32}
                            className="max-w-full max-h-full object-contain"
                          />
                        </div>
                        <p className="text-center text-xs">{skill.name}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-border shadow-md card-hover">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <BarChart3 className="h-6 w-6 text-purple-600 dark:text-purple-400 mr-2" />
                    <h3 className="text-xl font-semibold">Business Intelligence</h3>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 flex items-center justify-center mb-2 bg-card rounded-full p-2">
                        <Image
                          src="https://upload.wikimedia.org/wikipedia/commons/c/cf/New_Power_BI_Logo.svg"
                          alt="Power BI logo"
                          width={32}
                          height={32}
                          className="max-w-full max-h-full object-contain"
                        />
                      </div>
                      <p className="text-center text-xs">Power BI</p>
                    </div>
                    
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 flex items-center justify-center mb-2 bg-card rounded-full p-2">
                        <Image
                          src="https://cdn.worldvectorlogo.com/logos/tableau-software.svg"
                          alt="Tableau logo"
                          width={32}
                          height={32}
                          className="max-w-full max-h-full object-contain"
                        />
                      </div>
                      <p className="text-center text-xs">Tableau</p>
                    </div>
                    
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 flex items-center justify-center mb-2 bg-card rounded-full p-2">
                        <svg viewBox="-78.5 0 413 413" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" preserveAspectRatio="xMidYMid" className="max-w-full max-h-full">
                          <g>
                            <path d="M127.128486,0 C113.797782,0.0058471726 101.556004,7.36006381 95.2905253,19.126605 C89.0250469,30.8931461 89.7564532,45.1553578 97.1927396,56.2192339 L112.606279,40.8274339 C112.096845,39.2920176 111.839876,37.6841242 111.845385,36.066411 C111.845385,27.6618072 118.658663,20.8485297 127.063267,20.8485297 C135.467871,20.8485297 142.281148,27.6618072 142.281148,36.066411 C142.281148,44.4710148 135.467871,51.2842924 127.063267,51.2842924 C125.452814,51.2878362 123.852389,51.0308872 122.323984,50.5233983 L106.932184,65.9151983 C119.749817,74.6084738 136.686605,74.1479499 149.012895,64.7709924 C161.339185,55.3940349 166.302744,39.1943452 161.345227,24.5216568 C156.387711,9.84896827 142.61604,-0.0205786569 127.128486,0 L127.128486,0 Z" fill="#34A853"></path>
                            <path d="M112.780303,105.112113 C112.803794,92.9288201 108.858278,81.0693768 101.540706,71.3284161 L81.5400617,91.3073204 C87.7949796,102.747737 85.5440645,116.967804 76.0616244,125.917131 L86.9315396,152.483203 C103.037113,142.110661 112.772753,124.268811 112.780303,105.112113 Z" fill="#FBBC04"></path>
                            <path d="M56.8870939,133.786949 L56.3653379,133.786949 C44.0975407,133.788013 33.1858466,125.990585 29.2128405,114.383946 C25.2398344,102.777307 29.0843199,89.9287712 38.7794013,82.4118404 C48.4744826,74.8949096 61.8756692,74.3722813 72.126715,81.1113398 L91.9317006,61.3063543 C72.6737207,45.6936654 45.4778243,44.4893124 24.9151409,58.3385684 C4.35245741,72.1878245 -4.75374244,97.8421492 2.47549859,121.556363 C9.70473962,145.270576 31.5737,161.482171 56.3653379,161.50524 C60.1906548,161.507115 64.0066702,161.128427 67.7570091,160.374762 L56.8870939,133.786949 Z" fill="#EA4335"></path>
                            <path d="M127.88938,156.76595 C115.371706,156.753269 102.919887,158.577095 90.9316684,162.179168 L106.780005,200.897806 C113.678715,199.188192 120.760254,198.326726 127.86764,198.332506 C169.050784,198.344513 204.491034,227.444917 212.516351,267.838552 C220.541668,308.232187 198.917134,348.670095 160.866351,364.424121 C122.815568,380.178148 78.9350487,366.861058 56.0581359,332.616375 C33.1812232,298.371692 37.6787581,252.735993 66.8004566,223.615929 C72.8771111,217.558264 79.8143655,212.430409 87.3880761,208.398047 L71.7136583,169.788108 C13.2865745,198.402523 -14.3767247,266.297107 7.41546106,327.59645 C29.2076468,388.895793 93.5203541,424.092503 156.898395,409.404661 C220.276436,394.716818 262.550912,334.818559 255.157557,270.182291 C247.764201,205.546024 193.055814,156.741054 127.998079,156.74421 L127.88938,156.76595 Z" fill="#4285F4"></path>
                          </g>
                        </svg>
                      </div>
                      <p className="text-center text-xs">Looker</p>
                    </div>
                    
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 flex items-center justify-center mb-2 bg-card rounded-full p-2">
                        <Image
                          src="https://miro.medium.com/v2/resize:fit:4800/format:webp/1*KL4vQyb9MEI9y2eyb4WEGQ.png"
                          alt="QuickSight logo"
                          width={32}
                          height={32}
                          className="max-w-full max-h-full object-contain"
                        />
                      </div>
                      <p className="text-center text-xs">QuickSight</p>
                    </div>
                    
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 flex items-center justify-center mb-2 bg-card rounded-full p-2">
                        <Image
                          src="https://upload.wikimedia.org/wikipedia/commons/6/6f/Superset-logo.svg"
                          alt="Superset logo"
                          width={32}
                          height={32}
                          className="max-w-full max-h-full object-contain"
                        />
                      </div>
                      <p className="text-center text-xs">Superset</p>
                    </div>
                    
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 flex items-center justify-center mb-2 bg-card rounded-full p-2">
                        <Image
                          src="https://upload.wikimedia.org/wikipedia/commons/3/34/Microsoft_Office_Excel_%282019%E2%80%93present%29.svg"
                          alt="Excel logo"
                          width={32}
                          height={32}
                          className="max-w-full max-h-full object-contain"
                        />
                      </div>
                      <p className="text-center text-xs">Excel</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-border shadow-md card-hover">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <CircuitBoard className="h-6 w-6 text-green-600 dark:text-green-400 mr-2" />
                    <h3 className="text-xl font-semibold">ML & Software Dev</h3>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {[
                      { name: 'TensorFlow', logo: 'https://upload.wikimedia.org/wikipedia/commons/2/2d/Tensorflow_logo.svg' },
                      { name: 'PyTorch', logo: 'https://pytorch.org/assets/images/pytorch-logo.png' },
                      { name: 'JavaScript', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
                      { name: 'React', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
                      { name: 'Docker', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
                      { name: 'Git', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' }
                    ].map((skill) => (
                      <div key={skill.name} className="flex flex-col items-center">
                        <div className="w-12 h-12 flex items-center justify-center mb-2 bg-card rounded-full p-2">
                          <Image
                            src={skill.logo}
                            alt={`${skill.name} logo`}
                            width={32}
                            height={32}
                            className="max-w-full max-h-full object-contain"
                          />
                        </div>
                        <p className="text-center text-xs">{skill.name}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          <section id="certificates" ref={sectionRefs.certificates} className="py-20">
            <h2 ref={el => { if (el) sectionHeaderRefs.current.certificates = el }} className="text-3xl font-bold mb-8 text-center section-header">Certificates</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { name: 'Google Advanced Data Analytics', issuer: 'Google', link: 'https://www.coursera.org/account/accomplishments/professional-cert/AALR5T4XSEY6' },
                { name: 'AZ-900: Microsoft Azure Fundamentals', issuer: 'Microsoft', link: 'https://learn.microsoft.com/api/achievements/share/en-us/YasarKAYA-5240/JY5EYETG?sharingId=7FE4C6AF70E73B72' },
                { name: 'PSM 1 - Professional Scrum Master', issuer: 'Scrum.org', link: 'https://www.scrum.org/certificates/1021848' },
                { name: 'Machine Learning Specialization', issuer: 'Stanford University', link: 'https://www.coursera.org/account/accomplishments/specialization/U89AFBFR4NMM' },
                { name: 'DeepLearning.AI Data Engineering and AWS', issuer: 'DeepLearning.AI', link: 'https://www.coursera.org/account/accomplishments/specialization/OUGD3WNPRZ1I' },
              ].map((cert, index) => (
                <Card key={index} className="border-border shadow-md card-hover">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{cert.name}</h3>
                    <p className="text-muted-foreground mb-4">Issued by: {cert.issuer}</p>
                    <Button variant="outline" asChild className="w-full">
                      <a href={cert.link} target="_blank" rel="noopener noreferrer">View Certificate</a>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <section id="biPlayground" ref={sectionRefs.biPlayground} className="py-20">
            <h2 ref={el => { if (el) sectionHeaderRefs.current.biPlayground = el }} className="text-3xl font-bold mb-8 text-center section-header">Business Intelligence Playground</h2>
            
            <div className="space-y-12">
              {/* Tableau Dashboard */}
              <Card className="border-border shadow-md overflow-hidden">
                <CardContent className="p-6">
                  <h3 className="text-2xl font-semibold mb-4">Tableau Dashboard</h3>
                  <div className='tableauPlaceholder' id='viz1729591853089' style={{position: 'relative', width: '100%', height: '600px'}}>
                    <object className='tableauViz' style={{display:'none', width: '100%', height: '100%'}}>
                      <param name='host_url' value='https%3A%2F%2Fpublic.tableau.com%2F' /> 
                      <param name='embed_code_version' value='3' /> 
                      <param name='site_root' value='' />
                      <param name='name' value='Follow-alongguideWorkwithTableauPart1_16953973838800/Story1' />
                      <param name='tabs' value='no' />
                      <param name='toolbar' value='yes' />
                      <param name='static_image' value='https://public.tableau.com/static/images/Fo/Follow-alongguideWorkwithTableauPart1_16953973838800/Story1/1.png' /> 
                      <param name='animate_transition' value='yes' />
                      <param name='display_static_image' value='yes' />
                      <param name='display_spinner' value='yes' />
                      <param name='display_overlay' value='yes' />
                      <param name='display_count' value='yes' />
                      <param name='language' value='en-US' />
                    </object>
                  </div>
                </CardContent>
              </Card>

              {/* Power BI Dashboard */}
              <Card className="border-border shadow-md overflow-hidden">
                <CardContent className="p-6">
                  <h3 className="text-2xl font-semibold mb-4">Power BI Dashboard</h3>
                  <div style={{width: '100%', height: '600px'}}>
                    <iframe 
                      title="Store Sales" 
                      width="100%" 
                      height="100%" 
                      src="https://app.powerbi.com/view?r=eyJrIjoiM2Y1MTI2YTYtOTNlYS00MGQ4LThmMzktMTYyYjg3Mjk4M2FkIiwidCI6IjQ1NDIwZThkLTg1NTItNGEwMy05YjkyLWE5MzFlZjgzOWQzZiIsImMiOjh9" 
                      frameBorder="0" 
                      allowFullScreen={true}
                    ></iframe>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="mt-8">
              <p className="text-sm text-muted-foreground italic">
                Disclaimer: These are interactive dashboards that showcase my proficiency in Tableau and Power BI. They use publicly available data and serve as examples of my data visualization skills.
              </p>
            </div>
          </section>

          <section id="contact" ref={sectionRefs.contact} className="py-20">
            <h2 ref={el => { if (el) sectionHeaderRefs.current.contact = el }} className="text-3xl font-bold mb-8 text-center section-header">Get in Touch</h2>
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <Card className="border-border shadow-md card-hover flex-1">
                <CardContent className="p-8">
                  <h3 className="text-xl font-semibold mb-6">Contact Form</h3>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-muted-foreground mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        className="w-full px-3 py-2 bg-background border border-input rounded-md text-foreground focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="your@email.com"
                      />
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-muted-foreground mb-2">
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={4}
                        required
                        className="w-full px-3 py-2 bg-background border border-input rounded-md text-foreground focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Your message..."
                      ></textarea>
                    </div>
                    <Button type="submit" disabled={isSubmitting} className="w-full">
                      {isSubmitting ? 'Submitting...' : 'Submit'}
                    </Button>
                    {submitMessage && (
                      <p className="mt-4 text-green-600 dark:text-green-400">{submitMessage}</p>
                    )}
                  </form>
                </CardContent>
              </Card>
              
              <Card className="border-border shadow-md card-hover flex-1">
                <CardContent className="p-8">
                  <h3 className="text-xl font-semibold mb-6">Connect with Me</h3>
                  <p className="text-muted-foreground mb-6">
                    Feel free to reach out for collaborations, job opportunities, or just to say hello. I&apos;m always interested in new projects and connections.
                  </p>
                  <div className="space-y-4">
                    <a
                      href="mailto:ysr.kaan.kaya@outlook.com"
                      className="flex items-center p-3 bg-secondary rounded-md hover:bg-secondary/80 transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Mail className="h-5 w-5 mr-3 text-blue-600 dark:text-blue-400" /> 
                      <span>ysr.kaan.kaya@outlook.com</span>
                    </a>
                    <a
                      href="https://linkedin.com/in/yasarkaankaya"
                      className="flex items-center p-3 bg-secondary rounded-md hover:bg-secondary/80 transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Linkedin className="h-5 w-5 mr-3 text-blue-600 dark:text-blue-400" /> 
                      <span>linkedin.com/in/yasarkaankaya</span>
                    </a>
                    <a
                      href="https://github.com/YKaanKaya"
                      className="flex items-center p-3 bg-secondary rounded-md hover:bg-secondary/80 transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Github className="h-5 w-5 mr-3 text-blue-600 dark:text-blue-400" /> 
                      <span>github.com/YKaanKaya</span>
                    </a>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>
        </main>
        
        <footer className="bg-secondary py-6 mt-10">
          <div className="max-w-6xl mx-auto px-4 text-center text-muted-foreground">
            <p>© {new Date().getFullYear()} Kaan KAYA. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </div>
  )
}
