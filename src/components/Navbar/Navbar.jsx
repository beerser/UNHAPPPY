import React, { useState } from 'react'; 
import './Navbar.css';
import logo from '../../assets/kabb.png';
import search_icon from '../../assets/search_icon.svg';
import cart_icon from '../../assets/cart.svg';
import profile_img from '../../assets/vector.png';
import caret_icon from '../../assets/caret_icon.svg';
import { logout, searchProducts } from '../../firebase'; 

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState(''); 
  const [products, setProducts] = useState([]);
  const [isSearching, setIsSearching] = useState(false); 

 
  const handleSearch = async (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    if (term.length > 0) {
      setIsSearching(true); 
      const result = await searchProducts(term.toLowerCase()); 
      setProducts(result); 
      setIsSearching(false); 
    } else {
      setProducts([]); 
    }
  };

  return (
    <div className='navbar'>
      <div className="navbar-left">
        <img src={logo} alt="Kabb logo" />
        <ul>
          <li><a href="/">iPhone</a></li>
          <li><a href="/samsung">Samsung</a></li>
          <li><a href="/xiaomi">Xiaomi</a></li>
          <li><a href="/collections">Collections</a></li>
        </ul>
      </div>
      <div className="navbar-right">
        <img src={search_icon} alt="Search icon" className='icons' />
        <div className="search-container">
          <input 
            className='inp' 
            type="text" 
            placeholder="Search" 
            value={searchTerm} 
            onChange={handleSearch} 
          />
          {products.length > 0 && (
            <div className="dropdown-results">
              <ul>
                {products.map(product => (
                  <li key={product.id}>
                    {product.nameProduct} - {product.price} ฿ 
                    {product.stock > 0 ? (
                      <span className='inoF'> In stock</span> 
                    ) : (
                      <span className='outoF'> Out of stock</span> 
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <a href="/cart"><img src={cart_icon} alt="Cart icon" className='iconss' /></a>
        <div className="navbar-profile">
          <img src={profile_img} alt="User profile image" className='profile'/>
          <img src={caret_icon} alt="Dropdown arrow icon" />
          <div className="dropdown">
            <a href="/profile" className='profile'><p>Profile</p></a>
            <p onClick={logout}>Sign Out</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
