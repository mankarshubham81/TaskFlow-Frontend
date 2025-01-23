"use client";
import { useGetUserQuery } from "@/lib/services/auth";
import { useTheme } from '@/context/ThemeContext';
import { motion } from 'framer-motion';
import { Skeleton } from "@mui/material";

const Profile = () => {
  const { isDarkMode } = useTheme();
  const { data, isLoading } = useGetUserQuery();
  const user = data?.user || {};

  return (
    <div className={`min-h-screen flex items-center justify-center transition-colors duration-300 ${
      isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`w-full max-w-md p-8 rounded-2xl shadow-xl transition-colors duration-300 ${
          isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
        }`}
      >
        <h2 className="text-3xl font-bold mb-8 text-center">Profile Overview</h2>
        
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-500">Full Name</label>
            {isLoading ? (
              <Skeleton variant="text" width="70%" height={32} />
            ) : (
              <p className="text-lg font-medium">{user.name}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-500">Email Address</label>
            {isLoading ? (
              <Skeleton variant="text" width="85%" height={32} />
            ) : (
              <p className="text-lg break-all">{user.email}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-500">Account Status</label>
            {isLoading ? (
              <Skeleton variant="text" width="40%" height={32} />
            ) : (
              <div className="flex items-center gap-2">
                <span className={`h-3 w-3 rounded-full ${
                  user.is_verified ? 'bg-green-500' : 'bg-yellow-500'
                }`}></span>
                <p className="text-lg">
                  {user.is_verified ? 'Verified' : 'Pending Verification'}
                </p>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Profile;