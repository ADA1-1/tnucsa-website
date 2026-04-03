CREATE TABLE `memberPreferences` (
	`id` int AUTO_INCREMENT NOT NULL,
	`memberId` int NOT NULL,
	`profilePhotoUrl` varchar(500),
	`bio` text,
	`phoneVerified` boolean DEFAULT false,
	`emailVerified` boolean DEFAULT false,
	`notificationsEnabled` boolean DEFAULT true,
	`eventNotifications` boolean DEFAULT true,
	`announcementNotifications` boolean DEFAULT true,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `memberPreferences_id` PRIMARY KEY(`id`),
	CONSTRAINT `memberPreferences_memberId_unique` UNIQUE(`memberId`)
);
--> statement-breakpoint
ALTER TABLE `memberPreferences` ADD CONSTRAINT `memberPreferences_memberId_members_id_fk` FOREIGN KEY (`memberId`) REFERENCES `members`(`id`) ON DELETE no action ON UPDATE no action;