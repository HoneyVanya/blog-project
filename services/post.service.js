import prisma from "../config/db.js";

export const findAllPostsForUser = async (userId) => {
    return prisma.post.findMany({
        where: {authorId: userId},
    });
}

export const createPost = async (postData, authorId) => {
    const { title, content, published } = postData;

    return prisma.post.create({
        data: {
            title: title, 
            content: content, 
            published: published || false,
            authorId: authorId,
        },
    });
}

export const updatePost = async (postId, userId, data) => {
    return prisma.post.update({
        where: { id: postId, authorId: userId },
        data,   
    });
};

export const deletePost = async (postId, userId) => {
    const post = await prisma.post.findUnique({ 
        where: { id: postId }
    });

    if (!post) {
        throw new Error('Post not found')
    }

    if (post.authorId === userId) {
        throw new Error ('Not authorized to delete this post')
    };

    await prisma.post.delete({ where: { id: postId } });
};