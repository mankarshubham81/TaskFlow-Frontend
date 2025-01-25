"use client";
import { useFormik } from 'formik';
import { registerSchema } from '@/validation/schemas';
import { useCreateUserMutation } from "@/lib/services/auth";
import { useRouter } from 'next/navigation';
import Link from "next/link";
import { useState } from "react";
import { useTheme } from '@/context/ThemeContext';

const Register = () => {
  const router = useRouter();
  const { isDarkMode } = useTheme();
  const [message, setMessage] = useState({ type: '', content: '' });
  const [createUser, { isLoading }] = useCreateUserMutation();

  const { values, errors, touched, handleChange, handleSubmit } = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      password_confirmation: ""
    },
    validationSchema: registerSchema,
    onSubmit: async values => {
      try {
        const { data } = await createUser(values).unwrap();
        setMessage({ type: 'success', content: data.message });
        router.push('/account/verify-email');
      } catch (error) {
        let errorMessage = "Registration failed";
        
        if (error.status === 400) {
          errorMessage = error.data?.message || "Validation error";
        } else if (error.status === 409) {
          errorMessage = "Email already registered";
        } else if (error.status === 500) {
          errorMessage = "Server error. Please try again later.";
        }
    
        setMessage({ type: 'error', content: errorMessage });
      }
    }
  });

  const handleGoogleLogin = () => {
    window.open(`https://taskflow-backend-vv35.onrender.com/auth/google`, "_self");
  };

  return (
    <div className={`min-h-screen flex items-center justify-center transition-colors duration-300 ${
      isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      <div className={`w-full max-w-md mx-4 p-4 sm:p-6 rounded-xl shadow-xl transition-all duration-300 ${
        isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
      }`}>
        <div className="text-center space-y-1 mb-4">
          <h2 className={`text-xl sm:text-2xl font-bold tracking-tight ${
            isDarkMode ? 'text-gray-100' : 'text-gray-900'
          }`}>
            Create Account
          </h2>
          <p className={`text-xs sm:text-sm ${
            isDarkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Get started with your free account
          </p>
        </div>

        {message.content && (
          <div className={`mb-3 p-2 sm:p-3 rounded-lg flex items-center gap-2 ${
            message.type === 'success' 
              ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 border border-green-200 dark:border-green-800' 
              : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 border border-red-200 dark:border-red-800'
          }`}>
            <svg 
              className="w-4 h-4 flex-shrink-0" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              {message.type === 'success' ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              )}
            </svg>
            <span className="text-xs sm:text-sm">{message.content}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="space-y-1">
            <label className={`block text-xs sm:text-sm font-medium ${
              isDarkMode ? 'text-gray-300' : 'text-gray-700'
            } mb-0.5`}>
              Full Name
            </label>
            <input
              name="name"
              type="text"
              value={values.name}
              onChange={handleChange}
              className={`w-full px-3 py-2 rounded-lg border focus:ring-2 transition-all text-sm sm:text-base ${
                touched.name && errors.name 
                  ? 'border-red-500 focus:ring-red-500' 
                  : `${
                      isDarkMode 
                        ? 'border-gray-600 focus:border-blue-500 focus:ring-blue-500' 
                        : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
                    }`
              } ${
                isDarkMode 
                  ? 'bg-gray-700 text-gray-100 placeholder-gray-400' 
                  : 'bg-white text-gray-900 placeholder-gray-500'
              }`}
              placeholder="John Doe"
            />
            {touched.name && errors.name && (
              <p className="mt-1 text-xs text-red-500 flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <span>{errors.name}</span>
              </p>
            )}
          </div>

          <div className="space-y-1">
            <label className={`block text-xs sm:text-sm font-medium ${
              isDarkMode ? 'text-gray-300' : 'text-gray-700'
            } mb-0.5`}>
              Email Address
            </label>
            <input
              name="email"
              type="email"
              value={values.email}
              onChange={handleChange}
              className={`w-full px-3 py-2 rounded-lg border focus:ring-2 transition-all text-sm sm:text-base ${
                touched.email && errors.email 
                  ? 'border-red-500 focus:ring-red-500' 
                  : `${
                      isDarkMode 
                        ? 'border-gray-600 focus:border-blue-500 focus:ring-blue-500' 
                        : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
                    }`
              } ${
                isDarkMode 
                  ? 'bg-gray-700 text-gray-100 placeholder-gray-400' 
                  : 'bg-white text-gray-900 placeholder-gray-500'
              }`}
              placeholder="your@email.com"
            />
            {touched.email && errors.email && (
              <p className="mt-1 text-xs text-red-500 flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <span>{errors.email}</span>
              </p>
            )}
          </div>

          <div className="space-y-1">
            <label className={`block text-xs sm:text-sm font-medium ${
              isDarkMode ? 'text-gray-300' : 'text-gray-700'
            } mb-0.5`}>
              Password
            </label>
            <input
              name="password"
              type="password"
              value={values.password}
              onChange={handleChange}
              className={`w-full px-3 py-2 rounded-lg border focus:ring-2 transition-all text-sm sm:text-base ${
                touched.password && errors.password 
                  ? 'border-red-500 focus:ring-red-500' 
                  : `${
                      isDarkMode 
                        ? 'border-gray-600 focus:border-blue-500 focus:ring-blue-500' 
                        : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
                    }`
              } ${
                isDarkMode 
                  ? 'bg-gray-700 text-gray-100 placeholder-gray-400' 
                  : 'bg-white text-gray-900 placeholder-gray-500'
              }`}
              placeholder="••••••••"
            />
            {touched.password && errors.password && (
              <p className="mt-1 text-xs text-red-500 flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <span>{errors.password}</span>
              </p>
            )}
          </div>

          <div className="space-y-1">
            <label className={`block text-xs sm:text-sm font-medium ${
              isDarkMode ? 'text-gray-300' : 'text-gray-700'
            } mb-0.5`}>
              Confirm Password
            </label>
            <input
              name="password_confirmation"
              type="password"
              value={values.password_confirmation}
              onChange={handleChange}
              className={`w-full px-3 py-2 rounded-lg border focus:ring-2 transition-all text-sm sm:text-base ${
                touched.password_confirmation && errors.password_confirmation 
                  ? 'border-red-500 focus:ring-red-500' 
                  : `${
                      isDarkMode 
                        ? 'border-gray-600 focus:border-blue-500 focus:ring-blue-500' 
                        : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
                    }`
              } ${
                isDarkMode 
                  ? 'bg-gray-700 text-gray-100 placeholder-gray-400' 
                  : 'bg-white text-gray-900 placeholder-gray-500'
              }`}
              placeholder="••••••••"
            />
            {touched.password_confirmation && errors.password_confirmation && (
              <p className="mt-1 text-xs text-red-500 flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <span>{errors.password_confirmation}</span>
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-2 px-6 text-sm sm:text-base font-medium rounded-lg transition-colors 
              focus:outline-none focus:ring-2 focus:ring-offset-2 ${
              isDarkMode 
                ? 'bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500 focus:ring-offset-gray-800' 
                : 'bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500 focus:ring-offset-white'
            } ${isLoading ? 'opacity-75 cursor-wait' : ''}`}
          >
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <div className="mt-3">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className={`w-full border-t ${
                isDarkMode ? 'border-gray-700' : 'border-gray-300'
              }`}></div>
            </div>
            <div className="relative flex justify-center">
              <span className={`px-2 text-xs sm:text-sm ${
                isDarkMode ? 'bg-gray-800 text-gray-400' : 'bg-white text-gray-600'
              }`}>
                Or continue with
              </span>
            </div>
          </div>

          <button
            onClick={handleGoogleLogin}
            className={`w-full mt-3 flex items-center justify-center gap-2 py-2 px-6 rounded-lg border transition-colors 
              text-xs sm:text-sm ${
                isDarkMode 
                  ? 'border-gray-700 bg-gray-800 hover:bg-gray-700 text-gray-200' 
                  : 'border-gray-300 bg-white hover:bg-gray-50 text-gray-700'
              } focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 ${
                isDarkMode ? 'focus:ring-offset-gray-800' : 'focus:ring-offset-white'
              }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="w-5 h-5">
              <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/>
              <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/>
              <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/>
              <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"/>
            </svg>
            <span className="text-sm font-medium">Google</span>
          </button>
        </div>

        <p className={`text-center text-xs sm:text-sm mt-4 ${
          isDarkMode ? 'text-gray-400' : 'text-gray-600'
        }`}>
          Already have an account?{" "}
          <Link 
            href="/account/login" 
            className={`font-medium ${
              isDarkMode 
                ? 'text-blue-400 hover:text-blue-300' 
                : 'text-blue-600 hover:text-blue-700'
            } transition-colors`}
          >
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;