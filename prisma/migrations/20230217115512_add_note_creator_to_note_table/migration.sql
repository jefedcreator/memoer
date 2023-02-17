/*
  Warnings:

  - Added the required column `note_creator` to the `note` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `note` ADD COLUMN `note_creator` INTEGER NOT NULL;

-- CreateIndex
CREATE INDEX `fk_note_creator` ON `note`(`note_creator`);

-- AddForeignKey
ALTER TABLE `note` ADD CONSTRAINT `fk_note_creator` FOREIGN KEY (`note_creator`) REFERENCES `user`(`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
