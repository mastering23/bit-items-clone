import './Home.css'; // Assuming you have a CSS file for styles

import { useState, useEffect } from 'react'; 
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation


const Home = () => {
  const [username, setUsername] = useState(''); // State for username

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const navigate = useNavigate(); // Initialize useNavigate for navigation

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch('/api/items');
        if (!response.ok) {
          throw new Error('Failed to fetch items');
        }
        const data = await response.json();
        setItems(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    setUsername(''); // Clear the username on logout
    localStorage.removeItem('username'); // Clear username from localStorage

    navigate('/login'); // Redirect to login page after logout

  };

  return ( 
    <div className="home-container">
      <h1>Welcome to BitItem</h1>
      {username && <p>Status: Logged in as {username}</p>} {/* Display username */}
      <button onClick={handleLogout}>Logout</button> {/* Logout button */}
      <div className="item-list">
        {items.map(item => (
          <div key={item.id} className="item-card">
            <h2>{item.name}</h2>
            <p>{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
