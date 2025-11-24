/*
  Warnings:

  - You are about to drop the column `campusId` on the `Location` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Location" DROP CONSTRAINT "Location_campusId_fkey";

-- DropIndex
DROP INDEX "public"."Location_campusId_idx";

-- AlterTable
ALTER TABLE "Location" DROP COLUMN "campusId";

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "locationId" TEXT;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE SET NULL ON UPDATE CASCADE;
