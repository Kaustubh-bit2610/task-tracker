import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Your login logic here
    alert(`Logging in with email: ${form.email}`);
  };

  return (
    <div
      style={{
        maxWidth: 400,
        margin: '50px auto',
        padding: 20,
        border: '1px solid #ccc',
        borderRadius: 8,
        boxShadow: '0 0 8px rgba(0,0,0,0.1)',
      }}
    >
      <h2 style={{ textAlign: 'center', marginBottom: 20 }}>Login</h2>

      <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
        <input
          name="email"
          type="email"
          placeholder="Email"
          onChange={handleChange}
          value={form.email}
          style={{
            width: '100%',
            padding: 10,
            marginBottom: 10,
            borderRadius: 4,
            border: '1px solid #ccc',
            fontSize: 16,
          }}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          value={form.password}
          style={{
            width: '100%',
            padding: 10,
            marginBottom: 20,
            borderRadius: 4,
            border: '1px solid #ccc',
            fontSize: 16,
          }}
          required
        />
        <button
          type="submit"
          style={{
            width: '100%',
            padding: 12,
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: 4,
            fontSize: 16,
            cursor: 'pointer',
          }}
          onFocus={(e) => e.target.style.outline = '2px solid #0056b3'}
          onBlur={(e) => e.target.style.outline = 'none'}
        >
          Login
        </button>
      </form>

      {/* Side-by-side buttons */}
      <div style={{ display: 'flex', gap: 10 }}>
        {/* Disabled Login button here just to match your layout */}
        <button
          disabled
          style={{
            flex: 1,
            padding: 12,
            backgroundColor: '#6c757d',
            color: 'white',
            border: 'none',
            borderRadius: 4,
            fontSize: 16,
          }}
        >
          Login
        </button>

        <button
          onClick={() => navigate('/register')}
          style={{
            flex: 1,
            padding: 12,
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: 4,
            fontSize: 16,
            cursor: 'pointer',
          }}
          onFocus={(e) => e.target.style.outline = '2px solid #1e7e34'}
          onBlur={(e) => e.target.style.outline = 'none'}
        >
          Signup
        </button>
      </div>
    </div>
  );
};

export default Login;
