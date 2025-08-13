import prisma from '../config/db.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config()

export const login = async (email, pass) => {
    const author = await prisma.author.findUnique({ where: { email } });
    if (!author) throw new Error('Invalid credentials');
    const isPasswordValid = await bcrypt.compare(pass, author.password);
    if (!isPasswordValid) throw new Error ('Invalid credentials');
    const token = jwt.sign({ id: author.id, email: author.email }, process.env.JWT_SECRET, {
        expiresIn: '1d',
    });
    return { token };
};