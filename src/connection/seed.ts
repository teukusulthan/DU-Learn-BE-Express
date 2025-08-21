import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // 1) Bersihkan data lama (urutan aman terhadap relasi)
  await prisma.comment.deleteMany();
  await prisma.post.deleteMany();
  await prisma.category.deleteMany();
  await prisma.user.deleteMany();

  // 2) Buat data dasar: 1 user + 2 kategori
  const user = await prisma.user.create({
    data: { name: "Demo User", email: "demo@example.com" },
  });

  const tech = await prisma.category.create({
    data: { name: "Tech", slug: "tech" },
  });

  const life = await prisma.category.create({
    data: { name: "Life", slug: "life" },
  });

  // 3) Buat 3 post (2 di 'tech', 1 di 'life')
  const post1 = await prisma.post.create({
    data: {
      title: "React Tips",
      content: "Hooks!",
      authorId: user.id,
      categoryId: tech.id,
    },
  });

  const post2 = await prisma.post.create({
    data: {
      title: "Daily Notes",
      content: "Journaling",
      authorId: user.id,
      categoryId: life.id,
    },
  });

  const post3 = await prisma.post.create({
    data: {
      title: "Node Streams",
      content: "Backpressure basics",
      authorId: user.id,
      categoryId: tech.id,
    },
  });

  // 4) Komentar:
  //    - post1: 12 komentar (untuk test minComments > 10 dan pagination)
  //    - post2: 3 komentar
  //    - post3: 0 komentar
  const commentsForPost1 = Array.from({ length: 12 }, (_, i) => ({
    postId: post1.id,
    author: `User${i + 1}`,
    message: `Comment ${i + 1} on Post1`,
  }));

  const commentsForPost2 = Array.from({ length: 3 }, (_, i) => ({
    postId: post2.id,
    author: `User${i + 1}`,
    message: `Comment ${i + 1} on Post2`,
  }));

  await prisma.comment.createMany({
    data: [...commentsForPost1, ...commentsForPost2],
  });

  console.log("✅ Seed done");
  console.log({
    userId: user.id,
    categories: { tech: tech.id, life: life.id },
    posts: { post1: post1.id, post2: post2.id, post3: post3.id },
    counts: { commentsPost1: 12, commentsPost2: 3, commentsPost3: 0 },
  });
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
