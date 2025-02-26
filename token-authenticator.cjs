const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Extract token from Bearer <token>

  if (!token) return res.sendStatus(401); // No token, unauthorized

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403); // Invalid token, forbidden

    req.user = user; // Attach user object to request
    next(); // Continue to the next middleware or route handler
  });
}

module.exports = authenticateToken;
