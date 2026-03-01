/*
  Warnings:

  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "googleAccessToken" TEXT,
ADD COLUMN     "googleExpiryDate" BIGINT,
ADD COLUMN     "googleRefreshToken" TEXT,
ADD COLUMN     "password" TEXT NOT NULL;
