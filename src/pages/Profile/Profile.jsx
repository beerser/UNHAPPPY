import React from 'react'
import './Profile.css'

function Profile() {
  return (
    <div className="profile-container">
      <div className="profile-picture">
        <img src="path_to_profile_picture.jpg" alt="Profile" />
        <button className="upload-btn">Upload</button>
      </div>
      <div className="profile-details">
        <h1 className="username">Krijtat Sinrungtham</h1>
        <p className="user-info">krijtat@example.com | Bangkok, Thailand</p>
        <div className="action-buttons">
          <button className="edit-btn">Edit Profile</button>
          <button className="view-btn">View Full Profile</button>
        </div>
      </div>
    </div>
  );
};
export default Profile

