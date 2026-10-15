'use server'

import { randomInt } from 'node:crypto'
import { db } from '@/lib/db'
import { enrollments } from '@/lib/db/schema'
import { courses } from '@/lib/data'

const PLAN_FACTORS = { full: 0.95, two: 0.5, four: 0.25 } as const
const METHODS = ['upi', 'card', 'netbanking'] as const
const GST = 0.18

export async function createEnrollment(input: {
  name: string
  email: string
  phone: string
  courseId: string
  planId: string
  method: string
}): Promise<{ ok: true; receiptNo: string; total: number } | { ok: false; error: string }> {
  const name = String(input.name ?? '').trim().slice(0, 80)
  const email = String(input.email ?? '').trim().toLowerCase().slice(0, 120)
  const phone = String(input.phone ?? '').replace(/\D/g, '')
  const course = courses.find((c) => c.id === input.courseId)
  const factor = PLAN_FACTORS[input.planId as keyof typeof PLAN_FACTORS]
  const method = METHODS.find((m) => m === input.method)

  if (name.length < 2 || !/^\S+@\S+\.\S+$/.test(email) || phone.length !== 10) {
    return { ok: false, error: 'Please enter a valid name, email and 10-digit mobile number.' }
  }
  if (!course || !factor || !method) {
    return { ok: false, error: 'Invalid program, plan or payment method.' }
  }

  // Amounts are recomputed on the server so the client can't change the price.
  const amountDue = Math.round(course.fee * factor)
  const gst = Math.round(amountDue * GST)
  const total = amountDue + gst
  const receiptNo = `PA${Date.now().toString().slice(-6)}${randomInt(100, 999)}`

  await db.insert(enrollments).values({
    receiptNo,
    studentName: name,
    email,
    phone,
    courseId: course.id,
    courseName: course.name,
    plan: input.planId,
    paymentMethod: method,
    amountDue,
    gst,
    total,
  })

  return { ok: true, receiptNo, total }
}
