const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middlewares
app.use(bodyParser.json());
app.use(cors());

// Import routes
const userRoutes = require('./routes/userRoutes');
const userActivitis = require('./routes/activityRoutes');
app.use('/api/users', userRoutes);
app.use('/api/activity', userActivitis);

// Connect to MongoDB  
mongoose.connect(process.env.MONGO_URI, {
   useNewUrlParser: true,
   useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.error('MongoDB connection error:', err));

// Server port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
   console.log(`Server running on port ${PORT}`);
});
