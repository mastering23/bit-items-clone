require('dotenv').config({ path: './env/.env' });

const client = require("./client.cjs");

const createUserTable = async () => {
  try {
    const sqlCommand = `
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(30) NOT NULL UNIQUE,
        password VARCHAR(60) NOT NULL
      )
    `;
    await client.query(sqlCommand);
    console.log('Creating user table...........✅');
  } catch (error) {
    console.log('Something went wrong .......❌', error);
  }
};

const seedAsync = async () => {
  try {
    await client.connect();
    console.log('Connection up and running.......✅');

    await createUserTable();
    

  } catch (error) {
    console.log('Error during the process.......❌', error);
  } finally {
    await client.end();
    console.log('Disconnected.......❌');
  }
};

seedAsync();
