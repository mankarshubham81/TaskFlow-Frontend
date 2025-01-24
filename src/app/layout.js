// app/layout.jsx
import "./globals.css";
import { ThemeProvider } from '@/context/ThemeContext';
import StoreProvider from "./StoreProvider";

export const metadata = {
  title: "TaskFlow - Smart Task Management & Productivity Platform",
  description: "Transform your workflow with TaskFlow's task management, real time management tool, and enterprise-grade security. Perfect for teams and individuals.",
  keywords: "task management, productivity tools, team collaboration, project management software, workflow automation",
  openGraph: {
    title: "TaskFlow - Smart Task Management Platform",
    description: "AI-powered productivity tools with real-time collaboration and security",
    url: "https://yourdomain.com",
    siteName: "TaskFlow",
    images: [
      {
        url: "/",
        width: 1200,
        height: 630,
      }
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TaskFlow - Smart Task Management Platform",
    description: "AI-powered productivity tools with real-time collaboration",
    images: ["/twitter-image.jpg"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="canonical" href="https://yourdomain.com" />
        <meta name="google-site-verification" content="your_verification_code" />
      </head>
      <body className="bg-gray-100">
        <ThemeProvider>
          <StoreProvider>
            {children}
          </StoreProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}