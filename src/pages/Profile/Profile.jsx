import React, { useState, useEffect } from 'react';
import { auth, db, updateProfile } from '../../firebase'; // Import ฟังก์ชัน updateProfile
import { getDocs, collection, query, where } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { toast } from 'react-toastify';
import './Profile.css'; // Import ไฟล์ CSS ที่เราสร้าง

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false); // สถานะสำหรับการแก้ไขโปรไฟล์
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    gender: '',
    dateOfBirth: '',
    profilePicture: '',
    address: '', // เพิ่มที่อยู่
  });

  // ฟังก์ชันเพื่อดึงข้อมูลโปรไฟล์จาก Firestore
  const fetchProfile = async (uid) => {
    try {
      const q = query(collection(db, 'user'), where('uid', '==', uid));
      const querySnapshot = await getDocs(q);
      const user = querySnapshot.docs[0].data();
      setUserData(user);
      setFormData({
        name: user.name,
        email: user.email,
        phoneNumber: user.phoneNumber,
        gender: user.gender,
        dateOfBirth: user.dateOfBirth,
        profilePicture: user.profilePicture,
        address: user.address, // เพิ่มที่อยู่
      });
      setLoading(false);
    } catch (error) {
      console.error('Error fetching user data: ', error);
      toast.error('Failed to load user profile');
      setLoading(false);
    }
  };

  // ตรวจสอบสถานะการล็อกอิน
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchProfile(user.uid); // ดึงข้อมูลผู้ใช้หากมีการล็อกอิน
      } else {
        setUserData(null); // หากผู้ใช้ไม่ล็อกอิน ให้ตั้งค่า userData เป็น null
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleEditToggle = () => {
    setEditMode(!editMode); // เปิดหรือปิดโหมดแก้ไข
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    if (auth.currentUser) {
      try {
        await updateProfile(auth.currentUser.uid, formData); // อัปเดตโปรไฟล์ผู้ใช้
        setUserData(formData); // อัปเดตข้อมูลในหน้า
        setEditMode(false); // ปิดโหมดแก้ไข
      } catch (error) {
        console.error("Error saving profile: ", error);
      }
    }
  };

  if (loading) {
    return <div>Loading profile...</div>; // แสดงข้อความโหลดเมื่อดึงข้อมูลอยู่
  }

  if (!userData) {
    return <div>Please log in to view your profile.</div>; // แสดงข้อความหากไม่ได้ล็อกอิน
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h1>My Profile</h1>
        <p>Manage and protect your account</p>
      </div>
      <div className="profile-content">
        <div className="profile-info">
          <label>Username</label>
          <p>{auth.currentUser.displayName || 'N/A'}</p>

          <label>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
          />

          <label>Email</label>
          <p>{formData.email} <a href="#">Change</a></p>

          <label>Phone Number</label>
          <p>{formData.phoneNumber} <a href="#">Change</a></p>

          <label>Gender</label>
          <div>
            <label>
              <input
                type="radio"
                name="gender"
                value="Male"
                checked={formData.gender === 'Male'}
                onChange={handleChange}
              />
              Male
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="Female"
                checked={formData.gender === 'Female'}
                onChange={handleChange}
              />
              Female
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="Other"
                checked={formData.gender === 'Other'}
                onChange={handleChange}
              />
              Other
            </label>
          </div>

          <label>Date of birth</label>
          <p>{formData.dateOfBirth} <a href="#">Change</a></p>

          <label>Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Enter your address"
          />
        </div>

        <div className="profile-picture-section">
          <img
            src={formData.profilePicture || 'https://via.placeholder.com/150'}
            alt="Profile"
            className="profile-picture"
          />
          <button className="upload-button">Select Image</button>
          <p>File size: maximum 1 MB<br />File extension: .JPEG, .PNG</p>
        </div>
      </div>
      <button onClick={handleSave} className="saveButton">Save</button>
    </div>
  );
};

export default Profile;
