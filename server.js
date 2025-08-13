import express from 'express';
import authorRoutes from './routes/author.routes.js';
import postRoutes from './routes/post.routes.js';
import authRoutes from './routes/auth.routes.js';
import { errorHandler } from './middleware/errorHandler.js';
import dotenv from 'dotenv';

dotenv.config()

const app = express();

app.use(express.json());

app.use((req, res, next) => {
    console.log('--- New Request ---');
    console.log('Time:', new Date().toLocaleTimeString());
    console.log('Request URL:', req.originalUrl);
    console.log('Request Method:', req.method);
    console.log('Request Headers:', req.headers); 
    console.log('Request Body:', req.body);
    next(); 
});

app.use('/api/authors', authorRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);

app.use(errorHandler)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
});
