import 'dotenv/config';

// Uses Express and Node.js 

import express from 'express';
import cors from 'cors';
import googleRoutes from './routes/google.routes';
import authRoutes from './routes/auth.routes';
/**
cors: browser security mechanism that allows a web application running at one domain (origin) to access restricted resources from a different domain
*/

const app = express(); // Create an Express application
import { authMiddleware } from "./middleware/auth.middleware"

app.get("/api/test", authMiddleware, (req, res) => {
  res.json({ message: "You are authenticated"})
})
// Enable CORS and Express for all routes
app.use(cors());
app.use(express.json());
app.use("/api/google", googleRoutes);
app.use("/api/auth", authRoutes);

//Base routes
app.get('/', (req, res) => {
    res.send('Welcome to the API');
});



app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});

export default app;