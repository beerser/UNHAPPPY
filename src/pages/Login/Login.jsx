import React, { useState } from 'react';
import './Login.css';
import logo from '../../assets/photologin.png';
import { login, signup } from '../../firebase';

const Login = () => {
  const [signState, setSignState] = useState("Sign In");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // State to hold error messages

  const user_auth = async (event) => {
    event.preventDefault();
    setError(""); // Reset error message before each attempt

    try {
      if (signState === "Sign In") {
        await login(email, password);
      } else {
        await signup(name, email, password);
      }
    } catch (err) {
      setError(err.message); // Set error message on failure
    }
  };
  
  return (
    <div className='login'>
      <img src={logo} className='login-logo' alt="Logo" />
      <div className="login-form">
        <h1>{signState}</h1>
        <form>
          {signState === "Sign Up" && (
            <input 
              value={name} 
              onChange={(e) => setName(e.target.value)}
              type="text" 
              placeholder='Your name' 
              required
            />
          )}

          <input 
            value={email} 
            onChange={(e) => setEmail(e.target.value)}
            type="email" 
            placeholder='Your Email' 
            required
          />

          <input 
            value={password} 
            onChange={(e) => setPassword(e.target.value)}
            type="password" 
            placeholder='Password' 
            required
          />

          {error && <p className="error-message">{error}</p>} {/* Display error message */}

          <button onClick={user_auth} type='submit'>{signState}</button>

          <div className="form-help">
            <div className="remember">
              <input type="checkbox" />
              <label htmlFor="">Remember Me</label>
            </div>
            <p>Need Help?</p>
          </div>
        </form>
        <div className="form-switch">
          {signState === "Sign In" ? (
            <p>Don't you have an account? 
              <span onClick={() => setSignState("Sign Up")}> Sign Up</span>
            </p>
          ) : (
            <p>Already have an account? 
              <span onClick={() => setSignState("Sign In")}> Sign In</span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
