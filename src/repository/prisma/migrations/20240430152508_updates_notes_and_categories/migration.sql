/*
  Warnings:

  - You are about to drop the column `note_creator` on the `Category` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Category` DROP FOREIGN KEY `Category_note_creator_fkey`;

-- AlterTable
ALTER TABLE `Category` DROP COLUMN `note_creator`;
