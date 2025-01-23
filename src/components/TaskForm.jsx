"use client";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { motion } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';
import { FiPlus } from 'react-icons/fi';

const validationSchema = Yup.object({
  title: Yup.string().required('Title is required').max(100),
  description: Yup.string().max(500)
});

export default function TaskForm({ onCreate, onSuccess }) {
  const { isDarkMode } = useTheme();
  const formik = useFormik({
    initialValues: { title: '', description: '' },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        await onCreate(values).unwrap();
        resetForm();
        onSuccess();
      } catch (error) {
        console.error('Task creation failed:', error);
      }
    }
  });

  return (
    <motion.form 
      onSubmit={formik.handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`p-6 rounded-2xl shadow-xl ${
        isDarkMode 
          ? 'bg-gray-800 border border-gray-700' 
          : 'bg-white border border-gray-100'
      } transition-all duration-300`}
    >
      <div className="mb-6 space-y-1">
        <label className={`block text-sm font-medium ${
          isDarkMode ? 'text-gray-300' : 'text-gray-600'
        }`}>
          Title
        </label>
        <input
          name="title"
          value={formik.values.title}
          onChange={formik.handleChange}
          className={`w-full px-4 py-3 rounded-lg border transition-all ${
            isDarkMode 
              ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500' 
              : 'bg-gray-50 border-gray-200 text-gray-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500'
          } placeholder:text-gray-400`}
          placeholder="Enter task title"
        />
        {formik.touched.title && formik.errors.title && (
          <motion.div 
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-1 text-red-500 text-sm"
          >
            {formik.errors.title}
          </motion.div>
        )}
      </div>

      <div className="mb-6 space-y-1">
        <label className={`block text-sm font-medium ${
          isDarkMode ? 'text-gray-300' : 'text-gray-600'
        }`}>
          Description
        </label>
        <textarea
          name="description"
          value={formik.values.description}
          onChange={formik.handleChange}
          className={`w-full px-4 py-3 rounded-lg border transition-all h-32 ${
            isDarkMode 
              ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500' 
              : 'bg-gray-50 border-gray-200 text-gray-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500'
          } placeholder:text-gray-400`}
          placeholder="Add task description (optional)"
        />
        {formik.touched.description && formik.errors.description && (
          <motion.div 
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-1 text-red-500 text-sm"
          >
            {formik.errors.description}
          </motion.div>
        )}
      </div>

      <motion.button
        type="submit"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={`w-full py-3.5 px-6 rounded-xl font-medium flex items-center justify-center gap-2 transition-colors ${
          isDarkMode
            ? 'bg-blue-600 hover:bg-blue-700 text-white'
            : 'bg-blue-600 hover:bg-blue-700 text-white'
        }`}
      >
        <FiPlus className="w-5 h-5" />
        Create Task
      </motion.button>
    </motion.form>
  );
}