'use server'

import { desc, eq } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'
import { db } from '@/lib/db'
import { reviews } from '@/lib/db/schema'
import type { Review } from '@/lib/data'

const ROLES = [
  'Student, JEE batch',
  'Student, NEET batch',
  'Student, Foundation',
  'Student, Boards batch',
  'Parent',
]

function toReview(row: typeof reviews.$inferSelect): Review {
  return {
    id: String(row.id),
    name: row.name,
    role: row.role,
    rating: row.rating,
    message: row.message,
    date: row.createdAt.toLocaleDateString('en-IN', { month: 'short', year: 'numeric' }),
  }
}

export async function getReviews(): Promise<Review[]> {
  const rows = await db
    .select()
    .from(reviews)
    .where(eq(reviews.approved, true))
    .orderBy(desc(reviews.createdAt))
    .limit(50)
  return rows.map(toReview)
}

export async function createReview(input: {
  name: string
  role: string
  rating: number
  message: string
}): Promise<{ ok: true; review: Review } | { ok: false; error: string }> {
  const name = String(input.name ?? '').trim().slice(0, 60)
  const message = String(input.message ?? '').trim().slice(0, 500)
  const role = ROLES.includes(input.role) ? input.role : 'Parent'
  const rating = Number(input.rating)

  if (name.length < 2 || message.length < 10) {
    return { ok: false, error: 'Please enter your name and a message of at least 10 characters.' }
  }
  if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
    return { ok: false, error: 'Please choose a rating between 1 and 5.' }
  }

  const [row] = await db.insert(reviews).values({ name, role, rating, message }).returning()
  revalidatePath('/')
  return { ok: true, review: toReview(row) }
}
