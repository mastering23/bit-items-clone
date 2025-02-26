import { useState } from 'react';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      setMessage(response.ok ? 'Registration successful' : data.message || 'Registration failed');
    } catch (error) {
      setMessage(`Error occurred: ${error.message}`);
    }
  };

  return (
    <div className="p-4">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input 
          className="border p-2 mb-2 block" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
          placeholder="Username" 
        />
        <input 
          className="border p-2 mb-2 block" 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          placeholder="Password" 
        />
        <button className="bg-blue-500 text-white p-2" type="submit">Register</button>
      </form>
      <p>{message}</p>
    </div>
  );
}

export default Register;
