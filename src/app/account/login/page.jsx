"use client";
import { useFormik } from 'formik';
import { loginSchema } from "@/validation/schemas";
import { useLoginUserMutation } from "@/lib/services/auth";
import { useRouter } from 'next/navigation';
import Link from "next/link";
import { useState } from "react";
import { useTheme } from '@/context/ThemeContext';

const Login = () => {
  const router = useRouter();
  const { isDarkMode } = useTheme();
  const [message, setMessage] = useState({ type: '', content: '' });
  const [loginUser] = useLoginUserMutation();

  const { values, errors, touched, handleChange, handleSubmit } = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: loginSchema,
    onSubmit: async values => {
      try {
        const { data } = await loginUser(values).unwrap();
        setMessage({ type: 'success', content: data.message });
        router.push('/user/task');
      } catch (error) {
        setMessage({ type: 'error', content: error.data?.message || "Login failed" });
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
      <div className={`w-full max-w-md mx-4 p-8 rounded-2xl shadow-xl transition-colors duration-300 ${
        isDarkMode ? 'bg-gray-800' : 'bg-white'
      }`}>
        <div className="text-center space-y-2 mb-8">
          <h2 className={`text-3xl font-bold ${
            isDarkMode ? 'text-gray-100' : 'text-gray-900'
          }`}>
            Welcome Back
          </h2>
          <p className={`${
            isDarkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Sign in to continue to your account
          </p>
        </div>

        {message.content && (
          <div className={`mb-6 p-4 rounded-lg flex items-center gap-2 ${
            message.type === 'success' 
              ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' 
              : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
          }`}>
            <svg 
              className="w-5 h-5" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              {message.type === 'success' ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              )}
            </svg>
            {message.content}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className={`block text-sm font-medium ${
              isDarkMode ? 'text-gray-300' : 'text-gray-700'
            } mb-2`}>
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
              <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {errors.email}
              </p>
            )}
          </div>

          <div>
            <label className={`block text-sm font-medium ${
              isDarkMode ? 'text-gray-300' : 'text-gray-700'
            } mb-2`}>
              Password
            </label>
            <input
              name="password"
              type="password"
              value={values.password}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-lg border focus:ring-2 transition-all ${
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
              <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {errors.password}
              </p>
            )}
          </div>

          <div className="flex items-center justify-between">
            <Link 
              href="/account/reset-password-link" 
              className={`text-sm ${
                isDarkMode 
                  ? 'text-blue-400 hover:text-blue-300' 
                  : 'text-blue-600 hover:text-blue-700'
              } transition-colors`}
            >
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            className={`w-full py-3 px-6 font-medium rounded-lg transition-colors ${
              isDarkMode 
                ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            } focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
              isDarkMode ? 'focus:ring-offset-gray-800' : 'focus:ring-offset-white'
            }`}
          >
            Sign In
          </button>
        </form>

        <div className="mt-6">
          <button
            onClick={handleGoogleLogin}
            className={`w-full flex items-center justify-center gap-2 py-3 px-6 rounded-lg border transition-colors ${
              isDarkMode 
                ? 'border-gray-600 bg-gray-700 hover:bg-gray-600 text-gray-100' 
                : 'border-gray-300 bg-white hover:bg-gray-50 text-gray-700'
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="w-6 h-6">
              <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/>
              <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/>
              <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/>
              <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"/>
            </svg>
            <span>Continue with Google</span>
          </button>
        </div>

        <p className={`text-center text-sm mt-6 ${
          isDarkMode ? 'text-gray-400' : 'text-gray-600'
        }`}>
          Don't have an account?{" "}
          <Link 
            href="/account/register" 
            className={`${
              isDarkMode 
                ? 'text-blue-400 hover:text-blue-300' 
                : 'text-blue-600 hover:text-blue-700'
            } transition-colors`}
          >
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;