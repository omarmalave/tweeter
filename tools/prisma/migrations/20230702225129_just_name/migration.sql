/*
  Warnings:

  - You are about to drop the column `firstName` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `User` table. All the data in the column will be lost.
  - Added the required column `name` to the `User` table without a default value. This is not possible if the table is not empty.

*/

-- AlterTable
ALTER TABLE "User"
ADD COLUMN "name" TEXT;

-- UpdateData
UPDATE "User" SET "name" = CONCAT("firstName", ' ', "lastName");

-- AlterTable
ALTER TABLE "User"
ALTER COLUMN "name" SET NOT NULL,
DROP COLUMN "firstName",
DROP COLUMN "lastName";
