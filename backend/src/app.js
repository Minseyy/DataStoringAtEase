import 'dotenv/config';

// Uses Express and Node.js 

import express from 'express';
import cors from 'cors';
/**
cors: browser security mechanism that allows a web application running at one domain (origin) to access restricted resources from a different domain
*/

const app = express(); // Create an Express application

// Enable CORS and Express for all routes
app.use(cors());
app.use(express.json());

//Base routes
app.get('/', (req, res) => {
    res.send('Welcome to the API');
});



app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

export default app;