import Link from 'next/link'
import { ArrowUpRight, Check, Clock } from 'lucide-react'
import { courses, formatINR } from '@/lib/data'
import { Reveal } from '@/components/reveal'
import { SectionHeading } from './section-heading'
import { cn } from '@/lib/utils'

export function Courses() {
  return (
    <section id="courses" className="scroll-mt-20 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <SectionHeading
          eyebrow="Programs"
          title="Courses built around how you learn"
          description="Every program combines live classes, weekly testing and one-on-one mentoring so no student falls behind."
        />
        <ul className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {courses.map((c, i) => (
            <Reveal as="li" key={c.id} delay={i * 100}>
              <article
                className={cn(
                  'group flex h-full flex-col rounded-2xl border p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl',
                  c.popular ? 'border-primary bg-primary text-primary-foreground' : 'bg-card',
                )}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={cn(
                      'inline-flex items-center gap-1 text-xs',
                      c.popular ? 'text-primary-foreground/70' : 'text-muted-foreground',
                    )}
                  >
                    <Clock className="size-3.5" aria-hidden="true" />
                    {c.duration}
                  </span>
                  {c.popular && (
                    <span className="rounded-full bg-accent px-2.5 py-0.5 text-xs font-semibold text-accent-foreground">Most popular</span>
                  )}
                </div>
                <h3 className="mt-4 font-serif text-xl font-semibold">{c.name}</h3>
                <p className={cn('mt-2 text-sm leading-relaxed', c.popular ? 'text-primary-foreground/75' : 'text-muted-foreground')}>
                  {c.tagline}
                </p>
                <ul className="mt-5 flex-1 space-y-2.5 text-sm">
                  {c.features.map((f) => (
                    <li key={f} className="flex gap-2">
                      <Check className={cn('mt-0.5 size-4 shrink-0', c.popular ? 'text-accent' : 'text-primary')} aria-hidden="true" />
                      {f}
                    </li>
                  ))}
                </ul>
                <div className={cn('mt-6 border-t pt-5', c.popular ? 'border-primary-foreground/15' : '')}>
                  <p className="text-2xl font-semibold">
                    {formatINR(c.fee)}
                    <span className={cn('ml-1 text-xs font-normal', c.popular ? 'text-primary-foreground/60' : 'text-muted-foreground')}>
                      /program
                    </span>
                  </p>
                  <Link
                    href={`/payment?course=${c.id}`}
                    className={cn(
                      'mt-4 inline-flex w-full items-center justify-center gap-1.5 rounded-full px-4 py-2.5 text-sm font-semibold transition-colors',
                      c.popular ? 'bg-accent text-accent-foreground hover:bg-accent/90' : 'bg-primary text-primary-foreground hover:bg-primary/90',
                    )}
                  >
                    Enroll now
                    <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
                  </Link>
                </div>
              </article>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
