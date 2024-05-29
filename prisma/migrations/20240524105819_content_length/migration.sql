/*
  Warnings:

  - You are about to drop the column `published` on the `post` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `post` DROP COLUMN `published`,
    MODIFY `content` LONGTEXT NOT NULL,
    MODIFY `categories` VARCHAR(191) NULL;
