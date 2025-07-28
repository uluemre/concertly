import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const user = await prisma.user.upsert({
        where: { email: 'emre@example.com' },
        update: {},
        create: {
            username: 'emre',
            email: 'emre@example.com',
            password: 'hashedpassword',
        },
    });

    const artist = await prisma.artist.upsert({
        where: { name: 'Coldplay' },
        update: {},
        create: {
            name: 'Coldplay',
            bio: 'British rock band',
            imageUrl: 'https://upload.wikimedia.org/wikipedia/en/2/2f/Coldplay_-_Viva_la_Vida.png',
        },
    });

    await prisma.post.create({
        data: {
            description: 'Unforgettable night at the Coldplay concert!',
            imageUrl: 'https://picsum.photos/seed/coldplay/600/400',
            userId: user.id,
            artistId: artist.id,
        },
    });

    console.log('✅ Seed data inserted!');
}

main()
    .then(async () => await prisma.$disconnect())
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
