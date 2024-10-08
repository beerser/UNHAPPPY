import React from 'react';
import './Qrcode.css';
import logo from '../../assets/kabb.png';  // โลโก้ของคุณ
import cenn from '../../assets/prompt.png';  // รูป QR Code ของคุณ
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { addDoc, collection } from 'firebase/firestore'; // เพิ่มสำหรับ Firestore
import { db } from '../../firebase'; // ดึง db จาก Firebase config

function Qrcode() {
    const location = useLocation();
    const navigate = useNavigate();

    const { total } = location.state || { total: 0 };
    const cart = JSON.parse(localStorage.getItem('cart')) || []; // ดึงรายการสินค้า

    const handleCancel = () => {
        toast.error("Fail Payment");
        navigate('/cart');
    };

    const handleConfirm = async () => {
        try {
            // เก็บข้อมูลใบเสร็จใน Firestore
            await addDoc(collection(db, 'receipts'), {
                cart: cart,
                total: total,
                timestamp: new Date(),
            });
            toast.success("Payment Success");
            navigate('/ship'); // เปลี่ยนหน้าไปที่ Ship.jsx
        } catch (error) {
            console.error("Error storing receipt:", error);
            toast.error("Failed to store receipt.");
        }
    };

    return (
        <div className="qrcode">
            <div className="bgg">
                <nav>
                    <img src={logo} alt="Logo" />
                </nav>
                <h2>Scan QR Code</h2>
                <div className="cen">
                    <img src={cenn} alt="QR Code" />
                </div>
                <div className="total">
                    <span>Total (Tax incl.)</span>
                    <span>{total} ฿</span> 
                </div>
                <div className="but">
                    <button className="butt" onClick={handleCancel}>Cancel</button>
                    <button className="button" onClick={handleConfirm}>Confirm</button>
                </div>
            </div>
        </div>
    );
}

export default Qrcode;
