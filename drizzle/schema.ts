import { int, mysqlEnum, mysqlTable, text, timestamp, varchar, boolean, decimal, date } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

// Members table for TENUCSA membership
export const members = mysqlTable("members", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").references(() => users.id),
  fullName: varchar("fullName", { length: 255 }).notNull(),
  registrationNumber: varchar("registrationNumber", { length: 100 }).notNull().unique(),
  institutionName: varchar("institutionName", { length: 255 }).notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  phone: varchar("phone", { length: 20 }).notNull(),
  membershipStatus: mysqlEnum("membershipStatus", ["pending", "active", "inactive"]).default("pending"),
  joinedAt: timestamp("joinedAt").defaultNow(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Member = typeof members.$inferSelect;
export type InsertMember = typeof members.$inferInsert;

// Events table
export const events = mysqlTable("events", {
  id: int("id").autoincrement().primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  eventDate: date("eventDate").notNull(),
  eventTime: varchar("eventTime", { length: 20 }),
  location: varchar("location", { length: 255 }),
  capacity: int("capacity"),
  registeredCount: int("registeredCount").default(0),
  status: mysqlEnum("status", ["upcoming", "ongoing", "completed", "cancelled"]).default("upcoming"),
  createdBy: int("createdBy").references(() => users.id),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Event = typeof events.$inferSelect;
export type InsertEvent = typeof events.$inferInsert;

// Event registrations
export const eventRegistrations = mysqlTable("eventRegistrations", {
  id: int("id").autoincrement().primaryKey(),
  eventId: int("eventId").references(() => events.id).notNull(),
  memberId: int("memberId").references(() => members.id).notNull(),
  registeredAt: timestamp("registeredAt").defaultNow().notNull(),
  attended: boolean("attended").default(false),
});

export type EventRegistration = typeof eventRegistrations.$inferSelect;
export type InsertEventRegistration = typeof eventRegistrations.$inferInsert;

// Announcements table
export const announcements = mysqlTable("announcements", {
  id: int("id").autoincrement().primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  message: text("message").notNull(),
  priority: mysqlEnum("priority", ["low", "medium", "high"]).default("medium"),
  createdBy: int("createdBy").references(() => users.id),
  publishedAt: timestamp("publishedAt").defaultNow(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Announcement = typeof announcements.$inferSelect;
export type InsertAnnouncement = typeof announcements.$inferInsert;

// Leadership profiles
export const leadership = mysqlTable("leadership", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").references(() => users.id),
  fullName: varchar("fullName", { length: 255 }).notNull(),
  position: varchar("position", { length: 255 }).notNull(),
  email: varchar("email", { length: 320 }),
  phone: varchar("phone", { length: 20 }),
  bio: text("bio"),
  photoUrl: varchar("photoUrl", { length: 500 }),
  department: varchar("department", { length: 255 }),
  displayOrder: int("displayOrder").default(0),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Leadership = typeof leadership.$inferSelect;
export type InsertLeadership = typeof leadership.$inferInsert;

// Contact inquiries
export const inquiries = mysqlTable("inquiries", {
  id: int("id").autoincrement().primaryKey(),
  senderName: varchar("senderName", { length: 255 }).notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  phone: varchar("phone", { length: 20 }),
  subject: varchar("subject", { length: 255 }).notNull(),
  message: text("message").notNull(),
  status: mysqlEnum("status", ["new", "read", "responded"]).default("new"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Inquiry = typeof inquiries.$inferSelect;
export type InsertInquiry = typeof inquiries.$inferInsert;

// Member preferences and profile settings
export const memberPreferences = mysqlTable("memberPreferences", {
  id: int("id").autoincrement().primaryKey(),
  memberId: int("memberId").references(() => members.id).notNull().unique(),
  profilePhotoUrl: varchar("profilePhotoUrl", { length: 500 }),
  bio: text("bio"),
  phoneVerified: boolean("phoneVerified").default(false),
  emailVerified: boolean("emailVerified").default(false),
  notificationsEnabled: boolean("notificationsEnabled").default(true),
  eventNotifications: boolean("eventNotifications").default(true),
  announcementNotifications: boolean("announcementNotifications").default(true),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type MemberPreference = typeof memberPreferences.$inferSelect;
export type InsertMemberPreference = typeof memberPreferences.$inferInsert;
