import asyncHandler from "express-async-handler";
import * as postService from "../services/post.service.js";

export const getAllPosts = asyncHandler( async (req, res) => {
    const posts = await postService.findAllPostsForUser(req.user.id);
    res.json(posts);
});

export const createPost = asyncHandler( async (req, res) => {
    const postData = req.body; 
    const authorId = req.user.id;
    const newPost = await postService.createPost(postData, authorId);

    res.status(201).json(newPost);
});

export const updatePost = asyncHandler (async (req, res) => {
    const { id } = req.params;
    await postService.updatePost(id, req.user.id, req.body);
    res.json(updatePost);
});

export const deletePost = asyncHandler ( async (req, res) => {
    const { id } = req.params;
    await postService.deletePost(id, req.user.id);
    res.status(204).send();
});