-- CreateTable
CREATE TABLE `category` (
    `category_id` INTEGER NOT NULL AUTO_INCREMENT,
    `category_name` TEXT NOT NULL,
    `category_descr` VARCHAR(50) NOT NULL,
    `category_creation_date` DATETIME(0) NOT NULL,
    `category_creator` INTEGER NOT NULL,

    INDEX `category_creator`(`category_creator`),
    PRIMARY KEY (`category_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `note` (
    `note_id` INTEGER NOT NULL AUTO_INCREMENT,
    `note_title` TEXT NULL,
    `note_content` VARCHAR(50) NULL,
    `note_status` TEXT NULL,
    `note_creation_date` DATETIME(0) NOT NULL,

    PRIMARY KEY (`note_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `notecategory` (
    `notecategory_id` INTEGER NOT NULL AUTO_INCREMENT,
    `note_id` INTEGER NOT NULL,
    `category_id` INTEGER NOT NULL,

    INDEX `category_id`(`category_id`),
    INDEX `note_id`(`note_id`),
    PRIMARY KEY (`notecategory_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `notereminder` (
    `notereminder_id` INTEGER NOT NULL AUTO_INCREMENT,
    `note_id` INTEGER NOT NULL,
    `reminder_id` INTEGER NOT NULL,

    INDEX `note_id`(`note_id`),
    INDEX `reminder_id`(`reminder_id`),
    PRIMARY KEY (`notereminder_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `reminder` (
    `reminder_id` INTEGER NOT NULL AUTO_INCREMENT,
    `reminder_name` TEXT NOT NULL,
    `reminder_descr` VARCHAR(50) NOT NULL,
    `reminder_type` TEXT NOT NULL,
    `reminder_creation_date` DATETIME(0) NOT NULL,
    `reminder_creator` INTEGER NOT NULL,

    INDEX `reminder_creator`(`reminder_creator`),
    PRIMARY KEY (`reminder_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user` (
    `user_id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_name` VARCHAR(50) NOT NULL,
    `user_added_date` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `user_password` VARCHAR(10) NOT NULL,
    `user_mobile` VARCHAR(11) NOT NULL,

    PRIMARY KEY (`user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `usernote` (
    `usernote_id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `note_id` INTEGER NOT NULL,

    INDEX `note_id`(`note_id`),
    INDEX `user_id`(`user_id`),
    PRIMARY KEY (`usernote_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `category` ADD CONSTRAINT `category_ibfk_1` FOREIGN KEY (`category_creator`) REFERENCES `user`(`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `notecategory` ADD CONSTRAINT `notecategory_ibfk_1` FOREIGN KEY (`note_id`) REFERENCES `note`(`note_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `notecategory` ADD CONSTRAINT `notecategory_ibfk_2` FOREIGN KEY (`category_id`) REFERENCES `category`(`category_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `notereminder` ADD CONSTRAINT `notereminder_ibfk_1` FOREIGN KEY (`note_id`) REFERENCES `note`(`note_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `notereminder` ADD CONSTRAINT `notereminder_ibfk_2` FOREIGN KEY (`reminder_id`) REFERENCES `reminder`(`reminder_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `reminder` ADD CONSTRAINT `reminder_ibfk_1` FOREIGN KEY (`reminder_creator`) REFERENCES `user`(`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `usernote` ADD CONSTRAINT `usernote_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user`(`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `usernote` ADD CONSTRAINT `usernote_ibfk_2` FOREIGN KEY (`note_id`) REFERENCES `note`(`note_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
