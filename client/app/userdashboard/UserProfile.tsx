import React from 'react';
import { FaMapMarkerAlt } from "react-icons/fa";
import { UserData } from '../types/types';

interface UserProfileProps {
  userData: UserData;
}

const UserProfile: React.FC<UserProfileProps> = ({ userData }) => {
  return (
    <div className="card user-profile">
      <div className="avatar">H</div>
      <div className="user-info">
        <h1>{userData.name}</h1>
        <p><FaMapMarkerAlt className="text-red-500" />{userData.location}</p>
      </div>
    </div>
  );
};

export default UserProfile;