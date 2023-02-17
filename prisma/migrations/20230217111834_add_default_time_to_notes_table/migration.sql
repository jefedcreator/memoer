/*
  Warnings:

  - A unique constraint covering the columns `[user_password]` on the table `user` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `note` MODIFY `note_creation_date` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0);

-- CreateIndex
CREATE UNIQUE INDEX `user_password` ON `user`(`user_password`);
