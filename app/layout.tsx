import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import Script from "next/script";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Yasar Kaan Kaya",
  description: "Personal website of Yasar Kaan Kaya",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider 
          attribute="class" 
          defaultTheme="system"
          themes={["light", "dark", "system", "read"]}
          enableSystem
          disableTransitionOnChange
          forcedTheme={undefined}
        >
          {children}
        </ThemeProvider>
        {/* Datadog RUM Script - loaded at runtime only */}
        <Script id="datadog-rum" strategy="lazyOnload">
          {`
            (function(h,o,u,n,d) {
              h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
              d=o.createElement(u);d.async=1;d.src=n
              n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
            })(window,document,'script','https://www.datadoghq-browser-agent.com/us5/v5/datadog-rum.js','DD_RUM')
            
            window.DD_RUM && window.DD_RUM.onReady(function() {
              const appId = '${process.env.NEXT_PUBLIC_DATADOG_APPLICATION_ID || ''}';
              const clientToken = '${process.env.NEXT_PUBLIC_DATADOG_CLIENT_TOKEN || ''}';

              if (appId && clientToken) {
                window.DD_RUM.init({
                  applicationId: appId,
                  clientToken: clientToken,
                  site: 'us5.datadoghq.com',
                  service: 'portfolio',
                  env: 'prod',
                  sessionSampleRate: 100,
                  sessionReplaySampleRate: 20,
                  trackUserInteractions: true,
                  trackResources: true,
                  trackLongTasks: true
                });
                console.log('Datadog RUM initialized');
              } else {
                console.warn('Datadog credentials missing');
              }
            });
          `}
        </Script>
        <Script id="datadog-page-tracking" strategy="afterInteractive">
          {`
            // Track page views
            function trackPageView() {
              if (window.DD_RUM && window.DD_RUM.onReady) {
                window.DD_RUM.onReady(function() {
                  window.DD_RUM.addAction('page_view', {
                    page_path: window.location.pathname,
                    page_title: document.title
                  });
                });
              }
            }

            // Initial page load
            trackPageView();

            // Listen for route changes (Next.js)
            document.addEventListener('visibilitychange', function() {
              if (document.visibilityState === 'visible') {
                trackPageView();
              }
            });
          `}
        </Script>
      </body>
    </html>
  );
}
