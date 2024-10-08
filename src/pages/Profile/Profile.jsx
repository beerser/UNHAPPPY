import React, { useState, useEffect } from 'react'; 
import { db } from '../../firebase'; // ตรวจสอบให้แน่ใจว่าเส้นทางนี้ถูกต้อง
import { doc, setDoc, getDoc } from "firebase/firestore";
import './Profile.css';
import { Navigate } from 'react-router-dom';

const Profile = () => {
  const [gender, setGender] = useState('Male');
  const [profilePic, setProfilePic] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  const userId = "YOUR_USER_ID"; // แทนที่ด้วย user ID ของผู้ใช้

  // ดึงข้อมูลผู้ใช้จาก Firestore
  useEffect(() => {
    const fetchUserProfile = async () => {
      const userDoc = await getDoc(doc(db, "users", userId));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        setName(userData.name);
        setEmail(userData.email);
        setPhone(userData.phone);
        setAddress(userData.address);
        setGender(userData.gender || 'Male');
        setProfilePic(userData.profilePic || null);
      } else {
        console.log("No such user!");
      }
    };

    fetchUserProfile();
  }, [userId]);

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  const handleProfilePicChange = (event) => {
    setProfilePic(URL.createObjectURL(event.target.files[0]));
  };

  const handleSave = async () => {
    try {
      const userRef = doc(db, "users", userId);
      await setDoc(userRef, {
        name,
        email,
        phone,
        address,
        gender,
        profilePic
      }, { merge: true }); // ใช้ merge เพื่อไม่ให้ลบข้อมูลที่มีอยู่
      alert('Profile Saved!');
      
    } catch (error) {
      console.error("Error saving profile:", error);
      alert('Error saving profile.');
    }
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
