import mongoose from "mongoose";
import { connectToDatabase } from "../lib/db";
import { Product } from "../models/Product";

const sampleProducts = [
  {
    handle: "nomad-armor-backpack",
    name: "Nomad Armor Backpack",
    nameAr: "حقيبة نوماد آرمور",
    description:
      "حقيبة سفر تقنية مبطنة، مقسمة للأجهزة والملحقات، ومصممة للتنقل اليومي.",
    category: "حقائب السفر",
    price: 68.5,
    image: "/products/nomad-armor.svg",
    tag: "الأكثر طلباً",
  },
  {
    handle: "hub-sleeve-pro",
    name: "Hub-Sleeve Pro",
    nameAr: "جراب هَب برو",
    description:
      "جراب مبطن يحمي جهازك اللوحي وملحقات الاتصال الأساسية في مساحة واحدة.",
    category: "حماية الأجهزة",
    price: 32.75,
    image: "/products/hub-sleeve-pro.svg",
    tag: "إصدار جديد",
  },
  {
    handle: "cyber-cable-pouch",
    name: "Cyber Cable Pouch",
    nameAr: "حافظة سايبر للكابلات",
    description:
      "حافظة صغيرة لتنظيم الكابلات والشواحن وبطاقات الذاكرة أثناء السفر.",
    category: "تنظيم الملحقات",
    price: 18.9,
    image: "/products/cyber-cable-pouch.svg",
  },
];

async function seedProducts(): Promise<void> {
  await connectToDatabase();

  const results = await Promise.all(
    sampleProducts.map((product) =>
      Product.updateOne(
        {
          handle: product.handle,
        },
        {
          $setOnInsert: product,
        },
        {
          upsert: true,
        },
      ),
    ),
  );
  const inserted = results.reduce(
    (total, result) => total + result.upsertedCount,
    0,
  );

  console.info(
    `Seed finished: ${inserted} product(s) added; existing products were left unchanged.`,
  );
}

seedProducts()
  .catch((error: unknown) => {
    const errorName = error instanceof Error ? error.name : "UnknownError";
    console.error(`Product seeding failed (${errorName}).`);
    process.exitCode = 1;
  })
  .finally(async () => {
    await mongoose.disconnect();
  });
