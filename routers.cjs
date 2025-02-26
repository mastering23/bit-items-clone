const express = require('express');
const router = express.Router();
const authenticateToken = require('./token-authenticator.cjs')

const { 
  register, 
  login, 
  getMe 
  // getItems, 
  // getItemById, 
  // getItemReviews, 
  // postReview, 
  // getMyReviews, 
  // deleteReview 
} = require('./controllers.cjs'); 


router.post('/api/auth/register', register);
router.post('/api/auth/login', login);
router.get('/api/auth/me', authenticateToken, getMe); 


// router.get('/api/items', getItems);
// router.get('/api/items/:itemId', getItemById);
// router.get('/api/items/:itemId/reviews', getItemReviews);


// router.post('/api/items/:itemId/reviews', authenticateToken, postReview); 
// router.get('/api/reviews/me', authenticateToken, getMyReviews); 
// router.delete('/api/reviews/:reviewId', authenticateToken, deleteReview); 

module.exports = router;
