"use client";
import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
  title: Yup.string().required('Title is required').max(100),
  description: Yup.string().max(500)
});

export default function TaskForm({ onCreate, onSuccess }) {
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
    <form onSubmit={formik.handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Title</label>
        <input
          name="title"
          value={formik.values.title}
          onChange={formik.handleChange}
          className="w-full p-2 border rounded-md"
        />
        {formik.touched.title && formik.errors.title && (
          <div className="text-red-500 text-sm">{formik.errors.title}</div>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Description</label>
        <textarea
          name="description"
          value={formik.values.description}
          onChange={formik.handleChange}
          className="w-full p-2 border rounded-md h-24"
        />
        {formik.touched.description && formik.errors.description && (
          <div className="text-red-500 text-sm">{formik.errors.description}</div>
        )}
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
      >
        Create Task
      </button>
    </form>
  );
}