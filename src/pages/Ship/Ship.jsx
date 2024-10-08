import React, { useState, useEffect } from 'react';
import './Ship.css';
import { getReceipt } from '../../firebase'; // ดึงฟังก์ชัน getReceipt จาก Firebase config
import { useNavigate } from 'react-router-dom'; // สำหรับจัดการการนำทาง

function Ship() {
  const [order, setOrder] = useState({ total: 0, cart: [] });
  const navigate = useNavigate(); // ประกาศ useNavigate เพื่อใช้งานปุ่มย้อนกลับ

  useEffect(() => {
    const fetchReceipt = async () => {
      try {
        const receipt = await getReceipt();
        if (receipt) {
          setOrder(receipt); // ตั้งค่า order จาก receipt ที่ดึงมา
        } else {
          console.log("No receipt found");
        }
      } catch (error) {
        console.error("Error fetching receipt:", error);
      }
    };

    fetchReceipt();
  }, []);

  // ฟังก์ชันสำหรับล้างสินค้าจาก cart
  const clearCart = () => {
    localStorage.removeItem('cart'); // ลบข้อมูล cart จาก localStorage
  };

  // เมื่อผู้ใช้ออกจากหน้าใบเสร็จ (เปลี่ยนไปหน้าอื่น)
  useEffect(() => {
    return () => {
      clearCart(); // ล้างสินค้าจาก cart เมื่อออกจากหน้า
    };
  }, []);

  return (
    <div className='receipt-background'>
      <div className='receipt-container'>
        <div className='receipt-header'>
          <h2>ใบเสร็จ</h2>
        </div>

        <div className='receipt-details'>
          <p>วันที่: {new Date().toLocaleDateString()}</p>
          <p>เลขที่ใบเสร็จ: 00123</p>
        </div>

        <table className='receipt-table'>
          <thead>
            <tr>
              <th>ลำดับ</th>
              <th>รายการ</th>
              <th>จำนวน</th>
              <th>ราคาต่อหน่วย</th>
              <th>จำนวนเงิน</th>
            </tr>
          </thead>
          <tbody>
            {order.cart.length > 0 ? (
              order.cart.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.nameProduct}</td>
                  <td>1</td>
                  <td>{item.price} ฿</td>
                  <td>{item.price} ฿</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">ไม่มีรายการสินค้า</td>
              </tr>
            )}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan='4' className='text-right'>รวม</td>
              <td>{order.total} ฿</td>
            </tr>
          </tfoot>
        </table>

        <div className='receipt-footer'>
          <p>_________________________</p>
          <p>ผู้รับสินค้า</p>
        </div>

        {/* ปุ่มย้อนกลับ */}
        <div className='back-button-container'>
          <button className='back-button' onClick={() => navigate('/')}>
            ย้อนกลับหน้าหลัก
          </button>
        </div>
      </div>
    </div>
  );
}

export default Ship;
