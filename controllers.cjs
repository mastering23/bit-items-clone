const client = require("./client.cjs");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt'); 
const saltRounds = 10;

require('dotenv').config({ path: './env/.env' });

// Sample user registration
const register = async (req, res) => {

  const { username, password } = req.body;

  try {
    
    const result = await client.query(
      "SELECT * FROM user_card WHERE username = $1",
      [username]
    );

    const hashedPassword = await bcrypt.hash(password, saltRounds); 

    if (result.rows.length != 0) {
      res.status(400).send("Unable to register username. reason: already exist");
      return;
    }

    const registerResponse = await client.query(
      "INSERT INTO user_card (username, password) VALUES ($1, $2)",
      [username, hashedPassword]
    );

    res.send(registerResponse);



  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ message: "Server error" });
  }
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

const getItems = async (req, res) => {
  try {
    const result = await client.query("SELECT * FROM card_item");

    res.send(result.rows)
    
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const getItemById = async (req, res) => {
  const id = req.params.itemId;
  try {
    const result = await client.query("SELECT * FROM card_item where id = $1", [id]);

    res.send(result.rows)
    
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get reviews for a specific item
const getItemReviews = async (req, res) => {
  const itemId = req.params.itemId;
  try {
    const result = await client.query(
      "SELECT * FROM user_card_item WHERE item_id = $1",
      [itemId]
    );
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching reviews for item:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Post a review for a specific item (only for authenticated users)
const postReview = async (req, res) => {
  const { comment, rate } = req.body;
  const itemId = req.params.itemId;
  const userId = req.user.id; // assuming req.user is populated by the token-authenticator middleware

  try {
    const result = await client.query(
      "INSERT INTO user_card_item (comment, rate, user_id, item_id) VALUES ($1, $2, $3, $4) RETURNING *",
      [comment, rate, userId, itemId]
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error posting review:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get reviews made by the authenticated user
const getMyReviews = async (req, res) => {
  const userId = req.user.id;
  try {
    const result = await client.query(
      "SELECT * FROM user_card_item WHERE user_id = $1",
      [userId]
    );
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching user reviews:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete a review by review ID (only for authenticated users)
const deleteReview = async (req, res) => {
  const reviewId = req.params.reviewId;
  const userId = req.user.id;

  try {
    const result = await client.query(
      "DELETE FROM user_card_item WHERE id = $1 AND user_id = $2 RETURNING *",
      [reviewId, userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Review not found or unauthorized" });
    }

    res.json({ message: "Review deleted successfully" });
  } catch (error) {
    console.error("Error deleting review:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Implement other controllers similarly for items, reviews
// Example for fetching items, reviews, posting a review, etc.

module.exports = {
  register,
  login,
  getMe,
  getItems,
  getItemById,
  getItemReviews,
  postReview,
  getMyReviews,
  deleteReview,
};
