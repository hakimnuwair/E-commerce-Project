import React, { useState } from 'react';
import Modal from 'react-modal';
import "../styles/LoginMessage.css"; // Create this CSS file for styling

Modal.setAppElement('#root'); // Make sure to set the app element for accessibility

export default function LoginMessage({ isOpen = true, onRequestClose }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log('Email:', email, 'Password:', password);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="login-modal"
      overlayClassName="login-modal-overlay"
    >
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Login</button>
      </form>
      <button onClick={onRequestClose} className="btn btn-secondary">Close</button>
    </Modal>
  );
}
