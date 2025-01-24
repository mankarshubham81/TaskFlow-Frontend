"use client";
import { useFormik } from 'formik';
import { resetPasswordSchema } from '@/validation/schemas';
import { useResetPasswordMutation } from '@/lib/services/auth';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { FiLock, FiCheckCircle, FiXCircle } from 'react-icons/fi';
import { motion } from 'framer-motion';

const ResetPasswordConfirm = () => {
  const router = useRouter();
  const { id, token } = useParams();
  const [message, setMessage] = useState({ type: '', content: '' });
  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const { values, errors, touched, handleChange, handleSubmit } = useFormik({
    initialValues: { password: "", password_confirmation: "" },
    validationSchema: resetPasswordSchema,
    onSubmit: async values => {
      try {
        const { data } = await resetPassword({ ...values, id, token }).unwrap();
        setMessage({ type: 'success', content: data.message });
        setTimeout(() => router.push('/account/login'), 2000);
      } catch (error) {
        setMessage({ type: 'error', content: error.data?.message || "Password reset failed" });
      }
    }
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-blue-100">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md mx-4 p-8 bg-white rounded-xl shadow-lg backdrop-blur-sm"
      >
        <div className="text-center space-y-3 mb-8">
          <div className="flex justify-center">
            <FiLock className="h-12 w-12 text-indigo-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800">Reset Password</h2>
          <p className="text-gray-500">Create a new secure password</p>
        </div>

        {message.content && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`mb-6 p-4 rounded-lg flex items-center space-x-3 ${
              message.type === 'success' 
                ? 'bg-emerald-50 text-emerald-800' 
                : 'bg-red-50 text-red-800'
            }`}
          >
            {message.type === 'success' ? (
              <FiCheckCircle className="flex-shrink-0 h-5 w-5" />
            ) : (
              <FiXCircle className="flex-shrink-0 h-5 w-5" />
            )}
            <span className="text-sm">{message.content}</span>
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              New Password
              <span className="text-red-500 ml-1">*</span>
            </label>
            <div className="relative">
              <input
                name="password"
                type="password"
                value={values.password}
                onChange={handleChange}
                className={`w-full px-4 py-3 border ${
                  touched.password && errors.password 
                    ? 'border-red-300 focus:border-red-500' 
                    : 'border-gray-200 focus:border-indigo-500'
                } rounded-lg focus:ring-1 focus:ring-opacity-50 transition-all pr-12`}
                placeholder="Minimum 8 characters"
                aria-describedby="passwordError"
              />
              <FiLock className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            {touched.password && errors.password && (
              <p id="passwordError" className="mt-2 text-sm text-red-600">{errors.password}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Confirm Password
              <span className="text-red-500 ml-1">*</span>
            </label>
            <div className="relative">
              <input
                name="password_confirmation"
                type="password"
                value={values.password_confirmation}
                onChange={handleChange}
                className={`w-full px-4 py-3 border ${
                  touched.password_confirmation && errors.password_confirmation 
                    ? 'border-red-300 focus:border-red-500' 
                    : 'border-gray-200 focus:border-indigo-500'
                } rounded-lg focus:ring-1 focus:ring-opacity-50 transition-all pr-12`}
                placeholder="Re-enter your password"
                aria-describedby="confirmPasswordError"
              />
              <FiLock className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            {touched.password_confirmation && errors.password_confirmation && (
              <p id="confirmPasswordError" className="mt-2 text-sm text-red-600">{errors.password_confirmation}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 px-6 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-all 
                     focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 
                     disabled:cursor-not-allowed flex justify-center items-center gap-2"
          >
            {isLoading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            ) : null}
            {isLoading ? 'Processing...' : 'Reset Password'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => router.push('/account/login')}
            className="text-indigo-600 hover:text-indigo-800 text-sm font-medium transition-colors"
          >
            ← Back to Login
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default ResetPasswordConfirm;