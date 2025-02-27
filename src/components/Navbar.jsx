import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

function Navbar() {
  const [username, setUsername] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Assuming the username is stored in localStorage or can be derived from the token
      setUsername(localStorage.getItem('username') || 'User');
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setUsername('');
  };

  return (
    <nav className="p-4 bg-gray-200">
      <ul className="flex space-x-4">
        <li><Link to="/">Home</Link></li>
        {!username && <li><Link to="/register">Register</Link></li>}
        {!username && <li><Link to="/login">Login</Link></li>}
        {username && <li><span>Welcome, {username}</span></li>}
        {username && <li><button onClick={handleLogout}>Log Out</button></li>}
        <li><Link to="/items">Items</Link></li>
        <li><Link to="/reviews">My Reviews</Link></li>
      </ul>
    </nav>
  );
}


export default Navbar;
