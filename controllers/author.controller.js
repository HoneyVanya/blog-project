import asyncHandler from 'express-async-handler';
import * as authorService from '../services/author.service.js'

export const createAuthor = asyncHandler( async (req, res) => {
    const newAuthor = await authorService.createAuthor(req.body);
    res.status(201).json(newAuthor);
});