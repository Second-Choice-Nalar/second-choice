import "dotenv/config";
import { PrismaClient } from "@/app/generated/prisma/client";
import slugify from "slugify";

const prisma = new PrismaClient();

async function main() {
  const campuses = [
    { name: "Universitas Indonesia" },
    { name: "Institut Teknologi Bandung" },
    { name: "Universitas Gadjah Mada" },
    { name: "Institut Pertanian Bogor" },
    { name: "Institut Teknologi Sepuluh Nopember" },
    { name: "Universitas Diponegoro" },
    { name: "Universitas Airlangga" },
    { name: "Universitas Sumatera Utara" },
    { name: "Universitas Padjadjaran" },
    { name: "Universitas Brawijaya" },
    { name: "Universitas Hasanuddin" },
    { name: "Universitas Sebelas Maret" },
    { name: "UIN Syarif Hidayatullah Jakarta" },
    { name: "Universitas Pendidikan Indonesia" },
    { name: "Universitas Andalas" },
    { name: "Universitas Negeri Jakarta" },
    { name: "Universitas Jember" },
    { name: "Universitas Multimedia Nusantara" },
    { name: "Universitas Bina Nusantara" },
    { name: "Telkom University" },
  ];

  for (const campus of campuses) {
    await prisma.campus.upsert({
      where: { name: campus.name },
      update: {},
      create: campus,
    });
  }

  console.log("✅ Seeding done: campus list inserted/updated.");

  const kecamatanList = [
    { name: "Gunungpati", city: "Semarang" },
    { name: "Tembalang", city: "Semarang" },
    { name: "Gondokusuman", city: "Yogyakarta" },
    { name: "Sukajadi", city: "Bandung" },
    { name: "Beji", city: "Depok" },
    { name: "Lowokwaru", city: "Malang" },
    { name: "Gubeng", city: "Surabaya" },
    { name: "Medan Baru", city: "Medan" },
    { name: "Tegalsari", city: "Surabaya" },
    { name: "Cicendo", city: "Bandung" },
  ];

  await prisma.location.createMany({
    data: kecamatanList,
    skipDuplicates: true,
  });

  console.log("✅ Seeding done: kecamatan (location) inserted.");

  //Seed Category
  const rawCategories = [
    "Elektronik",
    "Pakaian Pria",
    "Pakaian Wanita",
    "Makanan & Minuman",
    "Buku & Alat Tulis",
    "Kesehatan & Kecantikan",
    "Olahraga",
    "Peralatan Rumah Tangga",
  ];

  for (const name of rawCategories) {
    const slug = slugify(name, { lower: true });
    await prisma.category.upsert({
      where: { slug },
      update: {},
      create: {
        name,
        slug,
      },
    });
  }

  console.log("✅ Seeding kategori selesai");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
