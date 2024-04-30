/*
  Warnings:

  - You are about to drop the column `category_description` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the `NoteReminder` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `NoteReminder` DROP FOREIGN KEY `NoteReminder_note_id_fkey`;

-- AlterTable
ALTER TABLE `Category` DROP COLUMN `category_description`;

-- AlterTable
ALTER TABLE `Note` MODIFY `note_creator` INTEGER NULL;

-- AlterTable
ALTER TABLE `Reminder` ADD COLUMN `noteId` INTEGER NULL,
    MODIFY `userId` INTEGER NULL;

-- DropTable
DROP TABLE `NoteReminder`;

-- AddForeignKey
ALTER TABLE `Reminder` ADD CONSTRAINT `Reminder_noteId_fkey` FOREIGN KEY (`noteId`) REFERENCES `Note`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
