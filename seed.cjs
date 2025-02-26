require('dotenv').config({ path: './env/.env' });
const { addCardItem } = require('./bititems.cjs');
const client = require("./client.cjs");
const { addUserCard } = require('./users.cjs');



const dropAllTables = async () => {
  try {
    const sqlCommand = `
      DROP TABLE IF EXISTS user_card_item;
      DROP TABLE IF EXISTS card_item;
      DROP TABLE IF EXISTS user_card;
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
      -- Creating the user_card table
      CREATE TABLE IF NOT EXISTS user_card (
        id SERIAL PRIMARY KEY,
        username VARCHAR(30) NOT NULL UNIQUE,
        password VARCHAR(60) NOT NULL
      );
    
     -- Creating the card_item table with name, description, and number columns
      CREATE TABLE IF NOT EXISTS card_item (
        id SERIAL PRIMARY KEY,
        name VARCHAR(30) NOT NULL,
        description VARCHAR(100) NOT NULL,
        number INT NOT NULL
      );

      -- Creating the user_card_item table (with foreign keys to user_card and card_item)
      CREATE TABLE IF NOT EXISTS user_card_item (
        id SERIAL PRIMARY KEY,
        comment VARCHAR(100),
        rate INT CHECK (rate >= 1 AND rate <= 10),
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

  } catch (error) {
    console.log('Error during the process.......❌', error);
  } finally {
    await client.end();
    console.log('Disconnected.......❌');
  }
};

seedAsync();
