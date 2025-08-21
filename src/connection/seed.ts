import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Clear existing data
  await prisma.order.deleteMany();
  await prisma.product.deleteMany();
  await prisma.user.deleteMany();

  // Create sample users
  const user1 = await prisma.user.create({
    data: {
      name: "Alice",
      email: "alice@example.com",
    },
  });

  const user2 = await prisma.user.create({
    data: {
      name: "Bob",
      email: "bob@example.com",
    },
  });

  // Create sample products
  const product1 = await prisma.product.create({
    data: {
      name: "Laptop",
      price: 15000000,
      stock: 10,
    },
  });

  const product2 = await prisma.product.create({
    data: {
      name: "Headset",
      price: 500000,
      stock: 20,
    },
  });

  const product3 = await prisma.product.create({
    data: {
      name: "Mechanical Keyboard",
      price: 1200000,
      stock: 15,
    },
  });

  // Create sample orders linked to users and products
  await prisma.order.create({
    data: {
      userId: user1.id,
      productId: product1.id,
      quantity: 1,
    },
  });

  await prisma.order.create({
    data: {
      userId: user1.id,
      productId: product2.id,
      quantity: 2,
    },
  });

  await prisma.order.create({
    data: {
      userId: user2.id,
      productId: product3.id,
      quantity: 1,
    },
  });

  console.log("✅ Seeding completed!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
