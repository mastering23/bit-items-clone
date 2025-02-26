const client = require('./client.cjs');
const addReview = async (description, number) => {
  try {
  
    const sqlCommand = `
      INSERT INTO user_card_item (description, number)
      VALUES ($1, $2)
      RETURNING *;
    `;

    const result = await client.query(sqlCommand, [description, number]);

    console.log('user card item added: ', result.rows[0]);

  } catch (error) {
    console.log('Error adding user card item: ', error);
  }
};

module.exports = { addReview };
