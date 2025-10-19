// // index.js
// const express = require('express');
// const app = express();
// const PORT = process.env.PORT || 3000;

// // Middleware: parse JSON request bodies
// app.use(express.json());

// // In-memory data store (no DB)
// let users = [
//   { id: 1, name: "Abir", email: "abir@example.com" },
//   { id: 2, name: "Sonjoy", email: "sonjoy@example.com" }
// ];

// // ROOT endpoint
// app.get('/', (req, res) => {
//   res.send('Welcome to the Simple REST API!');
// });


// // ------------------ CRUD ENDPOINTS ------------------

// // 1️⃣ GET ALL USERS
// app.get('/api/users', (req, res) => {
//   res.status(200).json(users);
// });

// // 2️⃣ GET ONE USER BY ID
// app.get('/api/users/:id', (req, res) => {
//   const id = parseInt(req.params.id);
//   const user = users.find(u => u.id === id);
//   if (!user) {
//     return res.status(404).json({ message: 'User not found' });
//   }
//   res.json(user);
// });

// // 3️⃣ CREATE A NEW USER
// app.post('/api/users', (req, res) => {
//   const { name, email } = req.body;
//   if (!name || !email) {
//     return res.status(400).json({ message: 'Name and email are required' });
//   }
//   const newUser = {
//     id: users.length ? users[users.length - 1].id + 1 : 1,
//     name,
//     email
//   };
//   users.push(newUser);
//   res.status(201).json(newUser);
// });

// // 4️⃣ UPDATE A USER (PUT = full replace)
// app.put('/api/users/:id', (req, res) => {
//   const id = parseInt(req.params.id);
//   const { name, email } = req.body;
//   const index = users.findIndex(u => u.id === id);

//   if (index === -1) {
//     return res.status(404).json({ message: 'User not found' });
//   }

//   if (!name || !email) {
//     return res.status(400).json({ message: 'Name and email are required' });
//   }

//   users[index] = { id, name, email };
//   res.json(users[index]);
// });

// // 5️⃣ DELETE A USER
// app.delete('/api/users/:id', (req, res) => {
//   const id = parseInt(req.params.id);
//   const index = users.findIndex(u => u.id === id);

//   if (index === -1) {
//     return res.status(404).json({ message: 'User not found' });
//   }

//   const deletedUser = users.splice(index, 1);
//   res.json({ message: 'User deleted', deletedUser });
// });


// // ------------------ SERVER START ------------------
// app.listen(PORT, () => {
//   console.log(`✅ Server running at http://localhost:${PORT}`);
// });
// index.js
const express = require('express');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');
const errorHandler = require('./middleware/errorHandler');
const pool = require('./config/db');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Root
app.get('/', (req, res) => res.send('Welcome to the PostgreSQL REST API!'));

// Routes
app.use('/api/users', userRoutes);

// Error middleware
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
