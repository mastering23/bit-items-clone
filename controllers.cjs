const client = require("./client.cjs");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt'); 
const saltRounds = 10;

require('dotenv').config({ path: './env/.env' });

// User registration
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
    console.error("Error registering:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// User login
const login = async (req, res) => {
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
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      res.status(401).send("Invalid credentials");
      return;
    }

    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ token, username: user.username });

  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get authenticated user
const getMe = async (req, res) => {
  try {
    const userId = req.user.id; 
    const result = await client.query("SELECT id, username FROM user_card WHERE id = $1", [userId]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Get all items
const getItems = async (req, res) => {
  try {
    const result = await client.query("SELECT * FROM card_item");
    res.send(result.rows);
  } catch (error) {
    console.error("Error fetching items:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get item by ID
const getItemById = async (req, res) => {
  const id = req.params.itemId;
  try {
    const result = await client.query("SELECT * FROM card_item WHERE id = $1", [id]);
    res.send(result.rows);
  } catch (error) {
    console.error("Error fetching item:", error);
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

// Post a review for a specific item
const postReview = async (req, res) => {
  const { comment, rate } = req.body;
  const itemId = req.params.itemId;
  const userId = req.user.id;

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
  try {
    const userId = req.user.id;
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

// Delete a review by review ID
const deleteReview = async (req, res) => {
  const reviewId = req.params.reviewId;
  const userId = req.user.id;

  try {
    const result = await client.query(
      "DELETE FROM user_card_item WHERE id = $1 AND user_id = $2 RETURNING *",
      [reviewId, userId]
    );

    console.log('reviewId: ', reviewId);
    console.log('userId: ', userId);
    
    // console.log('result: ', result);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Review not found or unauthorized" });
    }

    res.json({ message: "Review deleted successfully" });
  } catch (error) {
    console.error("Error deleting review:", error);
    res.status(500).json({ message: "Server error" });
  }
};

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
