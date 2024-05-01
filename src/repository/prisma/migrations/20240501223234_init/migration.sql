/*
  Warnings:

  - The primary key for the `NoteCategory` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `NoteCategory` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Reminder` DROP FOREIGN KEY `Reminder_noteId_fkey`;

-- AlterTable
ALTER TABLE `NoteCategory` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD PRIMARY KEY (`note_id`, `category_id`);

-- AddForeignKey
ALTER TABLE `Reminder` ADD CONSTRAINT `Reminder_noteId_fkey` FOREIGN KEY (`noteId`) REFERENCES `Note`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
