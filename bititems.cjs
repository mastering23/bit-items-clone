
const client = require('./client.cjs'); 

const addCardItem = async (name, description, number) => {
  try {
    
    const sqlCommand = `
      INSERT INTO card_item (name, description, number)
      VALUES ($1, $2, $3)
      RETURNING *;
    `;

    const result = 
    await client.query(sqlCommand, [name, description, number]); 

    console.log('Card item added: ', result.rows[0]);

  } catch (error) {
    console.log('Error adding card item: ', error);
  }
};

module.exports = { addCardItem };
