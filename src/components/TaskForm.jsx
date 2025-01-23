"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

export default function TaskForm({
  onCreate,
  onUpdate,
  onSuccess,
  onCancel,
  initialData,
}) {
  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();
  const [error, setError] = useState("");

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
      setError(""); // Reset error state
      
      if (initialData) {
        // Verify we have a valid task ID
        if (!initialData._id) {
          throw new Error("Invalid task ID");
        }
        
        await onUpdate({ 
          taskId: initialData._id,
          title: data.title,
          description: data.description
        }).unwrap();
      } else {
        await onCreate({
          title: data.title,
          description: data.description
        }).unwrap();
      }
      onSuccess();
    } catch (err) {
      console.error("Form submission error:", err);
      setError(err.data?.message || err.message || "Failed to save task");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {error && (
        <div className="p-2 text-red-700 bg-red-100 rounded">
          {error}
        </div>
      )}
      
      <div>
        <input
          {...register("title", { 
            required: "Title is required",
            maxLength: {
              value: 100,
              message: "Title cannot exceed 100 characters"
            }
          })}
          placeholder="Task title"
          className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-700"
        />
        {errors.title && (
          <span className="text-red-500 text-sm">
            {errors.title.message}
          </span>
        )}
      </div>
      
      <div>
        <textarea
          {...register("description", {
            maxLength: {
              value: 500,
              message: "Description cannot exceed 500 characters"
            }
          })}
          placeholder="Task description"
          className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-700"
          rows="3"
        />
        {errors.description && (
          <span className="text-red-500 text-sm">
            {errors.description.message}
          </span>
        )}
      </div>
      
      <div className="flex gap-2">
        <button
          type="submit"
          className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 transition-colors"
        >
          {initialData ? "Update Task" : "Create Task"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-gray-700 bg-gray-200 rounded hover:bg-gray-300 dark:text-gray-200 dark:bg-gray-700 transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}