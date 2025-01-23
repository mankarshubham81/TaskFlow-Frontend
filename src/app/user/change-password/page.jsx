"use client";
import { useFormik } from 'formik';
import { changePasswordSchema } from '@/validation/schemas';
import { useChangePasswordMutation } from '@/lib/services/auth';
import { useState } from 'react';

const initialValues = {
  password: "",
  password_confirmation: ""
};

const ChangePassword = () => {
  const [serverMessage, setServerMessage] = useState({ type: '', content: '' });
  const [loading, setLoading] = useState(false);
  const [changePassword] = useChangePasswordMutation();
  
  const { values, errors, touched, handleChange, handleSubmit } = useFormik({
    initialValues,
    validationSchema: changePasswordSchema,
    onSubmit: async (values, { resetForm }) => {
      setLoading(true);
      try {
        const response = await changePassword(values);
        if (response.data?.status === "success") {
          setServerMessage({ type: 'success', content: response.data.message });
          resetForm();
        } else if (response.error) {
          setServerMessage({ type: 'error', content: response.error.data.message });
        }
      } catch (error) {
        setServerMessage({ type: 'error', content: 'An unexpected error occurred' });
      } finally {
        setLoading(false);
      }
    }
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="w-full max-w-md mx-4 p-8 bg-white rounded-2xl shadow-xl transition-all duration-300">
        <div className="text-center space-y-2 mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Change Password</h2>
          <p className="text-gray-600">Enter your new password below</p>
        </div>

        {serverMessage.content && (
          <div className={`mb-6 p-4 rounded-lg ${
            serverMessage.type === 'success' 
              ? 'bg-green-100 text-green-800' 
              : 'bg-red-100 text-red-800'
          }`}>
            {serverMessage.content}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              New Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={values.password}
              onChange={handleChange}
              className={`w-full px-4 py-3 border ${
                touched.password && errors.password ? 'border-red-500' : 'border-gray-300'
              } rounded-lg focus:ring-2 ${
                touched.password && errors.password ? 'focus:ring-red-500' : 'focus:ring-blue-500'
              } focus:border-transparent transition-all`}
              placeholder="••••••••"
            />
            {touched.password && errors.password && (
              <p className="mt-2 text-sm text-red-600">{errors.password}</p>
            )}
          </div>

          <div>
            <label htmlFor="password_confirmation" className="block text-sm font-medium text-gray-700 mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              id="password_confirmation"
              name="password_confirmation"
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
              } focus:border-transparent transition-all`}
              placeholder="••••••••"
            />
            {touched.password_confirmation && errors.password_confirmation && (
              <p className="mt-2 text-sm text-red-600">{errors.password_confirmation}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 px-6 text-white font-medium rounded-lg transition-all ${
              loading 
                ? 'bg-blue-400 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-700'
            } focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
          >
            {loading ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Processing...</span>
              </div>
            ) : (
              'Change Password'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;