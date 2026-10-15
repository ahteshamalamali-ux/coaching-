import { boolean, integer, pgTable, serial, smallint, timestamp, varchar } from 'drizzle-orm/pg-core'

export const reviews = pgTable('reviews', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 60 }).notNull(),
  role: varchar('role', { length: 60 }).notNull(),
  rating: smallint('rating').notNull(),
  message: varchar('message', { length: 500 }).notNull(),
  approved: boolean('approved').notNull().default(true),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
})

export const enrollments = pgTable('enrollments', {
  id: serial('id').primaryKey(),
  receiptNo: varchar('receipt_no', { length: 20 }).notNull().unique(),
  studentName: varchar('student_name', { length: 80 }).notNull(),
  email: varchar('email', { length: 120 }).notNull(),
  phone: varchar('phone', { length: 10 }).notNull(),
  courseId: varchar('course_id', { length: 30 }).notNull(),
  courseName: varchar('course_name', { length: 80 }).notNull(),
  plan: varchar('plan', { length: 20 }).notNull(),
  paymentMethod: varchar('payment_method', { length: 20 }).notNull(),
  amountDue: integer('amount_due').notNull(),
  gst: integer('gst').notNull(),
  total: integer('total').notNull(),
  status: varchar('status', { length: 20 }).notNull().default('paid'),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
})
