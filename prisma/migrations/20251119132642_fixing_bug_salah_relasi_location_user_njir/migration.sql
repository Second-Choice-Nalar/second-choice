/*
  Warnings:

  - You are about to drop the column `city` on the `Location` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Location` table. All the data in the column will be lost.
  - Added the required column `kecamatan` to the `Location` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."Location" DROP CONSTRAINT "Location_userId_fkey";

-- DropIndex
DROP INDEX "public"."Location_userId_idx";

-- AlterTable
ALTER TABLE "Location" DROP COLUMN "city",
DROP COLUMN "userId",
ADD COLUMN     "kecamatan" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "locationId" TEXT;

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE SET NULL ON UPDATE CASCADE;
