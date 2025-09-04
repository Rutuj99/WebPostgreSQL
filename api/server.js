const express = require('express');
const cors = require('cors');
// const bodyParser = require('body-parser');
require('dotenv').config();

// const todoRoutes = require('./routes/todoRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// Routes
// app.use('/api', todoRoutes);

// Health check
app.get('/', (req, res) => {
    res.json({ message: 'Todo API is running!' });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});