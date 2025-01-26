"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTheme } from '@/context/ThemeContext';

export default function TaskForm({
  onCreate,
  onUpdate,
  onSuccess,
  onCancel,
  initialData,
}) {
  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();
  const [error, setError] = useState("");
  const { isDarkMode } = useTheme();

  useEffect(() => {
    if (initialData) {
      setValue("title", initialData.title);
      setValue("description", initialData.description);
    } else {
      reset();
    }
  }, [initialData, setValue, reset]);

  const onSubmit = async (data) => {
    try {
      setError("");
      if (initialData) {
        if (!initialData._id) throw new Error("Invalid task ID");
        await onUpdate({ 
          taskId: initialData._id,
          ...data
        });
      } else {
        await onCreate(data);
      }
      onSuccess();
    } catch (err) {
      console.error("Form submission error:", err);
      setError(err.data?.message || err.message || "Failed to save task");
    }
  };

  return (
    <form 
      onSubmit={handleSubmit(onSubmit)} 
      className={`space-y-6 p-6 rounded-xl shadow-lg ${
        isDarkMode 
          ? 'bg-gray-800 border border-gray-700' 
          : 'bg-white border border-gray-200'
      }`}
    >
      {error && (
        <div className={`p-3 rounded-lg flex items-center gap-2 ${
          isDarkMode 
            ? 'bg-red-900/30 text-red-300 border border-red-800' 
            : 'bg-red-50 text-red-700 border border-red-200'
        }`}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
          {error}
        </div>
      )}
      
      <div className="space-y-2">
        <label className={`text-sm font-medium ${
          isDarkMode ? 'text-gray-300' : 'text-gray-700'
        }`}>
          Task Title
        </label>
        <input
          {...register("title", { 
            required: "Title is required",
            maxLength: {
              value: 100,
              message: "Title cannot exceed 100 characters"
            }
          })}
          placeholder="Enter task title"
          className={`w-full px-4 py-2 rounded-lg border ${
            errors.title 
              ? 'border-red-500 focus:ring-red-500' 
              : isDarkMode 
                ? 'border-gray-600 focus:border-blue-500 focus:ring-blue-500' 
                : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
          } ${
            isDarkMode 
              ? 'bg-gray-700 text-gray-100 placeholder-gray-400' 
              : 'bg-white text-gray-900 placeholder-gray-500'
          } focus:ring-1 focus:outline-none transition-all`}
        />
        {errors.title && (
          <span className="text-red-500 text-sm flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {errors.title.message}
          </span>
        )}
      </div>
      
      <div className="space-y-2">
        <label className={`text-sm font-medium ${
          isDarkMode ? 'text-gray-300' : 'text-gray-700'
        }`}>
          Description
        </label>
        <textarea
          {...register("description", {
            maxLength: {
              value: 500,
              message: "Description cannot exceed 500 characters"
            }
          })}
          placeholder="Enter task description"
          className={`w-full px-4 py-2 rounded-lg border ${
            errors.description 
              ? 'border-red-500 focus:ring-red-500' 
              : isDarkMode 
                ? 'border-gray-600 focus:border-blue-500 focus:ring-blue-500' 
                : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
          } ${
            isDarkMode 
              ? 'bg-gray-700 text-gray-100 placeholder-gray-400' 
              : 'bg-white text-gray-900 placeholder-gray-500'
          } focus:ring-1 focus:outline-none transition-all min-h-[100px]`}
          rows="3"
        />
        {errors.description && (
          <span className="text-red-500 text-sm flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {errors.description.message}
          </span>
        )}
      </div>
      
      <div className="flex gap-3 pt-4">
        <button
          type="submit"
          className={`px-5 py-2 rounded-lg font-medium transition-colors ${
            isDarkMode
              ? 'bg-blue-600 hover:bg-blue-700 text-white'
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
        >
          {initialData ? "Update Task" : "Create Task"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className={`px-5 py-2 rounded-lg font-medium transition-colors ${
            isDarkMode
              ? 'bg-gray-600 hover:bg-gray-700 text-gray-100'
              : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
          }`}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}