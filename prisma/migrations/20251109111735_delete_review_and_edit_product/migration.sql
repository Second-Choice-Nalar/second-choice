/*
  Warnings:

  - You are about to drop the column `title` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `viewCount` on the `Product` table. All the data in the column will be lost.
  - Added the required column `productName` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "title",
DROP COLUMN "viewCount",
ADD COLUMN     "productName" TEXT NOT NULL;
