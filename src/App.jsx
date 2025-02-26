import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import Items from './components/Items';
import MyReviews from './components/MyReviews';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="container mx-auto">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/items" element={<Items />} />
        <Route path="/reviews" element={<MyReviews />} />
      </Routes>
    </div>
  );
}

export default App;
