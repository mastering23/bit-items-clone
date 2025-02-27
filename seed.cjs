require('dotenv').config({ path: './env/.env' });
const client = require("./client.cjs");
const { addReview } = require('./review.cjs');
const { addCardItem } = require('./bititems.cjs');
const { addUserCard } = require('./users.cjs');

const dropAllTables = async () => {
  try {
    const sqlCommand = `
      DROP TABLE IF EXISTS user_card_item CASCADE;
      DROP TABLE IF EXISTS card_item CASCADE;
      DROP TABLE IF EXISTS user_card CASCADE;
    `;
    await client.query(sqlCommand);
    console.log('All tables dropped.......✅');
  } catch (error) {
    console.log('Something went wrong while dropping the tables.......❌', error);
  }
};

const createTables = async () => {
  try {
    const sqlCommand = `
      CREATE TABLE IF NOT EXISTS user_card (
        id SERIAL PRIMARY KEY,
        username VARCHAR(30) NOT NULL UNIQUE,
        password VARCHAR(225) NOT NULL
      );

      CREATE TABLE IF NOT EXISTS card_item (
        id SERIAL PRIMARY KEY,
        name VARCHAR(30) NOT NULL,
        description VARCHAR(100) NOT NULL,
        number INT NOT NULL
      );

      CREATE TABLE IF NOT EXISTS user_card_item (
        id SERIAL PRIMARY KEY,
        comment TEXT,
        rate INT CHECK (rate BETWEEN 1 AND 10),
        user_id INT REFERENCES user_card(id) ON DELETE CASCADE,
        item_id INT REFERENCES card_item(id) ON DELETE CASCADE
      );
    `;
    await client.query(sqlCommand);
    console.log('Creating tables.......✅');
  } catch (error) {
    console.log('Something went wrong while creating the tables.......❌', error);
  }
};

const seedAsync = async () => {
  try {
    await client.connect();
    console.log('Connection up and running.......✅');    
    
    await dropAllTables();
    await createTables();

    await addUserCard('admin','admin');
    await addUserCard('randy20','cool20');
    await addUserCard('mikequest','ten10');
    await addUserCard('mariesmall','sweetlucky7');

    await addCardItem('Red Card', 'fire card', 2000);
    await addCardItem('Blue Card', 'water card', 1500);
    await addCardItem('Green Card', 'earth card', 1800);
    await addCardItem('Yellow Card', 'flash card', 2200);
    await addCardItem('Black Card', 'shadow card', 1900);
    await addCardItem('White Card', 'light card', 2500);

    await addReview('Great product!', 8, 1, 2); 
    await addReview('Great performance', 3, 1, 6);
    await addReview('Highly recommend this item.', 9, 2, 3);
    await addReview('Average quality but good value for money.', 6, 4, 1);
    await addReview('Would not purchase again.', 2, 3, 4);
    await addReview('Fast delivery and amazing service!', 10, 5, 2);
    await addReview('Product is okay, packaging could be better.', 5, 4, 7);
    await addReview('Item exceeded my expectations.', 9, 2, 9);
    await addReview('Not as described, poor quality.', 2, 6, 10);
    await addReview('Fantastic build quality, would buy again.', 8, 8, 5);

  } catch (error) {
    console.log('Error during the process.......❌', error);
  } finally {
    await client.end();
    console.log('Disconnected.......❌');
  }
};

seedAsync();
