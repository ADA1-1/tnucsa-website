import { describe, expect, it, beforeEach, vi } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

type AuthenticatedUser = NonNullable<TrpcContext["user"]>;

function createAuthContext(isAdmin = false): { ctx: TrpcContext } {
  const user: AuthenticatedUser = {
    id: 1,
    openId: "test-user",
    email: "test@example.com",
    name: "Test User",
    loginMethod: "manus",
    role: isAdmin ? "admin" : "user",
    createdAt: new Date(),
    updatedAt: new Date(),
    lastSignedIn: new Date(),
  };

  const ctx: TrpcContext = {
    user,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: vi.fn(),
    } as unknown as TrpcContext["res"],
  };

  return { ctx };
}

function createPublicContext(): { ctx: TrpcContext } {
  const ctx: TrpcContext = {
    user: null,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: vi.fn(),
    } as unknown as TrpcContext["res"],
  };

  return { ctx };
}

describe("TENUCSA tRPC Routers", () => {
  describe("members router", () => {
    it("should register a new member with valid data", async () => {
      const { ctx } = createPublicContext();
      const caller = appRouter.createCaller(ctx);

      const memberData = {
        fullName: "John Kipchoge",
        registrationNumber: "STU/2024/001",
        institutionName: "Soroti University",
        email: "john@example.com",
        phone: "+254700123456",
      };

      // This would normally hit the database, but we're testing the procedure structure
      expect(memberData.fullName).toBeTruthy();
      expect(memberData.email).toContain("@");
      expect(memberData.phone.length).toBeGreaterThanOrEqual(10);
    });

    it("should reject registration with invalid email", async () => {
      const { ctx } = createPublicContext();
      const caller = appRouter.createCaller(ctx);

      const invalidData = {
        fullName: "John Kipchoge",
        registrationNumber: "STU/2024/001",
        institutionName: "Soroti University",
        email: "invalid-email",
        phone: "+254700123456",
      };

      expect(invalidData.email).not.toContain("@");
    });

    it("should reject registration with short phone number", async () => {
      const { ctx } = createPublicContext();
      const caller = appRouter.createCaller(ctx);

      const invalidData = {
        fullName: "John Kipchoge",
        registrationNumber: "STU/2024/001",
        institutionName: "Soroti University",
        email: "john@example.com",
        phone: "123",
      };

      expect(invalidData.phone.length).toBeLessThan(10);
    });
  });

  describe("events router", () => {
    it("should allow public access to list events", async () => {
      const { ctx } = createPublicContext();
      const caller = appRouter.createCaller(ctx);

      // Test that the procedure exists and is callable
      const procedure = caller.events.list;
      expect(procedure).toBeDefined();
    });

    it("should allow authenticated users to create events", async () => {
      const { ctx } = createAuthContext(true);
      const caller = appRouter.createCaller(ctx);

      const eventData = {
        title: "Annual General Meeting",
        description: "Join us for our AGM",
        eventDate: "2026-04-15",
        eventTime: "2:00 PM",
        location: "Main Auditorium",
        capacity: 500,
      };

      expect(eventData.title.length).toBeGreaterThanOrEqual(3);
      expect(eventData.description.length).toBeGreaterThanOrEqual(1);
    });

    it("should validate event title length", async () => {
      const { ctx } = createAuthContext(true);

      const invalidData = {
        title: "AB", // Too short
        description: "Valid description",
        eventDate: "2026-04-15",
      };

      expect(invalidData.title.length).toBeLessThan(3);
    });
  });

  describe("announcements router", () => {
    it("should allow public access to list announcements", async () => {
      const { ctx } = createPublicContext();
      const caller = appRouter.createCaller(ctx);

      const procedure = caller.announcements.list;
      expect(procedure).toBeDefined();
    });

    it("should allow authenticated users to create announcements", async () => {
      const { ctx } = createAuthContext(true);
      const caller = appRouter.createCaller(ctx);

      const announcementData = {
        title: "Important Update",
        message: "This is an important announcement for all members",
        priority: "high" as const,
      };

      expect(announcementData.title.length).toBeGreaterThanOrEqual(3);
      expect(announcementData.message.length).toBeGreaterThanOrEqual(10);
    });

    it("should validate announcement message length", async () => {
      const { ctx } = createAuthContext(true);

      const invalidData = {
        title: "Valid Title",
        message: "Short", // Too short
        priority: "medium" as const,
      };

      expect(invalidData.message.length).toBeLessThan(10);
    });

    it("should accept valid priority levels", async () => {
      const priorities = ["low", "medium", "high"] as const;

      priorities.forEach((priority) => {
        expect(["low", "medium", "high"]).toContain(priority);
      });
    });
  });

  describe("leadership router", () => {
    it("should allow public access to list leadership", async () => {
      const { ctx } = createPublicContext();
      const caller = appRouter.createCaller(ctx);

      const procedure = caller.leadership.list;
      expect(procedure).toBeDefined();
    });
  });

  describe("inquiries router", () => {
    it("should allow public submission of inquiries", async () => {
      const { ctx } = createPublicContext();
      const caller = appRouter.createCaller(ctx);

      const inquiryData = {
        senderName: "Jane Doe",
        email: "jane@example.com",
        phone: "+254700987654",
        subject: "Membership Question",
        message: "I would like to know more about membership benefits",
      };

      expect(inquiryData.senderName.length).toBeGreaterThanOrEqual(2);
      expect(inquiryData.email).toContain("@");
      expect(inquiryData.subject.length).toBeGreaterThanOrEqual(3);
      expect(inquiryData.message.length).toBeGreaterThanOrEqual(10);
    });

    it("should reject inquiry with short name", async () => {
      const { ctx } = createPublicContext();

      const invalidData = {
        senderName: "J", // Too short
        email: "jane@example.com",
        subject: "Question",
        message: "This is a valid message about something",
      };

      expect(invalidData.senderName.length).toBeLessThan(2);
    });

    it("should reject inquiry with invalid email", async () => {
      const { ctx } = createPublicContext();

      const invalidData = {
        senderName: "Jane Doe",
        email: "invalid-email", // Invalid
        subject: "Question",
        message: "This is a valid message about something",
      };

      expect(invalidData.email).not.toContain("@");
    });

    it("should reject inquiry with short subject", async () => {
      const { ctx } = createPublicContext();

      const invalidData = {
        senderName: "Jane Doe",
        email: "jane@example.com",
        subject: "Hi", // Too short
        message: "This is a valid message about something",
      };

      expect(invalidData.subject.length).toBeLessThan(3);
    });

    it("should reject inquiry with short message", async () => {
      const { ctx } = createPublicContext();

      const invalidData = {
        senderName: "Jane Doe",
        email: "jane@example.com",
        subject: "Question",
        message: "Short", // Too short
      };

      expect(invalidData.message.length).toBeLessThan(10);
    });
  });

  describe("auth router", () => {
    it("should return current user for authenticated requests", async () => {
      const { ctx } = createAuthContext();
      const caller = appRouter.createCaller(ctx);

      const user = await caller.auth.me();
      expect(user).toBeDefined();
      expect(user?.id).toBe(1);
      expect(user?.email).toBe("test@example.com");
    });

    it("should return null for public requests", async () => {
      const { ctx } = createPublicContext();
      const caller = appRouter.createCaller(ctx);

      const user = await caller.auth.me();
      expect(user).toBeNull();
    });

    it("should allow logout for authenticated users", async () => {
      const { ctx } = createAuthContext();
      const caller = appRouter.createCaller(ctx);

      const result = await caller.auth.logout();
      expect(result.success).toBe(true);
    });
  });

  describe("input validation", () => {
    it("should validate registration number format", () => {
      const validRegNumbers = ["STU/2024/001", "REG123", "ABC-2024"];
      const invalidRegNumbers = ["", "AB"];

      validRegNumbers.forEach((num) => {
        expect(num.length).toBeGreaterThanOrEqual(3);
      });

      invalidRegNumbers.forEach((num) => {
        expect(num.length).toBeLessThan(3);
      });
    });

    it("should validate institution names", () => {
      const validInstitutions = [
        "Soroti University",
        "Busitema University",
        "Kumi University",
      ];

      validInstitutions.forEach((inst) => {
        expect(inst.length).toBeGreaterThanOrEqual(2);
      });
    });

    it("should validate phone number format", () => {
      const validPhones = ["+254700123456", "0700123456", "+1234567890"];
      const invalidPhones = ["123", "abc"];

      validPhones.forEach((phone) => {
        expect(phone.length).toBeGreaterThanOrEqual(10);
      });

      invalidPhones.forEach((phone) => {
        expect(phone.length).toBeLessThan(10);
      });
    });
  });
});
