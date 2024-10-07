// src/AdminPage.jsx
import React, { useEffect, useState } from "react";
import { auth, db } from "../../firebase"; 
import { useNavigate } from "react-router-dom"; 
import { Bar } from "react-chartjs-2"; 
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import './AdminPage.css'; // นำเข้า CSS สำหรับการจัดแต่ง

// ลงทะเบียน Chart.js สำหรับการใช้งาน
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const AdminPage = () => {
  const [userRole, setUserRole] = useState(null);
  const [products, setProducts] = useState([]);
  const [productDetails, setProductDetails] = useState({
    cpu: "",
    image: "",
    nameProduct: "",
    price: 0,
    product_id: "",
    ram: "",
    rom: "",
    camera: "",
    battery: "",
    stock: 0,
  });
  const [salesData, setSalesData] = useState([]);
  const navigate = useNavigate(); 

  useEffect(() => {
    const checkAdmin = async () => {
      const user = auth.currentUser; 

      if (user) {
        if (user.email === "win@gmail.com") {
          setUserRole("admin");
          fetchProducts(); 
          fetchSalesData(); 
        } else {
          navigate("/"); 
        }
      } else {
        navigate("/login"); 
      }
    };

    checkAdmin();
  }, [navigate]);

  const fetchProducts = async () => {
    const productsCollection = await db.collection("products").get();
    const productsList = productsCollection.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setProducts(productsList);
  };

  const fetchSalesData = async () => {
    const salesCollection = await db.collection("sales").get();
    const salesList = salesCollection.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setSalesData(salesList);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleAddProduct = async () => {
    try {
      await db.collection("products").add(productDetails);
      alert("Product added successfully!");
      fetchProducts(); 
    } catch (error) {
      console.error("Error adding product: ", error);
    }
  };

  const handleDeleteProduct = async (productId) => {
    try {
      await db.collection("products").doc(productId).delete();
      alert("Product deleted successfully!");
      fetchProducts(); 
    } catch (error) {
      console.error("Error deleting product: ", error);
    }
  };

  const chartData = {
    labels: salesData.map(sale => sale.date), 
    datasets: [
      {
        label: 'Sales',
        data: salesData.map(sale => sale.amount), 
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  if (userRole !== "admin") {
    return <div>Loading...</div>;
  }

  return (
    <div className="admin-page">
      <h1>Welcome to Admin Panel</h1>

      <div className="form-container">
        <h2>Add Product</h2>
        <div className="input-group">
          <input name="cpu" placeholder="CPU" onChange={handleInputChange} />
          <input name="image" placeholder="Image URL" onChange={handleInputChange} />
          <input name="nameProduct" placeholder="Product Name" onChange={handleInputChange} />
          <input name="price" type="number" placeholder="Price" onChange={handleInputChange} />
          <input name="product_id" placeholder="Product ID" onChange={handleInputChange} />
          <input name="ram" placeholder="RAM" onChange={handleInputChange} />
          <input name="rom" placeholder="ROM" onChange={handleInputChange} />
          <input name="camera" placeholder="Camera" onChange={handleInputChange} />
          <input name="battery" placeholder="Battery" onChange={handleInputChange} />
          <input name="stock" type="number" placeholder="Stock" onChange={handleInputChange} />
          <button className="add-product-button" onClick={handleAddProduct}>Add Product</button>
        </div>
      </div>

      <h2>Product List</h2>
      <ul>
        {products.map(product => (
          <li key={product.id}>
            {product.nameProduct} - {product.price} 
            <button className="delete-button" onClick={() => handleDeleteProduct(product.id)}>Delete</button>
          </li>
        ))}
      </ul>

      <h2>Sales Chart</h2>
      <Bar data={chartData} />
    </div>
  );
};

export default AdminPage;