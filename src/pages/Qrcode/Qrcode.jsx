import React from 'react';
import './Qrcode.css';
import logo from '../../assets/kabb.png';  // โลโก้ของคุณ
import cenn from '../../assets/prompt.png';  // รูป QR Code ของคุณ
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Qrcode() {
    const location = useLocation();  // ใช้รับข้อมูลที่ส่งมาจากหน้าตะกร้า
    const navigate = useNavigate();

    // รับข้อมูล total ที่ส่งมาจากหน้าตะกร้า
    const { total } = location.state || { total: 0 };

    const handleCancel = () => {
        toast.error("Fail Payment");
        navigate('/cart');
    };

    const handleConfirm = () => {
        toast.success("Payment Success");
        navigate('/');
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
