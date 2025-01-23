"use client";

import { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import {
  useCreateTaskMutation,
  useGetTasksQuery,
  useUpdateTaskStatusMutation,
  useDeleteTaskMutation,
} from "@/lib/services/tasks";
import TaskForm from "@/components/TaskForm";
import DeleteConfirmationModal from "@/components/DeleteConfirmationModal";
import LoadingSpinner from "@/components/LoadingSpinner";
import AddTaskIcon from '@mui/icons-material/AddTask';

const columns = {
  pending: {
    title: "Pending",
    color: "bg-yellow-50 dark:bg-yellow-900",
    border: "border-yellow-300 dark:border-yellow-600",
  },
  completed: {
    title: "Completed",
    color: "bg-blue-50 dark:bg-blue-900",
    border: "border-blue-300 dark:border-blue-600",
  },
  done: {
    title: "Done",
    color: "bg-green-50 dark:bg-green-900",
    border: "border-green-300 dark:border-green-600",
  },
};

export default function TaskPage() {
  const { data: response, isLoading, isError, refetch } = useGetTasksQuery();
  const [localTasks, setLocalTasks] = useState([]);
  const [createTask] = useCreateTaskMutation();
  const [updateStatus] = useUpdateTaskStatusMutation();
  const [deleteTask] = useDeleteTaskMutation();
  const [showDeleteModal, setShowDeleteModal] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [showTaskForm, setShowTaskForm] = useState(false);

  useEffect(() => {
    if (response?.data) {
      setLocalTasks(response.data);
    }
  }, [response?.data]);

  const getTasksByColumn = (status) => 
    localTasks.filter((task) => task.status === status);

  const handleDragEnd = async (result) => {
    const { source, destination, draggableId } = result;
    const validColumns = Object.keys(columns);

    if (!destination || !validColumns.includes(destination.droppableId)) {
      setErrorMessage("Tasks can only be moved to Pending, Completed, or Done columns");
      return;
    }

    if (source.droppableId === destination.droppableId) {
      setErrorMessage("Task is already in the same column.");
      return;
    }

    const taskId = draggableId;
    const newStatus = destination.droppableId;

    const originalTasks = localTasks;
    const updatedTasks = originalTasks.map(task => 
      task._id === taskId ? { ...task, status: newStatus } : task
    );
    setLocalTasks(updatedTasks);

    try {
      await updateStatus({ taskId, status: newStatus }).unwrap();
      await refetch();
      setErrorMessage("");
    } catch (error) {
      console.error("Failed to update task status:", error);
      setErrorMessage("Failed to update task status. Please try again.");
      setLocalTasks(originalTasks);
    }
  };

  const handleDelete = async () => {
    if (!showDeleteModal) return;

    try {
      await deleteTask(showDeleteModal).unwrap();
      await refetch();
    } catch (error) {
      console.error("Failed to delete task:", error);
      setErrorMessage("Failed to delete task. Please try again.");
    } finally {
      setShowDeleteModal(null);
    }
  };

  const handleTaskFormSuccess = () => {
    setShowTaskForm(false);
    refetch();
  };

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <div>Error loading tasks. Please try again later.</div>;

  return (
    <div className="min-h-screen p-8 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200">
            Task Management
          </h1>
          <button
            onClick={() => setShowTaskForm(!showTaskForm)}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <AddTaskIcon className="w-5 h-5" />
            {showTaskForm ? "Close Form" : "New Task"}
          </button>
        </div>

        {errorMessage && (
          <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            {errorMessage}
          </div>
        )}

        {showTaskForm && (
          <div className="mb-8 animate-slideDown">
            <TaskForm 
              onCreate={createTask} 
              onSuccess={handleTaskFormSuccess}
              onCancel={() => setShowTaskForm(false)}
            />
          </div>
        )}

        <DragDropContext onDragEnd={handleDragEnd}>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-8">
            {Object.entries(columns).map(([columnId, { title, color, border }]) => (
              <Droppable key={columnId} droppableId={columnId}>
                {(provided, snapshot) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className={`p-6 rounded-lg shadow-lg ${color} ${border} border transition-all duration-300 ${
                      snapshot.isDraggingOver
                        ? "scale-105 border-2 border-dashed border-gray-400 dark:border-gray-600"
                        : ""
                    }`}
                  >
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                      {title}{" "}
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        ({getTasksByColumn(columnId).length})
                      </span>
                    </h2>

                    <div className="space-y-4">
                      {getTasksByColumn(columnId).map((task, index) => (
                        <Draggable key={task._id} draggableId={task._id} index={index}>
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className={`group relative ${
                                snapshot.isDragging ? "opacity-90 scale-95" : "opacity-100"
                              } transition-transform duration-300`}
                              style={{
                                ...provided.draggableProps.style,
                                transform: snapshot.isDragging
                                  ? `${provided.draggableProps.style.transform} rotate(2deg)`
                                  : provided.draggableProps.style.transform,
                              }}
                            >
                              <div
                                className={`bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ${
                                  snapshot.isDragging
                                    ? "shadow-xl dark:shadow-gray-900/50 border-2 border-dashed border-gray-300"
                                    : "border border-transparent"
                                }`}
                              >
                                <div className="flex justify-between items-center">
                                  <div className="flex-1">
                                    <h3 className="font-medium text-gray-900 dark:text-gray-100">
                                      {task.title}
                                    </h3>
                                    {task.description && (
                                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-2 break-words">
                                        {task.description}
                                      </p>
                                    )}
                                  </div>
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setShowDeleteModal(task._id);
                                    }}
                                    className="text-red-500 hover:text-red-700 transition-colors"
                                    aria-label="Delete task"
                                  >
                                    ✕
                                  </button>
                                </div>
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  </div>
                )}
              </Droppable>
            ))}
          </div>
        </DragDropContext>

        <DeleteConfirmationModal
          isOpen={!!showDeleteModal}
          onClose={() => setShowDeleteModal(null)}
          onConfirm={handleDelete}
        />
      </div>
    </div>
  );
}