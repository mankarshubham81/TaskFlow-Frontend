"use client";
import { motion } from 'framer-motion';

export default function DeleteConfirmationModal({ isOpen, onClose, onConfirm, darkMode }) {
  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
    >
      <div className={`p-6 rounded-xl shadow-2xl max-w-sm w-full ${
        darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
      }`}>
        <h3 className="text-xl font-bold mb-4">Confirm Deletion</h3>
        <p className="mb-6">Are you sure you want to delete this task? This action cannot be undone.</p>
        
        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className={`px-4 py-2 rounded-lg ${
              darkMode 
                ? 'text-gray-300 hover:text-white' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Delete Task
          </button>
        </div>
      </div>
    </motion.div>
  );
}