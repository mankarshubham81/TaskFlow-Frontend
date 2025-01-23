"use client"
import Navbar from "@/components/Navbar"
import { useTheme } from '@/context/ThemeContext'; // Correct import

const Home = () => {
  const { isDarkMode } = useTheme(); // Now works correctly

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <Navbar />
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h1 className={`text-5xl font-extrabold mb-6 bg-gradient-to-r ${isDarkMode ? 'from-blue-400 to-purple-600' : 'from-blue-600 to-purple-700'} bg-clip-text text-transparent`}>
            Transform Your Productivity
          </h1>
          <p className={`text-xl mb-8 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} max-w-2xl mx-auto`}>
            TaskFlow helps you organize, prioritize, and conquer your tasks with intuitive drag-and-drop interface and smart productivity features.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            {[
              { title: 'Smart Organization', icon: '🗃️', description: 'Drag-and-drop interface with customizable workflows' },
              { title: 'Team Collaboration', icon: '👥', description: 'Share tasks and projects with your team' },
              { title: 'Advanced Analytics', icon: '📊', description: 'Track your productivity with detailed insights' }
            ].map((feature, idx) => (
              <div key={idx} className={`p-6 rounded-xl transition-all duration-300 ${isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50'} shadow-lg hover:shadow-xl`}>
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className={`text-xl font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {feature.title}
                </h3>
                <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home;