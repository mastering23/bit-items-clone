import { useState, useEffect } from 'react';

function MyReviews() {
  const [reviews, setReviews] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchReviews = async () => {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/reviews/me', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (response.ok) {
        setReviews(data);
      } else {
        setMessage('Failed to fetch reviews');
      }
    };
    fetchReviews();
  }, []);

  return (
    <div className="p-4">
    <h2>My Reviews</h2>
    {message && <p>{message}</p>}
    <ul>
      {reviews.length > 0 ? (
        reviews.map(review => (
          <li key={review.id}>
            {review.comment} - Rate: {review.rate}
          </li>
          
        ))
    
      ) : (
        <p>No reviews found</p>
      )}
    </ul>
  </div>
  );
}

export default MyReviews;
