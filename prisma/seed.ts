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
    { name: "Gunungpati", kecamatan: "Semarang" },
    { name: "Tembalang", kecamatan: "Semarang" },
    { name: "Gondokusuman", kecamatan: "Yogyakarta" },
    { name: "Sukajadi", kecamatan: "Bandung" },
    { name: "Beji", kecamatan: "Depok" },
    { name: "Lowokwaru", kecamatan: "Malang" },
    { name: "Gubeng", kecamatan: "Surabaya" },
    { name: "Medan Baru", kecamatan: "Medan" },
    { name: "Tegalsari", kecamatan: "Surabaya" },
    { name: "Cicendo", kecamatan: "Bandung" },
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
