import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [registrationError, setRegistrationError] = useState('');
  const [successMessage, setSuccessMessage] = useState(''); // New state for success message
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setRegistrationError('');
    setSuccessMessage(''); // clear previous success msg
    setLoading(true);

    if (!name.trim()) {
      setRegistrationError('Name is required.');
      setLoading(false);
      return;
    }
    if (name.trim().length < 2) {
      setRegistrationError('Name must be at least 2 characters long.');
      setLoading(false);
      return;
    }
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      setRegistrationError('Please enter a valid email address.');
      setLoading(false);
      return;
    }
    if (password.length < 6) {
      setRegistrationError('Password must be at least 6 characters long.');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        let errorMsg = data.message || 'Registration failed.';
        if (data.errors && Array.isArray(data.errors)) {
          const backendErrors = data.errors.map(err => err.msg).join(', ');
          errorMsg += ` Details: ${backendErrors}`;
        } else if (data.error) {
          errorMsg += ` Server Error: ${data.error}`;
        }
        setRegistrationError(errorMsg);
      } else {
        console.log('Registration successful!', data);
        setSuccessMessage('Registration successful! Redirecting to login...');
        setName('');
        setEmail('');
        setPassword('');
        // Redirect after 3 seconds
        setTimeout(() => {
          setSuccessMessage('');
          navigate('/login'); // adjust if your login route is different
        }, 3000);
      }
    } catch (error) {
      console.error('Error during registration:', error);
      setRegistrationError('Failed to connect to the server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Register</h2>
      {successMessage && <p style={styles.success}>{successMessage}</p>}
      {registrationError && <p style={styles.error}>{registrationError}</p>}
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.inputGroup}>
          <label htmlFor="name" style={styles.label}>Name</label>
          <input
            type="text"
            id="name"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.inputGroup}>
          <label htmlFor="email" style={styles.label}>Email</label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.inputGroup}>
          <label htmlFor="password" style={styles.label}>Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={styles.input}
          />
        </div>
        <button type="submit" disabled={loading} style={styles.button}>
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '80vh',
    padding: '20px',
    borderRadius: '8px',
    backgroundColor: '#f7f7f7',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    maxWidth: '400px',
    margin: '20px auto',
  },
  heading: {
    fontSize: '2em',
    marginBottom: '20px',
    color: '#333',
  },
  form: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  inputGroup: {
    marginBottom: '15px',
    width: '100%',
  },
  label: {
    display: 'block',
    marginBottom: '5px',
    fontWeight: 'bold',
    color: '#555',
  },
  input: {
    width: 'calc(100% - 12px)',
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    fontSize: '1em',
  },
  button: {
    backgroundColor: '#007bff',
    color: 'white',
    padding: '10px 15px',
    borderRadius: '4px',
    border: 'none',
    fontSize: '1.1em',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  error: {
    color: 'red',
    marginBottom: '10px',
    fontWeight: 'bold',
  },
  success: {
    color: 'green',
    marginBottom: '10px',
    fontWeight: 'bold',
  },
};

export default Signup;
