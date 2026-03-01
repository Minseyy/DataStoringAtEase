/*
  Warnings:

  - Added the required column `rowIndex` to the `Row` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Sheet` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Row" ADD COLUMN     "rowIndex" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Sheet" ADD COLUMN     "lastSyncedAt" TIMESTAMP(3),
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Sheet" ADD CONSTRAINT "Sheet_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
