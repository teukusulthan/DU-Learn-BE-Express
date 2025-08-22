import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  await prisma.order.deleteMany();
  await prisma.product.deleteMany();
  await prisma.supplier.deleteMany();
  await prisma.user.deleteMany();

  await prisma.user.createMany({
    data: [
      { name: "Budi Santoso", email: "budi@mail.com", points: 100 },
      { name: "Siti Aminah", email: "siti@mail.com", points: 80 },
      { name: "Agus Pratama", email: "agus@mail.com", points: 50 },
    ],
  });

  const supplier1 = await prisma.supplier.create({
    data: { name: "Toko Sembako Makmur", stock: 0 },
  });

  const supplier2 = await prisma.supplier.create({
    data: { name: "Warung Harian Jaya", stock: 0 },
  });

  await prisma.product.createMany({
    data: [
      { name: "Beras 5kg", price: 65000, stock: 20, supplierId: supplier1.id },
      {
        name: "Minyak Goreng 1L",
        price: 18000,
        stock: 15,
        supplierId: supplier1.id,
      },
      {
        name: "Gula Pasir 1kg",
        price: 15000,
        stock: 10,
        supplierId: supplier1.id,
      },
    ],
  });

  await prisma.product.createMany({
    data: [
      { name: "Mie Instan", price: 3500, stock: 50, supplierId: supplier2.id },
      { name: "Sabun Mandi", price: 7000, stock: 25, supplierId: supplier2.id },
      {
        name: "Shampoo Sachet",
        price: 2000,
        stock: 40,
        supplierId: supplier2.id,
      },
    ],
  });

  console.log("✅ Seed done!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
