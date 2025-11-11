/*
  Warnings:

  - You are about to drop the column `favoriteCount` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `rating` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `totalReviews` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the `Review` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Review" DROP CONSTRAINT "Review_productId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Review" DROP CONSTRAINT "Review_reviewerId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Review" DROP CONSTRAINT "Review_sellerId_fkey";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "favoriteCount",
DROP COLUMN "rating",
DROP COLUMN "totalReviews";

-- DropTable
DROP TABLE "public"."Review";

-- DropEnum
DROP TYPE "public"."ReviewType";
