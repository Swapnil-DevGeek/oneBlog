/*
  Warnings:

  - You are about to drop the `_categorytopost` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `category` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `categories` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `_categorytopost` DROP FOREIGN KEY `_CategoryToPost_A_fkey`;

-- DropForeignKey
ALTER TABLE `_categorytopost` DROP FOREIGN KEY `_CategoryToPost_B_fkey`;

-- AlterTable
ALTER TABLE `post` ADD COLUMN `categories` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `_categorytopost`;

-- DropTable
DROP TABLE `category`;
