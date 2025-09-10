const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/student-drop')
	.then(() => console.log('MongoDB connected'))
	.catch((err) => console.error('MongoDB connection error:', err));

app.get('/', (req, res) => {
	res.send('Server is running');
});

app.listen(PORT, () => {
	console.log(`Server started on port ${PORT}`);
});
