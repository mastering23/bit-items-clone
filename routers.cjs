const express = require('express');
const router = express.Router(); 

// Logout route
router.post('/api/auth/logout', (req, res) => {
  // Invalidate the token on the client side
  res.status(200).send("Logged out successfully");
});

const { authenticateToken } = require('./token-authenticator.cjs');

const { 
  register, 
  login, 
  getMe, 
  getItems, 
  getItemById, 
  getItemReviews, 
  postReview, 
  getMyReviews, 
  deleteReview 
} = require('./controllers.cjs'); 

router.post('/api/auth/register', register);
router.post('/api/auth/login', login);
router.get('/api/auth/me', authenticateToken, getMe); 

router.get('/api/items', getItems);
router.get('/api/items/:id', getItemById);
router.get('/api/items/:id/reviews', getItemReviews);

router.post('/api/items/:itemId/reviews', authenticateToken, postReview); 
router.get('/api/reviews/me', authenticateToken, getMyReviews); 
router.delete('/api/reviews/:reviewId', authenticateToken, deleteReview); 

module.exports = router;
