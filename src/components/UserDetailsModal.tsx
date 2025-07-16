import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { useUsers } from '../context/UserContext';
import images from '../constants/images';
import EditUserModal from './EditUserModal';

interface UserDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId: number;
}

const UserDetailsModal: React.FC<UserDetailsModalProps> = ({ isOpen, onClose, userId }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  
  // Get the user context to fetch the original user data
  const { users: contextUsers, updateUser } = useUsers();
  
  // Find the corresponding user in context by matching numeric IDs
  const contextUser = contextUsers.find(user => {
    const numericId = parseInt(user.id.split('').filter(char => !isNaN(parseInt(char))).join(''));
    return numericId === userId;
  });

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200 bg-gray-50">
          <h2 className="text-xl font-semibold text-gray-800">User Details</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
            aria-label="Close"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {contextUser ? (
            <div className="flex flex-col md:flex-row gap-6">
              {/* User Image */}
              <div className="flex flex-col items-center">
                <div className="relative mb-4">
                  <img
                    src={contextUser.profileImage || images.adewale}
                    alt={contextUser.username}
                    className="w-32 h-32 rounded-full object-cover border-4 border-[#992C55]"
                  />
                  <div className={`absolute bottom-2 right-2 w-4 h-4 rounded-full border-2 border-white ${contextUser.isOnline ? 'bg-green-500' : 'bg-red-500'}`}></div>
                </div>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
                  {contextUser.isOnline ? 'Online' : 'Offline'}
                </span>
              </div>

              {/* User Details */}
              <div className="flex-1">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium text-gray-500">Full Name</h3>
                    <p className="text-lg font-semibold">{contextUser.username}</p>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-sm font-medium text-gray-500">Email Address</h3>
                    <p className="text-lg">{contextUser.email}</p>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-sm font-medium text-gray-500">Phone Number</h3>
                    <p className="text-lg">{contextUser.phoneNumber}</p>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-sm font-medium text-gray-500">Date Registered</h3>
                    <p className="text-lg">{contextUser.dateRegistered}</p>
                  </div>
                </div>

                {/* Additional Information */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h3 className="text-lg font-semibold mb-4">Account Statistics</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-500">Orders Placed</p>
                      <p className="text-2xl font-bold">10</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-500">Last Activity</p>
                      <p className="text-md font-medium">Today, 2:30 PM</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">User details not found</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 p-6 border-t border-gray-200 bg-gray-50">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Close
          </button>
          {contextUser && (
            <button
              onClick={() => setIsEditModalOpen(true)}
              className="px-4 py-2 text-sm font-medium text-white bg-[#992C55] rounded-lg hover:bg-[#7d1f44] transition-colors"
            >
              Edit User
            </button>
          )}
        </div>
      </div>
    </div>,
    document.body
  );

  return (
    <>
      {contextUser && isEditModalOpen && (
        <EditUserModal
          isOpen={true}
          onClose={() => setIsEditModalOpen(false)}
          user={contextUser as any}
          onUpdateUser={updateUser}
        />
      )}
    </>
  );
};

export default UserDetailsModal;
