"use client";
import { useFormik } from 'formik';
import { resetPasswordLinkSchema } from "@/validation/schemas";
import { useResetPasswordLinkMutation } from "@/lib/services/auth";
import Link from "next/link";
import { useState } from "react";
import { useTheme } from '@/context/ThemeContext';

const ResetPasswordLink = () => {
  const { isDarkMode } = useTheme();
  const [message, setMessage] = useState({ type: '', content: '' });
  const [resetPasswordLink] = useResetPasswordLinkMutation();
  
  const { values, errors, touched, handleChange, handleSubmit } = useFormik({
    initialValues: { email: "" },
    validationSchema: resetPasswordLinkSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const { data } = await resetPasswordLink(values).unwrap();
        setMessage({ type: 'success', content: data.message });
        resetForm();
      } catch (error) {
        setMessage({ type: 'error', content: error.data?.message || "Failed to send reset link" });
      }
    }
  });

  return (
    <div className={`min-h-screen flex items-center justify-center transition-colors duration-300 ${
      isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      <div className={`w-full max-w-md mx-4 p-8 rounded-xl shadow-xl transition-all duration-300 ${
        isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
      }`}>
        <div className="text-center space-y-3 mb-8">
          <h2 className={`text-3xl font-bold tracking-tight ${
            isDarkMode ? 'text-gray-100' : 'text-gray-900'
          }`}>
            Reset Password
          </h2>
          <p className={`text-sm ${
            isDarkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Enter your email to receive a reset link
          </p>
        </div>

        {message.content && (
          <div className={`mb-6 p-3 rounded-lg flex items-center gap-3 ${
            message.type === 'success' 
              ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 border border-green-200 dark:border-green-800' 
              : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 border border-red-200 dark:border-red-800'
          }`}>
            <svg 
              className="w-5 h-5 flex-shrink-0" 
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
            <span className="text-sm">{message.content}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className={`block text-sm font-medium ${
              isDarkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Email Address
            </label>
            <input
              name="email"
              type="email"
              value={values.email}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-lg border focus:ring-2 transition-all ${
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
              <p className="mt-1 text-sm text-red-500 flex items-center gap-1.5">
                <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <span>{errors.email}</span>
              </p>
            )}
          </div>

          <button
            type="submit"
            className={`w-full py-3 px-6 font-medium rounded-lg transition-colors 
              focus:outline-none focus:ring-2 focus:ring-offset-2 ${
              isDarkMode 
                ? 'bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500 focus:ring-offset-gray-800' 
                : 'bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500 focus:ring-offset-white'
            }`}
          >
            Send Reset Link
          </button>
        </form>

        <p className={`text-center text-sm mt-8 ${
          isDarkMode ? 'text-gray-400' : 'text-gray-600'
        }`}>
          Remember your password?{" "}
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

export default ResetPasswordLink;