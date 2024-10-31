const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const schemas = require('./swagger/schemas');
const app = express();

// Middlewares
app.use(bodyParser.json());
app.use(cors());

// Import routes
const userRoutes = require('./routes/userRoutes');
const userActivitis = require('./routes/activityRoutes');
const userAuth = require('./routes/auth');


const swaggerOptions = {
   swaggerDefinition: {
       openapi: '3.0.0',
       info: {
           title: 'API Documentation',
           version: '1.0.0',
           description: 'Documentación de la API RESTful',
       },
       servers: [
           {
               url: 'http://localhost:5000',
           },
       ],
       components: {
           schemas: {
            ...schemas
           },
       },
   },
   apis: ['./routes/*.js'],
};


const swaggerDocs = swaggerJsDoc(swaggerOptions);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use('/api/aunth', userAuth);
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
