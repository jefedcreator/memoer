/*
  Warnings:

  - A unique constraint covering the columns `[user_email]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `User_user_email_key` ON `User`(`user_email`);
