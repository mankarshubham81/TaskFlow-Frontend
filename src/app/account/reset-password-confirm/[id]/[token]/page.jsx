"use client";
import { useFormik } from 'formik';
import { resetPasswordSchema } from '@/validation/schemas';
import { useResetPasswordMutation } from '@/lib/services/auth';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';

const ResetPasswordConfirm = () => {
  const router = useRouter();
  const { id, token } = useParams();
  const [message, setMessage] = useState({ type: '', content: '' });
  const [resetPassword] = useResetPasswordMutation();

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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="w-full max-w-md mx-4 p-8 bg-white rounded-2xl shadow-xl">
        <div className="text-center space-y-2 mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Reset Password</h2>
          <p className="text-gray-600">Enter your new password below</p>
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
              New Password
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

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Confirm Password
            </label>
            <input
              name="password_confirmation"
              type="password"
              value={values.password_confirmation}
              onChange={handleChange}
              className={`w-full px-4 py-3 border ${
                touched.password_confirmation && errors.password_confirmation 
                  ? 'border-red-500' 
                  : 'border-gray-300'
              } rounded-lg focus:ring-2 ${
                touched.password_confirmation && errors.password_confirmation 
                  ? 'focus:ring-red-500' 
                  : 'focus:ring-blue-500'
              } transition-all`}
              placeholder="••••••••"
            />
            {touched.password_confirmation && errors.password_confirmation && (
              <p className="mt-2 text-sm text-red-600">{errors.password_confirmation}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-3 px-6 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordConfirm;