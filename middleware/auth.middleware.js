import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import prisma from '../config/db.js';
import dotenv from 'dotenv';

dotenv.config();

export const protect = asyncHandler (async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await prisma.author.findUnique({
                where: {
                    id: decoded.id,
                },
                select: {
                    id: true, 
                    name: true,
                    email: true,
                },
            });
            if (!req.user) {
                res.status(401);
                throw new Error ('User not found')
            }
            next()
        } catch (error) {
            console.error(error);
            res.status(401);
            throw new Error ('Not authorized, no token')
        }
    }
    if (!token) {
        res.status(401);
        throw new Error ('Not authorized, no token');
    }
});