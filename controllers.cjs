const client = require("./client.cjs");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt'); 
require('dotenv').config({ path: './env/.env' });

// Sample user registration
const register = async (req, res) => {
  // Logic to register user
  res.send("User registered!");
};

// Sample login
const login = async (req, res) => {
  // Logic to log in user and return JWT token

  const { username, password } = req.body;

  try {
    const result = await client.query(
      "SELECT * FROM user_card WHERE username = $1",
      [username]
    );

    if (result.rows.length == 0) {
      res.status(401).send("Invalid credentials");
      return;
    }

    const user = result.rows[0];
    console.log(user);

    const isValidPassword = await bcrypt.compare(password, user.password);

    if(!isValidPassword) {
      res.status(401).send("Invalid credentials");
      return;
    }

    const token = jwt.sign(
      { id: user.id, username: user.username }, // Payload (user info)
      process.env.JWT_SECRET, // Secret key
      { expiresIn: '1h' } // Token expires in 1 hour
    );

    // Step 4: Send the token as a response
    console.log(token);
    res.json({ token });

    // console.log('Query Result:', result);  


  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ message: "Server error" });
  }

  // res.send("User logged in!");
};

// Sample get authenticated user
const getMe = async (req, res) => {
  // Logic to get user info (protected route)
  res.send("Authenticated user data");
};

// Implement other controllers similarly for items, reviews
// Example for fetching items, reviews, posting a review, etc.

module.exports = {
  register,
  login,
  getMe
  // getItems,
  // getItemById,
  // getItemReviews,
  // postReview,
  // getMyReviews,
  // deleteReview,
};
