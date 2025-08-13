const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log('Script starting...');

    const newAuthor = await prisma.author.create({
        data: {
            name: "Jane Austen",
            email: "jane@austen.com"
        },
    });
    console.log("Created Author", newAuthor);

    const newPost = await prisma.post.create({
        data: {
            title: "Pride and Prejudice",
            authorId: newAuthor.id, 
        },
    });
    console.log("Created post:", newPost);
    
    const postsByJane = await prisma.author.findUnique({
        where: { email: "jane@austen.com" },
        include: { posts: true }
    })
    console.log('Posts by Jane Austen', postsByJane);

    console.log('Script finished.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect();
    });