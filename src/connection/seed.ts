import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Bersihkan data lama (aman karena cuma 1 tabel)
  await prisma.user.deleteMany();

  // Insert sample users
  await prisma.user.createMany({
    data: [
      { name: "Alice", email: "alice@example.com", points: 0 },
      { name: "Bob", email: "bob@example.com", points: 10 },
      { name: "Charlie", email: "charlie@example.com", points: 25 },
      { name: "Dina", email: "dina@example.com", points: 42 },
      { name: "Evan", email: "evan@example.com", points: 100 },
      { name: "Fiona", email: "fiona@example.com", points: 250 },
      { name: "Gilang", email: "gilang@example.com", points: 5 },
      { name: "Hana", email: "hana@example.com", points: 75 },
      { name: "Ivan", email: "ivan@example.com", points: 150 },
      { name: "Joko", email: "joko@example.com", points: 300 },
    ],
  });

  console.log("✅ Seed Users selesai.");
}

main()
  .catch((e) => {
    console.error("❌ Seed gagal:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
