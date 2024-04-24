/*
  Warnings:

  - You are about to drop the column `category_creator` on the `Category` table. All the data in the column will be lost.
  - Added the required column `note_creator` to the `Category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_password` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Note` DROP FOREIGN KEY `fk_note_creator`;

-- AlterTable
ALTER TABLE `Category` DROP COLUMN `category_creator`,
    ADD COLUMN `note_creator` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `User` ADD COLUMN `user_password` VARCHAR(11) NOT NULL;

-- AddForeignKey
ALTER TABLE `Category` ADD CONSTRAINT `Category_note_creator_fkey` FOREIGN KEY (`note_creator`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Note` ADD CONSTRAINT `Note_note_creator_fkey` FOREIGN KEY (`note_creator`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
