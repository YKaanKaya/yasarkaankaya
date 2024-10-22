"use client"

import { useEffect, useRef, useState } from 'react'
import { ArrowDown, Linkedin, Mail, Github, Moon, Sun } from 'lucide-react'
import Image from 'next/image'

import { Button, buttonVariants } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export function PortfolioComponent() {
  const [activeSection, setActiveSection] = useState('profile')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState('')
  const [darkMode, setDarkMode] = useState(false)
  const [tableauLoaded, setTableauLoaded] = useState(false);
  const [powerBILoaded, setPowerBILoaded] = useState(false);
  const sectionRefs = {
    profile: useRef<HTMLElement>(null),
    about: useRef<HTMLElement>(null),
    experience: useRef<HTMLElement>(null),
    projects: useRef<HTMLElement>(null),
    skills: useRef<HTMLElement>(null),
    certificates: useRef<HTMLElement>(null),
    biPlayground: useRef<HTMLElement>(null),
    contact: useRef<HTMLElement>(null),
  }
  const sectionHeaderRefs = useRef<{ [key: string]: HTMLHeadingElement }>({})

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
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      Object.entries(sectionHeaderRefs.current).forEach(([section, ref]) => {
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

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
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

  useEffect(() => {
    const loadPowerBIScript = () => {
      const script = document.createElement('script');
      script.src = 'https://microsoft.github.io/PowerBI-JavaScript/demo/node_modules/powerbi-client/dist/powerbi.min.js';
      script.async = true;
      script.onload = () => {
        setPowerBILoaded(true);
      };
      document.body.appendChild(script);
    };

    loadPowerBIScript();

    return () => {
      const script = document.querySelector('script[src="https://microsoft.github.io/PowerBI-JavaScript/demo/node_modules/powerbi-client/dist/powerbi.min.js"]');
      if (script) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
      <div className={`bg-gray-50 text-gray-800 dark:bg-gray-900 dark:text-gray-100 min-h-screen transition-colors duration-300`}>
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
          .dark .button-outline {
            color: white;
            background-color: transparent;
            border-color: white;
          }
          .dark .button-outline:hover {
            background-color: rgba(255, 255, 255, 0.1);
          }
        `}</style>
        <nav className="sticky top-0 z-50 bg-white dark:bg-gray-800 bg-opacity-90 dark:bg-opacity-90 backdrop-blur-md shadow-sm">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <ul className="flex space-x-4">
                {(Object.keys(sectionRefs) as Array<keyof typeof sectionRefs>).map((section) => (
                  <li key={section}>
                    <button
                      onClick={() => scrollToSection(section)}
                      className={`text-sm font-medium transition-colors hover:text-blue-600 dark:hover:text-blue-400 ${
                        activeSection === section ? 'text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-300'
                      }`}
                    >
                      {section === 'biPlayground' ? 'BI Playground' : section.charAt(0).toUpperCase() + section.slice(1)}
                    </button>
                  </li>
                ))}
              </ul>
              <Button onClick={toggleDarkMode} variant="ghost" size="icon">
                {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </nav>

        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <section id="profile" ref={sectionRefs.profile} className="min-h-screen flex flex-col items-center justify-center py-20">
            <div className="text-center">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/profile-picture-9S4zYT3k7MztvepSNsuVikeKfv1tH2.jpg"
                alt="Kaan KAYA"
                width={200}
                height={200}
                className="rounded-full mx-auto mb-8 border-4 border-blue-500 dark:border-blue-400"
              />
              <h1 className="text-5xl font-bold mb-4">Kaan KAYA</h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">Data Analytics Professional</p>
              <Button onClick={() => scrollToSection('about')} className="animate-bounce">
                <ArrowDown className="mr-2 h-4 w-4" /> Learn More
              </Button>
            </div>
          </section>

          <section id="about" ref={sectionRefs.about} className="py-20">
            <h2 ref={el => { if (el) sectionHeaderRefs.current.about = el }} className="text-3xl font-bold mb-8 text-center section-header">About Me</h2>
            <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
              <CardContent className="p-6">
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  I am a seasoned Data Analytics Professional with a passion for transforming complex data into actionable insights. With extensive experience across various industries, I specialize in leveraging advanced analytics techniques, machine learning, and business intelligence tools to drive data-informed decision-making.
                </p>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  My expertise spans the entire data lifecycle, from ETL processes and data warehousing to predictive modeling and visualization. I'm particularly adept at bridging the gap between technical and business stakeholders, ensuring that data solutions align with strategic objectives.
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  Throughout my career, I've consistently delivered projects that not only meet but exceed expectations, resulting in significant cost savings and performance improvements. I'm always eager to tackle new challenges and contribute to innovative data-driven solutions.
                </p>
              </CardContent>
            </Card>
          </section>

          <section id="experience" ref={sectionRefs.experience} className="py-20">
            <h2 ref={el => { if (el) sectionHeaderRefs.current.experience = el }} className="text-3xl font-bold mb-8 text-center section-header">Experience</h2>
            <div className="space-y-8">
              {[
                {
                  title: 'Senior Data Analyst',
                  company: 'Data Punk',
                  period: 'Aug 2024 - Current',
                  description: 'Designed and automated ETL pipelines, performed text analytics and sentiment analysis, created intuitive dashboards using Power BI and Python, and implemented AI-driven workflows for automation in ratings systems.'
                },
                {
                  title: 'Technical Business Analyst',
                  company: 'Schroders',
                  period: 'May 2022 - Jul 2024',
                  description: 'Led transformation of financial reporting processes, managed the full software development lifecycle, and built strong relationships with internal stakeholders.'
                },
                {
                  title: 'Data Consultancy & Contract work',
                  company: 'Lingaro, Carmignac',
                  period: 'Aug 2021 - Apr 2022',
                  description: 'Supported clients with data management, automation, and reporting solutions to optimize decision-making processes and meet regulatory requirements.'
                },
                {
                  title: 'Technical Business Analyst',
                  company: 'Standard Chartered Bank',
                  period: 'Nov 2019 - Jul 2021',
                  description: 'Led strategic redesign of market risk reporting systems, automated liquidity and financial reporting processes, and managed regulatory projects.'
                },
                {
                  title: 'Senior Financial Analyst / Product Controller',
                  company: 'J.P. Morgan Chase',
                  period: 'Oct 2018 - Oct 2019',
                  description: 'Automated and improved financial reports using VBA, MS Access, SQL, and Python, driving efficiency and cost savings.'
                },
                {
                  title: 'Financial Analyst / Product Controller',
                  company: 'NatWest Markets',
                  period: 'Jul 2016 - Sep 2018',
                  description: 'Reengineered financial processes, achieving annual cost savings of £70,000 through automation and process improvements.'
                },
                {
                  title: 'Data Analyst',
                  company: 'FRU.PL S.A.',
                  period: 'Mar 2015 - Jul 2016',
                  description: 'Implemented a SQL database by extracting data from various sources and loading it to the database to lead data-driven business decisions.'
                }
              ].map((job, index) => (
                <Card key={index} className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold">{job.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300">{job.company} | {job.period}</p>
                    <p className="mt-2 text-gray-700 dark:text-gray-200">{job.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <section id="projects" ref={sectionRefs.projects} className="py-20">
            <h2 ref={el => { if (el) sectionHeaderRefs.current.projects = el }} className="text-3xl font-bold mb-8 text-center section-header">Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  title: 'Stock Performance and ESG Scores',
                  description: 'Developed an application for demonstrating, visualizing, and interacting with various stock performance indicators and ESG scores.',
                  link: 'https://gsinfo.streamlit.app/'
                },
                {
                  title: 'Team Performance Dashboard',
                  description: 'Developed and presented a comprehensive Team Performance Dashboard to the CTO for strategic team planning purposes.',
                  link: '#'
                },
                {
                  title: 'System Performance Improvement',
                  description: 'Spearheaded performance analysis, identified bottlenecks, and created system performance dashboards using Power BI. Achieved a 36% performance improvement, resulting in £50,000 in savings.',
                  link: '#'
                },
                {
                  title: 'Automation of Daily Audit Report',
                  description: 'Led a successful transformation project leveraging Python for ETL processes and Power BI for dashboard creation.',
                  link: '#'
                }
              ].map((project, index) => (
                <Card key={index} className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">{project.description}</p>
                    <Button variant="outline" asChild>
                      <a href={project.link} target="_blank" rel="noopener noreferrer">View Project</a>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <section id="skills" ref={sectionRefs.skills} className="py-20">
            <h2 ref={el => { if (el) sectionHeaderRefs.current.skills = el }} className="text-3xl font-bold mb-8 text-center section-header">Skills</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { name: 'Python', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
                { name: 'SQL', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
                { name: 'AWS', logo: 'https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg' },
                { name: 'Azure', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg' },
                { name: 'GCP', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg' },
                { name: 'Power BI', logo: 'https://upload.wikimedia.org/wikipedia/commons/c/cf/New_Power_BI_Logo.svg' },
                { name: 'Tableau', logo: 'https://cdn.worldvectorlogo.com/logos/tableau-software.svg' },
                { name: 'ActivePivot', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
              ].map((skill) => (
                <div key={skill.name} className="flex flex-col items-center">
                  <div className="w-20 h-20 flex items-center justify-center mb-2 bg-white dark:bg-gray-800 rounded-full p-3">
                    <Image
                      src={skill.logo}
                      alt={`${skill.name} logo`}
                      width={64}
                      height={64}
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                  <p className="text-center text-sm mt-2">{skill.name}</p>
                </div>
              ))}
            </div>
          </section>

          <section id="certificates" ref={sectionRefs.certificates} className="py-20">
            <h2 ref={el => { if (el) sectionHeaderRefs.current.certificates = el }} className="text-3xl font-bold mb-8 text-center section-header">Certificates</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                { name: 'Google Advanced Data Analytics', issuer: 'Google', link: 'https://www.coursera.org/account/accomplishments/professional-cert/AALR5T4XSEY6' },
                { name: 'AZ-900: Microsoft Azure Fundamentals', issuer: 'Microsoft', link: 'https://learn.microsoft.com/api/achievements/share/en-us/YasarKAYA-5240/JY5EYETG?sharingId=7FE4C6AF70E73B72' },
                { name: 'PSM 1 - Professional Scrum Master', issuer: 'Scrum.org', link: 'https://www.scrum.org/certificates/1021848' },
                { name: 'Machine Learning Specialization', issuer: 'Stanford University', link: 'https://www.coursera.org/account/accomplishments/specialization/U89AFBFR4NMM' },
              ].map((cert, index) => (
                <Card key={index} className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{cert.name}</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">Issued by: {cert.issuer}</p>
                    <Button variant="outline" asChild>
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
              <div>
                <h3 className="text-2xl font-semibold mb-4">Tableau Dashboard</h3>
                <div className='tableauPlaceholder' id='viz1729591853089' style={{position: 'relative', width: '100%', height: '600px'}}>
                  <noscript>
                    <a href='#'>
                      <img 
                        alt='Number of strikes in the United States ' 
                        src='https://public.tableau.com/static/images/Fo/Follow-alongguideWorkwithTableauPart1_16953973838800/Story1/1_rss.png' 
                        style={{border: 'none'}} 
                      />
                    </a>
                  </noscript>
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
              </div>

              {/* Power BI Dashboard */}
              <div>
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
              </div>
            </div>
            
            <div className="mt-8">
              <p className="text-sm text-gray-600 dark:text-gray-400 italic">
                Disclaimer: These are sample dashboards that showcase my proficiency in Tableau and Power BI. They use publicly available data and serve as examples of my data visualization skills.
              </p>
            </div>
          </section>

          <section id="contact" ref={sectionRefs.contact} className="py-20">
            <h2 ref={el => { if (el) sectionHeaderRefs.current.contact = el }} className="text-3xl font-bold mb-8 text-center section-header">Get in Touch</h2>
            <p className="text-xl mb-8 text-center">I'm always open to new opportunities and collaborations.</p>
            <form onSubmit={handleSubmit} className="max-w-md mx-auto mb-8">
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                  placeholder="your@email.com"
                />
              </div>
              <Button type="submit" disabled={isSubmitting} className="w-full">
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </Button>
              {submitMessage && (
                <p className="mt-4 text-green-600 dark:text-green-400">{submitMessage}</p>
              )}
            </form>
            <div className="flex justify-center space-x-6">
              <a
                href="mailto:kaankaya@live.com"
                className={`${buttonVariants({ variant: "outline" })} button-outline`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Mail className="mr-2 h-4 w-4" /> Email
              </a>
              <a
                href="https://linkedin.com/in/yasarkaankaya"
                className={`${buttonVariants({ variant: "outline" })} button-outline`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin className="mr-2 h-4 w-4" /> LinkedIn
              </a>
              <a
                href="https://github.com/YKKaya"
                className={`${buttonVariants({ variant: "outline" })} button-outline`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="mr-2 h-4 w-4" /> GitHub
              </a>
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}
