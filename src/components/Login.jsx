import { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate for navigation

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();  // Initialize useNavigate for redirection

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/api/auth/login', {  // Update with the correct URL
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setMessage(errorData.message || 'Login failed');
        return;
      }

      const data = await response.json();
      localStorage.setItem('token', data.token); // Save token for future use
      setMessage('Login successful');

      // Clear input fields after successful login
      setUsername('');
      setPassword('');

      // Redirect to the item list page with username
      navigate('/items', { state: { username } });
      
    } catch (error) {
      setMessage(`Error occurred: ${error.message}`);
    }
  };

  return (
    <div className="p-4">
      <h2>Login</h2>
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
        <button className="bg-blue-500 text-white p-2" type="submit">Login</button>
      </form>
      <p>{message}</p>
    </div>
  );
}

export default Login;
