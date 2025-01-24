"use client";
import { useTheme } from '@/context/ThemeContext';
import { 
  Box,
  Typography,
  Link,
  IconButton,
  useMediaQuery 
} from "@mui/material";
import { 
  GitHub,
  LinkedIn,
  Instagram,
  Email,
  ArrowUpward 
} from "@mui/icons-material";
import { motion } from 'framer-motion';

const Footer = () => {
  const { isDarkMode } = useTheme();
  const isMobile = useMediaQuery('(max-width:768px)');

  // Social links configuration
  const socialLinks = [
    { 
      icon: GitHub, 
      label: "GitHub Repository",
      href: "https://github.com/mankarshubham81",
      color: isDarkMode ? '#e5e7eb' : '#1f2937'
    },
    { 
      icon: LinkedIn, 
      label: "LinkedIn Profile",
      href: "https://www.linkedin.com/in/mankarshubham81",
      color: isDarkMode ? '#e5e7eb' : '#1f2937'
    },
    { 
      icon: Instagram, 
      label: "Instagram Account",
      href: "https://www.instagram.com/mankarshubham81",
      color: isDarkMode ? '#e5e7eb' : '#1f2937'
    },
    { 
      icon: Email, 
      label: "Contact Email",
      href: "mailto:mankarshubham81@gmail.com",
      color: isDarkMode ? '#e5e7eb' : '#1f2937'
    }
  ];

  const footerLinks = [
    { text: "Login", href: "/account/login" },
    { text: "Register", href: "/account/register" },
    { text: "Portfolio", href: "https://mankarshubham81.netlify.app/", external: true },
    { text: "Blog", href: "https://context-fusion.vercel.app/", external: true },
    { text: "Web Chat", href: "https://chat-super.vercel.app/", external: true },
  ];

  const legalLinks = [
    { text: "Privacy Policy", href: "/privacy" },
    { text: "Terms of Service", href: "/terms" },
    { text: "Cookie Policy", href: "/cookies" },
  ];

  return (
    <footer 
      className={`mt-auto border-t ${
        isDarkMode 
          ? 'border-gray-700 bg-gray-800/80' 
          : 'border-gray-200 bg-white/80'
      } backdrop-blur-lg`}
      aria-label="Website footer"
    >
      <Box className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Brand Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <Typography 
              component="h2"
              variant="h6" 
              className={`font-bold ${
                isDarkMode ? 'text-gray-100' : 'text-gray-900'
              }`}
            >
              TaskFlow
            </Typography>
            <Typography 
              variant="body2"
              className={`${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}
            >
              Revolutionizing productivity through intelligent task management.
            </Typography>
            
            <div className="flex justify-start gap-4">
              {socialLinks.map((social, index) => (
                <IconButton
                  key={index}
                  component="a"
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  sx={{
                    color: social.color,
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      color: '#fff',
                      background: isDarkMode 
                        ? 'linear-gradient(45deg, #6366f1 30%, #8b5cf6 90%)' 
                        : 'linear-gradient(45deg, #3f51b5 30%, #673ab7 90%)'
                    }
                  }}
                >
                  <social.icon fontSize={isMobile ? "small" : "medium"} />
                </IconButton>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Typography 
              variant="subtitle1" 
              component="h3"
              className={`font-semibold mb-4 ${
                isDarkMode ? 'text-gray-100' : 'text-gray-900'
              }`}
            >
              Product
            </Typography>
            <nav aria-label="Product navigation">
              <div className="space-y-2">
                {footerLinks.map((link, index) => (
                  <Link
                    key={index}
                    href={link.href}
                    target={link.external ? "_blank" : "_self"}
                    rel={link.external ? "noopener noreferrer" : ""}
                    className={`block text-sm transition-colors ${
                      isDarkMode 
                        ? 'text-gray-400 hover:text-blue-400' 
                        : 'text-gray-600 hover:text-blue-600'
                    }`}
                    underline="none"
                    aria-label={`Navigate to ${link.text}`}
                    sx={{
                      '&:hover': {
                        transform: 'translateX(4px)'
                      }
                    }}
                  >
                    {link.text} {link.external && "↗"}
                  </Link>
                ))}
              </div>
            </nav>
          </motion.div>

          {/* Legal Links */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Typography 
              variant="subtitle1" 
              component="h3"
              className={`font-semibold mb-4 ${
                isDarkMode ? 'text-gray-100' : 'text-gray-900'
              }`}
            >
              Legal
            </Typography>
            <nav aria-label="Legal navigation">
              <div className="space-y-2">
                {legalLinks.map((link, index) => (
                  <Link
                    key={index}
                    href={link.href}
                    className={`block text-sm transition-colors ${
                      isDarkMode 
                        ? 'text-gray-400 hover:text-blue-400' 
                        : 'text-gray-600 hover:text-blue-600'
                    }`}
                    underline="none"
                    aria-label={`View ${link.text}`}
                    sx={{
                      '&:hover': {
                        transform: 'translateX(4px)'
                      }
                    }}
                  >
                    {link.text}
                  </Link>
                ))}
              </div>
            </nav>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div 
          className={`pt-8 border-t ${
            isDarkMode ? 'border-gray-700' : 'border-gray-200'
          } flex flex-col md:flex-row justify-between items-center gap-4`}
        >
          <Typography 
            variant="body2"
            className={`text-center md:text-left ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}
          >
            © {new Date().getFullYear()} TaskFlow. All rights reserved.
          </Typography>

          <IconButton 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Scroll to top"
            sx={{
              color: isDarkMode ? '#e5e7eb' : '#1f2937',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              '&:hover': {
                transform: 'scale(1.1)',
                color: '#fff',
                background: isDarkMode 
                  ? 'linear-gradient(45deg, #6366f1 30%, #8b5cf6 90%)' 
                  : 'linear-gradient(45deg, #3f51b5 30%, #673ab7 90%)'
              }
            }}
          >
            <ArrowUpward fontSize={isMobile ? "small" : "medium"} />
          </IconButton>
        </div>
      </Box>
    </footer>
  );
};

export default Footer;