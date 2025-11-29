"use client"

import { useEffect, useState } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"

export function BiPlayground() {
    const [tableauLoaded, setTableauLoaded] = useState(false)

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

    return (
        <section id="biPlayground" className="py-20">
            <div className="max-w-7xl mx-auto px-4">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-3xl font-bold mb-12 text-center"
                >
                    Business Intelligence Playground
                </motion.h2>

                <div className="space-y-12">
                    {/* Tableau Dashboard */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <Card className="border-border shadow-lg overflow-hidden">
                            <CardContent className="p-6">
                                <h3 className="text-2xl font-semibold mb-6">Tableau Dashboard</h3>
                                <div className='tableauPlaceholder' id='viz1729591853089' style={{ position: 'relative', width: '100%', height: '600px' }}>
                                    <object className='tableauViz' style={{ display: 'none', width: '100%', height: '100%' }}>
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
                    </motion.div>

                    {/* Power BI Dashboard */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                    >
                        <Card className="border-border shadow-lg overflow-hidden">
                            <CardContent className="p-6">
                                <h3 className="text-2xl font-semibold mb-6">Power BI Dashboard</h3>
                                <div className="aspect-video w-full">
                                    <iframe
                                        title="Store Sales"
                                        width="100%"
                                        height="100%"
                                        src="https://app.powerbi.com/view?r=eyJrIjoiM2Y1MTI2YTYtOTNlYS00MGQ4LThmMzktMTYyYjg3Mjk4M2FkIiwidCI6IjQ1NDIwZThkLTg1NTItNGEwMy05YjkyLWE5MzFlZjgzOWQzZiIsImMiOjh9"
                                        frameBorder="0"
                                        allowFullScreen={true}
                                        className="rounded-lg"
                                    ></iframe>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>

                <div className="mt-8 text-center">
                    <p className="text-sm text-muted-foreground italic">
                        Disclaimer: These are interactive dashboards that showcase my proficiency in Tableau and Power BI. They use publicly available data and serve as examples of my data visualization skills.
                    </p>
                </div>
            </div>
        </section>
    )
}
