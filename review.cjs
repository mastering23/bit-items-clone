const client = require('./client.cjs');

const addReview = async (comment, rate, userId, itemId) => {
  try {
    const sqlCommand = `
      INSERT INTO cardView (comment, rate, user_id, item_id)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;

    const result = await client.query(sqlCommand, [comment, rate, userId, itemId]);

    console.log('Review added to cardView: ', result.rows[0]);

  } catch (error) {
    console.log('Error adding review to cardView: ', error);
  }
};



module.exports = { addReview };
