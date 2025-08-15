import request from 'supertest';
import express from 'express';
import postRoutes from '../routes/post.routes.js';

const app = express();

app.use(express.json());

app.use('/api/posts', (req, res, next) => {
    if(!req.headers.authorization) {
        return res.status(401).json({ message: 'No token' })
    }
    next()
}, postRoutes);


describe('GET /api/posts', () => {
    it('should return 401 Unauthorized if no token is provided', async () => {
        const response = await request(app).get('/api/posts');

        expect(response.statusCode).toBe(401);
        expect(response.body.message).toBe('No token')
    });
});