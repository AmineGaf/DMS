require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes/routes');
const URL = process.env.DATABASE_URL;
const jwt = require('jsonwebtoken');
const cors = require('cors');

mongoose.connect(URL);
const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error);
});

database.once('connected', () => {
    console.log('Data Base connected');
})

const app = express();
const corsOptions = {
    origin: 'http://localhost:5173', 
    optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));

// Authentication middleware
app.use((req, res, next) => {
    const token = req.headers.authorization;

    if (token) {
        // Remove "Bearer " prefix from the token
        const tokenWithoutBearer = token.replace('Bearer ', '');

        jwt.verify(tokenWithoutBearer, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                return res.status(403).json({ message: 'Invalid token' });
            }
            req.user = user;
            next();
        });
    } else {
        next();
    }
});


app.use('/api', routes);

app.listen(3000, () => {
    console.log(`Server Started at ${3000}`)
})