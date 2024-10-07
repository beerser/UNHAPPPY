import React, { useState } from 'react';
import './Profile.css';

const Profile = () => {
  const [gender, setGender] = useState('Male');
  const [profilePic, setProfilePic] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  const handleProfilePicChange = (event) => {
    setProfilePic(URL.createObjectURL(event.target.files[0]));
  };

  const handleSave = () => {
    alert('Profile Saved!');
  };

  return (
    <div className="profile-container">
      <h2>Profile</h2>
      <div className="profile-section">
        <div className="profile-image-section">
          <img
            src={profilePic || '/src/assets/Noprofile-icon.png'}
            alt="Profile"
            className="profile-pic"
          />  
          <input type="file" accept="image/*" onChange={handleProfilePicChange} />
        </div>

        <div className="profile-input-section">
          <div className="profile-input">
            <label>Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
            />
          </div>

          <div className="profile-input">
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </div>

          <div className="profile-input">
            <label>Phone:</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter your phone number"
            />
          </div>

          <div className="profile-input">
            <label>Gender:</label>
            <select value={gender} onChange={handleGenderChange}>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="profile-input">
            <label>Address:</label>
            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter your address"
            ></textarea>
          </div>

          <button className="save-button" onClick={handleSave}>Save</button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
