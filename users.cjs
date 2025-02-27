const client = require("./client.cjs");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const addUserCard = async (username, password) => {
  try {

    const hashedPassword = await bcrypt.hash(password, saltRounds); 

    const sqlCommand = 
    `INSERT INTO user_card (username, password) VALUES ($1, $2)`;

    await client.query(sqlCommand, [username, hashedPassword]);

    console.log(`Adding user [ ${username} ]...........✅`);
    
    console.log(`
    Password: ${password} \n
    Hashed Password: ${hashedPassword}\n
    salt : ${saltRounds}
    `);
    
  } catch (error) {
    console.log("Something went wrong.......❌", error);
  }
};




module.exports = { addUserCard };
