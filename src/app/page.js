"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useTheme } from '@/context/ThemeContext';
import Link from "next/link";
import { Button } from "@mui/material";
import { motion } from 'framer-motion';

export default function Home() {
  const { isDarkMode } = useTheme();

  // Structured data with proper escaping
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "TaskFlow",
    "description": "Advanced task management platform with AI-powered productivity features",
    "applicationCategory": "Productivity",
    "operatingSystem": "Web",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  };

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-300 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <Navbar />
      
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <section aria-labelledby="main-heading" className="text-center">
          <h1 id="main-heading" className={`text-4xl sm:text-5xl font-extrabold mb-6 bg-gradient-to-r ${isDarkMode ? 'from-blue-400 to-purple-600' : 'from-blue-600 to-purple-700'} bg-clip-text text-transparent`}>
            Transform Your Task Management with Smart Productivity Tools
          </h1>
          
          <p className={`text-lg sm:text-xl mb-8 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} max-w-2xl mx-auto`}>
            TaskFlow - The ultimate productivity platform featuring  you organize, prioritize, and conquer your tasks with intuitive drag-and-drop interface and smart productivity features
          </p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row justify-center gap-4 mb-16"
          >
            <Button
              component={Link}
              href="/account/login"
              variant="outlined"
              size="large"
              sx={{
                color: isDarkMode ? '#fff' : '#1a237e',
                borderColor: isDarkMode ? '#4f46e5' : '#3f51b5',
                '&:hover': {
                  borderColor: isDarkMode ? '#6366f1' : '#303f9f',
                  backgroundColor: isDarkMode ? 'rgba(99, 102, 241, 0.04)' : 'rgba(63, 81, 181, 0.04)'
                }
              }}
            >
              Sign In
            </Button>
            
            <Button
              component={Link}
              href="/account/register"
              variant="contained"
              size="large"
              sx={{
                background: isDarkMode 
                  ? 'linear-gradient(45deg, #6366f1 30%, #8b5cf6 90%)' 
                  : 'linear-gradient(45deg, #3f51b5 30%, #673ab7 90%)',
                color: '#fff',
                '&:hover': {
                  background: isDarkMode 
                    ? 'linear-gradient(45deg, #4f46e5 30%, #7c3aed 90%)' 
                    : 'linear-gradient(45deg, #303f9f 30%, #512da8 90%)'
                }
              }}
            >
              Get Started Free
            </Button>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 mt-12">
            {[
              { 
                title: 'Smart Task Organization', 
                icon: '🗃️', 
                description: 'Drag-and-drop interface with customizable kanban boards and AI-powered task prioritization'
              },
              { 
                title: 'Advanced Analytics', 
                icon: '📊', 
                description: 'Real-time productivity metrics with customizable reports and team performance insights'
              },
              { 
                title: 'Secure Collaboration', 
                icon: '🔒', 
                description: 'End-to-end encrypted password for privacy'
              }
            ].map((feature, idx) => (
              <motion.article 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className={`p-6 rounded-xl transition-all duration-300 ${isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50'} shadow-lg hover:shadow-xl`}
              >
                <div className="text-4xl mb-4" aria-hidden="true">{feature.icon}</div>
                <h2 className={`text-xl font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {feature.title}
                </h2>
                <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                  {feature.description}
                </p>
              </motion.article>
            ))}
          </div>
        </section>
      </main>

      <Footer />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </div>
  )
}