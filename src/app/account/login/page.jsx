"use client";
import { useFormik } from 'formik';
import { loginSchema } from "@/validation/schemas";
import { useLoginUserMutation } from "@/lib/services/auth";
import { useRouter } from 'next/navigation';
import Link from "next/link";
import { useState } from "react";

const Login = () => {
  const router = useRouter();
  const [message, setMessage] = useState({ type: '', content: '' });
  const [loginUser] = useLoginUserMutation();

  const { values, errors, touched, handleChange, handleSubmit } = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: loginSchema,
    onSubmit: async values => {
      try {
        const { data } = await loginUser(values);
        setMessage({ type: 'success', content: data.message });
        router.push('/user/task');
      } catch (error) {
        setMessage({ type: 'error', content: error.data?.message || "Login failed" });
      }
    }
  });

  const handleGoogleLogin = () => {
    window.open(`http://localhost:8000/auth/google`, "_self");
  };

  return (
    <div className={`min-h-screen flex items-center justify-center border-red-800  rounded-sm space-y-4 ${isDarkMode ? 'text-white' : 'text-gray-900'} ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="w-full max-w-md mx-4 p-8 bg-white rounded-2xl shadow-xl">
        <div className="text-center space-y-2 mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Welcome Back</h2>
          <p className="text-gray-600">Sign in to continue to your account</p>
        </div>

        {message.content && (
          <div className={`mb-6 p-4 rounded-lg ${
            message.type === 'success' 
              ? 'bg-green-100 text-green-800' 
              : 'bg-red-100 text-red-800'
          }`}>
            {message.content}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              name="email"
              type="email"
              value={values.email}
              onChange={handleChange}
              className={`w-full px-4 py-3 border ${
                touched.email && errors.email ? 'border-red-500' : 'border-gray-300'
              } rounded-lg focus:ring-2 ${
                touched.email && errors.email ? 'focus:ring-red-500' : 'focus:ring-blue-500'
              } transition-all`}
              placeholder="your@email.com"
            />
            {touched.email && errors.email && (
              <p className="mt-2 text-sm text-red-600">{errors.email}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              name="password"
              type="password"
              value={values.password}
              onChange={handleChange}
              className={`w-full px-4 py-3 border ${
                touched.password && errors.password ? 'border-red-500' : 'border-gray-300'
              } rounded-lg focus:ring-2 ${
                touched.password && errors.password ? 'focus:ring-red-500' : 'focus:ring-blue-500'
              } transition-all`}
              placeholder="••••••••"
            />
            {touched.password && errors.password && (
              <p className="mt-2 text-sm text-red-600">{errors.password}</p>
            )}
          </div>

          <div className="flex items-center justify-between">
            <Link 
              href="/account/reset-password-link" 
              className="text-sm text-blue-600 hover:text-blue-700"
            >
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full py-3 px-6 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all"
          >
            Sign In
          </button>
        </form>

        <div className="mt-6">
          <button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-2 py-3 px-6 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-all"
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

        <p className="text-center text-sm text-gray-600 mt-6">
          Don't have an account?{" "}
          <Link href="/account/register" className="text-blue-600 hover:text-blue-700">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;