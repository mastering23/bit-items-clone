# Career Simulation (Core) BIT STORE

My project is BIT STORE, a store where users can acquire electronic items called bitItems. Users can register and log in to access the site. Token and hashed password encryption will be implemented to complete the login and registration experience.
![alt text](img/image.png)
Plan

To implement this, I'll create three tables in a PostgreSQL database: users, reviews, and items. These tables will allow me to perform Create, Read, Update, and Delete (CRUD) operations on the data.

Backend Structure

I plan to have the following files in my backend:

- client.cjs: This file will establish the connection with the database. I'll use npm pg for communication and dotenv to keep environment details private.

- seed.cjs: This file will create tables by default and introduce fake data to test the database based on CRUD tasks. Additional features will be added during the development process.

- user.cjs: This file will contain functions to create users using SQL commands. Users will be authenticated based on a username and password, along with a primary key ID and name. Additional features will be added during the development process.

- bititems.cjs: This file will contain functions to create bitItems using SQL commands. BitItems will be based on name, details, and prices. Additional features will be added during the development process.

- server.cjs: This file will manage endpoint routes for GET, POST, PUT, DELETE, and find items using params. Additional features will be added during the development process.

Frontend

I'll integrate the backend with the frontend using React.

Deployment

The final project will be deployed using Render.


TESTING React Vite up and running
![alt text](img/image-2.png),


TESTING client.cjs up and running
![alt text](img/image-1.png)

