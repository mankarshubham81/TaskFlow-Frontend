"use client";
import { useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { useCreateTaskMutation, useGetTasksQuery, useUpdateTaskStatusMutation, useDeleteTaskMutation } from '@/lib/services/tasks';
import TaskForm from '@/components/TaskForm';
import DeleteConfirmationModal from '@/components/DeleteConfirmationModal';

const columns = {
  pending: { title: 'Pending', color: 'bg-yellow-100' },
  completed: { title: 'Completed', color: 'bg-blue-100' },
  done: { title: 'Done', color: 'bg-green-100' }
};

export default function TaskPage() {
  const { data: response, isLoading, refetch } = useGetTasksQuery();
  const tasks = response?.data || []; // Fix data structure access
  const [createTask] = useCreateTaskMutation();
  const [updateStatus] = useUpdateTaskStatusMutation();
  const [deleteTask] = useDeleteTaskMutation();
  const [showDeleteModal, setShowDeleteModal] = useState(null);

  const handleDragEnd = async (result) => {
    if (!result.destination) return;
    
    const taskId = result.draggableId;
    const newStatus = result.destination.droppableId;
    
    try {
      await updateStatus({ taskId, status: newStatus }).unwrap();
      refetch();
    } catch (error) {
      console.error('Failed to update task status:', error);
    }
  };

  const handleDelete = async () => {
    if (!showDeleteModal) return;
    
    try {
      await deleteTask(showDeleteModal).unwrap();
      refetch();
    } catch (error) {
      console.error('Failed to delete task:', error);
    } finally {
      setShowDeleteModal(null);
    }
  };

  if (isLoading) return <div>Loading tasks...</div>;

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Task Management</h1>
        
        <TaskForm onCreate={createTask} onSuccess={refetch} />

        <DragDropContext onDragEnd={handleDragEnd}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            {Object.entries(columns).map(([columnId, { title, color }]) => (
              <Droppable key={columnId} droppableId={columnId}>
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className={`p-4 rounded-lg ${color}`}
                  >
                    <h2 className="text-xl font-semibold mb-4">{title}</h2>
                    
                    {tasks
                      .filter(task => task.status === columnId)
                      .map((task, index) => (
                        <Draggable key={task._id} draggableId={task._id} index={index}>
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className="bg-white p-4 rounded-lg shadow-sm mb-4"
                            >
                              <div className="flex justify-between items-start">
                                <div>
                                  <h3 className="font-medium">{task.title}</h3>
                                  {task.description && (
                                    <p className="text-gray-600 mt-2">{task.description}</p>
                                  )}
                                </div>
                                <button
                                  onClick={() => setShowDeleteModal(task._id)}
                                  className="text-red-500 hover:text-red-700"
                                >
                                  ✕
                                </button>
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                    {provided.placeholder}
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