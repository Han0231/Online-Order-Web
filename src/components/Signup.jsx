import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth,provider, db } from '../firebaseConfig'; // Ensure Firestore is configured
import userIcon from "./imageFiles/userIcon.svg";
import lockIcon from "./imageFiles/lock.svg";
import google from "./imageFiles/google.png";
import './Signup.css';
import Navbar from './Navbar';
import handleGoogleLogin from './authHelper/handleGoogleLogin';


function SignUp() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showProfileCompletion, setShowProfileCompletion] = useState(false);

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setErrorMsg('Passwords do not match.');
      return;
    }
    try {
      // Create user with Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Save additional user data to Firestore
      await setDoc(doc(db, 'users', user.uid), {
        firstName,
        lastName,
        phoneNumber,
        email,
      });

      setErrorMsg('');
      setSuccessMsg('Account created successfully!');
      setTimeout(() => {
        navigate('/'); // Redirect to login page after successful signup
      }, 2000);
    } catch (error) {
      switch (error.code) {
        case 'auth/email-already-in-use':
          setErrorMsg('Email is already in use.');
          break;
        case 'auth/invalid-email':
          setErrorMsg('Invalid email format.');
          break;
        case 'auth/weak-password':
          setErrorMsg('Password should be at least 6 characters.');
          break;
        default:
          setErrorMsg(error.message);
      }
    }
  };

  const handleGoogleLoginFunction = () => {
    handleGoogleLogin(
      auth,
      provider,
      db,
      setIsLoading,
      setShowProfileCompletion,
      setFirstName,
      setLastName,
      setPhoneNumber,
      navigate,
      setErrorMsg
    );
  };
  return (
    <>
      <Navbar />
      <div className="signup-page">
        <div className="signup-container">
          <h2 className="signup-title">Sign Up</h2>
          <form onSubmit={handleSignUp} className="signup-form">
            <div className="input-group">
              <label htmlFor="firstName" className="label">First Name:</label>
              <input
                type="text"
                id="firstName"
                className="input-field"
                placeholder="Enter your first name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="lastName" className="label">Last Name:</label>
              <input
                type="text"
                id="lastName"
                className="input-field"
                placeholder="Enter your last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="phoneNumber" className="label">Phone Number:</label>
              <input
                type="tel"
                id="phoneNumber"
                className="input-field"
                placeholder="Enter your phone number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <img src={userIcon} alt="User Icon" className="icon" />
              <label htmlFor="email" className="label">Email:</label>
              <input
                type="email"
                id="email"
                className="input-field"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <img src={lockIcon} alt="Lock Icon" className="icon" />
              <label htmlFor="password" className="label">Password:</label>
              <input
                type="password"
                id="password"
                className="input-field"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <img src={lockIcon} alt="Lock Icon" className="icon" />
              <label htmlFor="confirmPassword" className="label">Confirm Password:</label>
              <input
                type="password"
                id="confirmPassword"
                className="input-field"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="button2">Sign Up</button>
          </form>
          {errorMsg && <p className="error-message">{errorMsg}</p>}
          {successMsg && <p className="success-message">{successMsg}</p>}
          <div className="not-a-member">
            Already have an account? <Link to="/login">Login</Link>
          </div>
          <div className="social-login">
            <p>Or Sign Up Using</p>
            <div className="social-icons">
            <img 
                src={google} 
                alt="Google Icon" 
                onClick={handleGoogleLoginFunction}
                style={{ cursor: 'pointer' }}
              />
           
            </div>
            <footer className="footer">
              <p>© 2023 Fuji Ichybun Restaurant</p>
              <p><Link to="/privacy">Privacy Policy</Link> | <Link to="/terms">Terms & Conditions</Link></p>
            </footer>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignUp;