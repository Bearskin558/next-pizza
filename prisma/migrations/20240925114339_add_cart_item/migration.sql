/*
  Warnings:

  - Added the required column `pizzaDoughType` to the `CartItem` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PizzaDoughType" AS ENUM ('TRADITIONAL', 'THIN');

-- AlterTable
ALTER TABLE "CartItem" ADD COLUMN     "count" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "pizzaDoughType" "PizzaDoughType" NOT NULL;
