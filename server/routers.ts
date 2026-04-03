import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { z } from "zod";
import {
  createMember,
  getAllMembers,
  createEvent,
  getAllEvents,
  getUpcomingEvents,
  getEventById,
  createAnnouncement,
  getAllAnnouncements,
  getAllLeadership,
  createInquiry,
} from "./db";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query((opts) => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  members: router({
    register: publicProcedure
      .input(
        z.object({
          fullName: z.string().min(2, "Full name must be at least 2 characters"),
          registrationNumber: z.string().min(3, "Registration number is required"),
          institutionName: z.string().min(2, "Institution name is required"),
          email: z.string().email("Invalid email address"),
          phone: z.string().min(10, "Phone number must be at least 10 digits"),
        })
      )
      .mutation(async ({ input }) => {
        return await createMember({
          fullName: input.fullName,
          registrationNumber: input.registrationNumber,
          institutionName: input.institutionName,
          email: input.email,
          phone: input.phone,
          membershipStatus: "pending",
        });
      }),
    list: publicProcedure.query(() => getAllMembers()),
  }),

  events: router({
    list: publicProcedure.query(() => getAllEvents()),
    upcoming: publicProcedure.query(() => getUpcomingEvents()),
    getById: publicProcedure
      .input(z.object({ id: z.number() }))
      .query(({ input }) => getEventById(input.id)),
    create: protectedProcedure
      .input(
        z.object({
          title: z.string().min(3, "Event title is required"),
          description: z.string().optional(),
          eventDate: z.string(),
          eventTime: z.string().optional(),
          location: z.string().optional(),
          capacity: z.number().optional(),
        })
      )
      .mutation(async ({ input, ctx }) => {
        return await createEvent({
          title: input.title,
          description: input.description,
          eventDate: new Date(input.eventDate),
          eventTime: input.eventTime,
          location: input.location,
          capacity: input.capacity,
          createdBy: ctx.user.id,
        });
      }),
  }),

  announcements: router({
    list: publicProcedure.query(() => getAllAnnouncements()),
    create: protectedProcedure
      .input(
        z.object({
          title: z.string().min(3, "Announcement title is required"),
          message: z.string().min(10, "Message must be at least 10 characters"),
          priority: z.enum(["low", "medium", "high"]).optional(),
        })
      )
      .mutation(async ({ input, ctx }) => {
        return await createAnnouncement({
          title: input.title,
          message: input.message,
          priority: (input.priority || "medium") as "low" | "medium" | "high",
          createdBy: ctx.user.id,
        });
      }),
  }),

  leadership: router({
    list: publicProcedure.query(() => getAllLeadership()),
  }),

  inquiries: router({
    submit: publicProcedure
      .input(
        z.object({
          senderName: z.string().min(2, "Name is required"),
          email: z.string().email("Invalid email address"),
          phone: z.string().optional(),
          subject: z.string().min(3, "Subject is required"),
          message: z.string().min(10, "Message must be at least 10 characters"),
        })
      )
      .mutation(async ({ input }) => {
        return await createInquiry({
          senderName: input.senderName,
          email: input.email,
          phone: input.phone,
          subject: input.subject,
          message: input.message,
        });
      }),
  }),
});

export type AppRouter = typeof appRouter;
