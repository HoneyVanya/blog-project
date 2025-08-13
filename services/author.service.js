import prisma from '../config/db.js';
import bcrypt from 'bcryptjs';

export const createAuthor = async (data) => {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const author = await prisma.author.create({
        data: {
            name: data.name,
            email: data.email,
            password: hashedPassword,
        },
    });
    const { password, ...authorWithoutPassword } = author;
    return authorWithoutPassword;
};