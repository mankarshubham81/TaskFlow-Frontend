import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const tasksApi = createApi({
  reducerPath: 'tasksApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: 'http://localhost:8000/api/tasks/',
    credentials: 'include'
  }),
  tagTypes: ['Tasks'],
  endpoints: (builder) => ({
    getTasks: builder.query({
      query: () => '',
      providesTags: ['Tasks']
    }),
    createTask: builder.mutation({
      query: (task) => ({
        url: '',
        method: 'POST',
        body: task
      }),
      invalidatesTags: ['Tasks']
    }),
    updateTaskStatus: builder.mutation({
      query: ({ taskId, status }) => ({
        url: `${taskId}/status`,
        method: 'PATCH',
        body: { status }
      }),
      invalidatesTags: ['Tasks']
    }),
    deleteTask: builder.mutation({
      query: (taskId) => ({
        url: `${taskId}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Tasks']
    })
  })
});

export const { 
  useGetTasksQuery,
  useCreateTaskMutation,
  useUpdateTaskStatusMutation,
  useDeleteTaskMutation
} = tasksApi;