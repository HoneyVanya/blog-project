import { Router } from "express";
import { validate } from "../middleware/validate.js";
import { createPostSchema } from "../schemas/post.schema.js";
import { 
    getAllPosts,
    createPost,
    updatePost,
    deletePost,
 } from '../controllers/post.controller.js';
import { protect } from "../middleware/auth.middleware.js";

const router = Router();

router.use(protect);

router.get('/', getAllPosts);
router.post('/', validate(createPostSchema), createPost);
router.patch('/:id', updatePost);
router.delete('/:id', deletePost);

export default router;