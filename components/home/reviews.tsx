'use client'

import { useMemo, useState, useTransition } from 'react'
import { CheckCircle2, Loader2, Send, Star } from 'lucide-react'
import type { Review } from '@/lib/data'
import { createReview } from '@/app/actions/reviews'
import { Reveal } from '@/components/reveal'
import { SectionHeading } from './section-heading'
import { cn } from '@/lib/utils'

const inputClass =
  'w-full rounded-lg border bg-background px-3.5 py-2.5 text-sm outline-none transition-shadow focus:border-primary focus:ring-3 focus:ring-primary/15'

function Stars({ value, className }: { value: number; className?: string }) {
  return (
    <span className={cn('flex gap-0.5', className)} aria-label={`${value} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <Star key={n} className={cn('size-4', n <= value ? 'fill-accent text-accent' : 'text-border')} aria-hidden="true" />
      ))}
    </span>
  )
}

export function Reviews({ initialReviews }: { initialReviews: Review[] }) {
  const [reviews, setReviews] = useState<Review[]>(initialReviews)
  const [pending, startTransition] = useTransition()
  const [rating, setRating] = useState(5)
  const [hover, setHover] = useState(0)
  const [filter, setFilter] = useState<number | null>(null)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const average = useMemo(
    () => (reviews.length ? reviews.reduce((s, r) => s + r.rating, 0) / reviews.length : 0),
    [reviews],
  )
  const distribution = useMemo(
    () => [5, 4, 3, 2, 1].map((n) => ({ n, count: reviews.filter((r) => r.rating === n).length })),
    [reviews],
  )
  const visible = filter ? reviews.filter((r) => r.rating === filter) : reviews

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    const name = String(form.get('name') ?? '').trim()
    const role = String(form.get('role') ?? '')
    const message = String(form.get('message') ?? '').trim()
    if (name.length < 2 || message.length < 10) {
      setError('Please enter your name and a message of at least 10 characters.')
      return
    }
    setError('')
    const formEl = e.currentTarget
    startTransition(async () => {
      try {
        const result = await createReview({ name, role, rating, message })
        if (!result.ok) {
          setError(result.error)
          return
        }
        setReviews((prev) => [result.review, ...prev])
        setFilter(null)
        setSubmitted(true)
        formEl.reset()
        setRating(5)
        setTimeout(() => setSubmitted(false), 4000)
      } catch {
        setError('Could not save your review. Please try again.')
      }
    })
  }

  return (
    <section id="reviews" className="scroll-mt-20 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <SectionHeading
          eyebrow="Feedback & Reviews"
          title="What students and parents say"
          description="Honest words from our community. Studied with us? We'd love to hear your experience."
        />

        <div className="mt-14 grid gap-8 lg:grid-cols-3">
          <div className="flex flex-col gap-6">
            <Reveal className="rounded-2xl bg-primary p-6 text-primary-foreground">
              <p className="font-serif text-5xl font-semibold">{average.toFixed(1)}</p>
              <Stars value={Math.round(average)} className="mt-2" />
              <p className="mt-2 text-sm text-primary-foreground/70">Based on {reviews.length} reviews shown here</p>
              <ul className="mt-5 space-y-2">
                {distribution.map(({ n, count }) => (
                  <li key={n}>
                    <button
                      type="button"
                      onClick={() => setFilter(filter === n ? null : n)}
                      aria-pressed={filter === n}
                      className={cn(
                        'flex w-full items-center gap-3 rounded-md px-1 py-0.5 text-sm transition-colors hover:bg-primary-foreground/10',
                        filter === n && 'bg-primary-foreground/15',
                      )}
                    >
                      <span className="w-3">{n}</span>
                      <span className="h-2 flex-1 overflow-hidden rounded-full bg-primary-foreground/15">
                        <span
                          className="block h-full rounded-full bg-accent transition-all duration-700"
                          style={{ width: `${reviews.length ? (count / reviews.length) * 100 : 0}%` }}
                        />
                      </span>
                      <span className="w-5 text-right text-primary-foreground/70">{count}</span>
                    </button>
                  </li>
                ))}
              </ul>
              {filter && (
                <button type="button" onClick={() => setFilter(null)} className="mt-3 text-xs text-accent underline-offset-4 hover:underline">
                  Clear filter
                </button>
              )}
            </Reveal>

            <Reveal delay={100}>
              <form onSubmit={handleSubmit} className="rounded-2xl border bg-card p-6" noValidate>
                <h3 className="font-serif text-xl font-semibold">Share your feedback</h3>
                <div className="mt-4 space-y-4">
                  <div>
                    <label htmlFor="rv-name" className="mb-1.5 block text-sm font-medium">Your name</label>
                    <input id="rv-name" name="name" required maxLength={60} className={inputClass} placeholder="e.g. Neha Gupta" />
                  </div>
                  <div>
                    <label htmlFor="rv-role" className="mb-1.5 block text-sm font-medium">You are a</label>
                    <select id="rv-role" name="role" className={inputClass}>
                      <option>Student, JEE batch</option>
                      <option>Student, NEET batch</option>
                      <option>Student, Foundation</option>
                      <option>Student, Boards batch</option>
                      <option>Parent</option>
                    </select>
                  </div>
                  <fieldset>
                    <legend className="mb-1.5 text-sm font-medium">Rating</legend>
                    <div className="flex gap-1" onMouseLeave={() => setHover(0)}>
                      {[1, 2, 3, 4, 5].map((n) => (
                        <button
                          key={n}
                          type="button"
                          onClick={() => setRating(n)}
                          onMouseEnter={() => setHover(n)}
                          aria-label={`${n} star${n > 1 ? 's' : ''}`}
                          aria-pressed={rating === n}
                          className="rounded p-0.5 transition-transform hover:scale-125"
                        >
                          <Star className={cn('size-6 transition-colors', n <= (hover || rating) ? 'fill-accent text-accent' : 'text-border')} />
                        </button>
                      ))}
                    </div>
                  </fieldset>
                  <div>
                    <label htmlFor="rv-msg" className="mb-1.5 block text-sm font-medium">Your review</label>
                    <textarea id="rv-msg" name="message" rows={4} maxLength={500} required className={inputClass} placeholder="Tell us about your experience..." />
                  </div>
                  {error && <p role="alert" className="text-sm text-destructive">{error}</p>}
                  <button
                    type="submit"
                    disabled={pending}
                    className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-all hover:shadow-lg disabled:opacity-80"
                  >
                    {pending ? (
                      <>
                        Saving... <Loader2 className="size-4 animate-spin" aria-hidden="true" />
                      </>
                    ) : (
                      <>
                        Submit review
                        <Send className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                      </>
                    )}
                  </button>
                  {submitted && (
                    <p role="status" className="flex animate-in items-center gap-2 text-sm font-medium text-primary fade-in slide-in-from-bottom-2">
                      <CheckCircle2 className="size-4" aria-hidden="true" /> Thank you! Your review has been added.
                    </p>
                  )}
                </div>
              </form>
            </Reveal>
          </div>

          <ul className="grid content-start gap-5 sm:grid-cols-2 lg:col-span-2">
            {visible.map((r, i) => (
              <li
                key={r.id}
                style={{ animationDelay: `${Math.min(i, 6) * 70}ms` }}
                className="flex animate-in flex-col rounded-2xl border bg-card p-6 fade-in slide-in-from-bottom-4 fill-mode-both duration-500 transition-shadow hover:shadow-lg"
              >
                <div className="flex items-center justify-between">
                  <Stars value={r.rating} />
                  <span className="text-xs text-muted-foreground">{r.date}</span>
                </div>
                <p className="mt-4 flex-1 leading-relaxed text-pretty">{r.message}</p>
                <div className="mt-5 flex items-center gap-3 border-t pt-4">
                  <span className="flex size-10 items-center justify-center rounded-full bg-secondary font-semibold text-primary">
                    {r.name
                      .split(' ')
                      .map((p) => p[0])
                      .join('')
                      .slice(0, 2)
                      .toUpperCase()}
                  </span>
                  <div>
                    <p className="text-sm font-semibold">{r.name}</p>
                    <p className="text-xs text-muted-foreground">{r.role}</p>
                  </div>
                </div>
              </li>
            ))}
            {visible.length === 0 && (
              <li className="rounded-2xl border border-dashed p-10 text-center text-muted-foreground sm:col-span-2">
                No reviews with this rating yet.
              </li>
            )}
          </ul>
        </div>
      </div>
    </section>
  )
}
