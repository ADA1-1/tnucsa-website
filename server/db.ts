import { eq, desc } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, InsertMember, members, InsertEvent, events, InsertAnnouncement, announcements, InsertLeadership, leadership, InsertInquiry, inquiries, eventRegistrations, memberPreferences, InsertEventRegistration, InsertMemberPreference } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// Members queries
export async function createMember(member: InsertMember) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(members).values(member);
  return result;
}

export async function getMemberByRegistrationNumber(regNumber: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.select().from(members).where(eq(members.registrationNumber, regNumber)).limit(1);
  return result[0];
}

export async function getAllMembers() {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return await db.select().from(members);
}

// Events queries
export async function createEvent(event: InsertEvent) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return await db.insert(events).values(event);
}

export async function getUpcomingEvents() {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return await db.select().from(events).where(eq(events.status, "upcoming")).orderBy(events.eventDate);
}

export async function getAllEvents() {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return await db.select().from(events).orderBy(events.eventDate);
}

export async function getEventById(eventId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.select().from(events).where(eq(events.id, eventId)).limit(1);
  return result[0];
}

// Announcements queries
export async function createAnnouncement(announcement: InsertAnnouncement) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return await db.insert(announcements).values(announcement);
}

export async function getAllAnnouncements() {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return await db.select().from(announcements).orderBy(desc(announcements.createdAt));
}

// Leadership queries
export async function getAllLeadership() {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return await db.select().from(leadership).orderBy(leadership.displayOrder);
}

export async function createLeadership(lead: InsertLeadership) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return await db.insert(leadership).values(lead);
}

// Inquiries queries
export async function createInquiry(inquiry: InsertInquiry) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return await db.insert(inquiries).values(inquiry);
}

export async function getAllInquiries() {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return await db.select().from(inquiries).orderBy(desc(inquiries.createdAt));
}


// Event registration queries
export async function registerForEvent(registration: InsertEventRegistration) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return await db.insert(eventRegistrations).values(registration);
}

export async function getMemberEventRegistrations(memberId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return await db.select().from(eventRegistrations).where(eq(eventRegistrations.memberId, memberId));
}

export async function getMemberByUserId(userId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.select().from(members).where(eq(members.userId, userId)).limit(1);
  return result[0];
}

// Member preferences queries
export async function getMemberPreferences(memberId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.select().from(memberPreferences).where(eq(memberPreferences.memberId, memberId)).limit(1);
  return result[0];
}

export async function upsertMemberPreferences(memberId: number, prefs: Partial<InsertMemberPreference>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const existing = await getMemberPreferences(memberId);
  if (existing) {
    return await db.update(memberPreferences).set(prefs).where(eq(memberPreferences.memberId, memberId));
  } else {
    return await db.insert(memberPreferences).values({ memberId, ...prefs });
  }
}
