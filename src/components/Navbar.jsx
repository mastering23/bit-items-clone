import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="p-4 bg-gray-200">
      <ul className="flex space-x-4">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/register">Register</Link></li>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/items">Items</Link></li>
        <li><Link to="/reviews">My Reviews</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
