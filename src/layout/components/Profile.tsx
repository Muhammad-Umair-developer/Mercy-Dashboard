import React from 'react';
import images from '../../constants/images';

interface ProfileProps {
  img?: string;
}

const Profile: React.FC<ProfileProps> = () => {
  return (
    <div className="relative flex items-center gap-225">
      <div>
        <p className='font-bold text-2xl'>Welcome, Admin</p>
      </div>
      
      <div className="flex items-center gap-4">
        <img src={images.admin} className="w-14 h-14 rounded-full bg-gray-200" alt="Admin profile" />
      </div>
    </div>
  );
};

export default Profile;
