import React, { useState } from 'react';

function App() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [friendEmail, setFriendEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSignUp = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/signup", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        setMessage('Registration successful');
      } else {
        setMessage('Registration failed');
      }
    } catch (error) {
      console.error('Error registering user:', error);
      setMessage('Registration failed');
    }
  };

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/login", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        setLoggedIn(true);
        setMessage('Logged in successfully');
      } else {
        setMessage('Login failed');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      setMessage('Login failed');
    }
  };

  const handleFriendRequest = async () => {
    try {
      const response = await fetch('/api/friend-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ friendEmail }),
      });

      if (response.ok) {
        setMessage('Friend request sent successfully');
      } else {
        setMessage('Failed to send friend request');
      }
    } catch (error) {
      console.error('Error sending friend request:', error);
      setMessage('Failed to send friend request');
    }
  };

  return (
    <div>
      <h1>Groupomania</h1>
        <div>
          <h2>Sign Up</h2>
          <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleSignUp}>Sign Up</button>
        </div>
      {!loggedIn && (
        <div>
          <h2>Login</h2>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleLogin}>Login</button>
        </div>
      )}
      {loggedIn && (
        <div>
          <h2>Send Friend Request</h2>
          <input
            type="email"
            placeholder="Friend's Email"
            value={friendEmail}
            onChange={(e) => setFriendEmail(e.target.value)}
          />
          <button onClick={handleFriendRequest}>Send Request</button>
        </div>
      )}
      <p>{message}</p>
    </div>
  );
}

export default App;
