'use client'

import { useState } from 'react'
import { Trophy } from 'lucide-react'
import { results, type ResultCategory } from '@/lib/data'
import { Counter } from '@/components/counter'
import { Reveal } from '@/components/reveal'
import { SectionHeading } from './section-heading'
import { cn } from '@/lib/utils'

const tabs: ResultCategory[] = ['JEE', 'NEET', 'Boards']

export function Results() {
  const [active, setActive] = useState<ResultCategory>('JEE')
  const data = results[active]

  return (
    <section id="results" className="scroll-mt-20 bg-secondary py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <SectionHeading
          eyebrow="Test Results 2026"
          title="Numbers our students earned"
          description="Verified results from our 2026 batches. Every rank is backed by hours of practice, testing and mentorship."
        />

        <Reveal className="mt-10 flex justify-center">
          <div role="tablist" aria-label="Result category" className="inline-flex rounded-full border bg-card p-1">
            {tabs.map((t) => (
              <button
                key={t}
                role="tab"
                type="button"
                aria-selected={active === t}
                aria-controls="results-panel"
                onClick={() => setActive(t)}
                className={cn(
                  'rounded-full px-5 py-2 text-sm font-semibold transition-all duration-300',
                  active === t ? 'bg-primary text-primary-foreground shadow' : 'text-muted-foreground hover:text-foreground',
                )}
              >
                {t}
              </button>
            ))}
          </div>
        </Reveal>

        <div
          id="results-panel"
          role="tabpanel"
          key={active}
          className="mt-10 grid animate-in gap-6 fade-in slide-in-from-bottom-4 duration-500 lg:grid-cols-5"
        >
          <dl className="grid gap-4 sm:grid-cols-3 lg:col-span-2 lg:grid-cols-1">
            {data.stats.map((s) => (
              <div key={s.label} className="rounded-2xl bg-primary p-6 text-primary-foreground">
                <dd className="font-serif text-4xl font-semibold text-accent">
                  <Counter value={s.value} suffix={s.suffix} duration={1000} />
                </dd>
                <dt className="mt-1 text-sm text-primary-foreground/75">{s.label}</dt>
              </div>
            ))}
          </dl>

          <div className="rounded-2xl border bg-card p-6 lg:col-span-3">
            <div className="flex items-center gap-2">
              <Trophy className="size-5 text-accent" aria-hidden="true" />
              <h3 className="font-serif text-xl font-semibold">{active} toppers</h3>
            </div>
            <ol className="mt-5 divide-y">
              {data.toppers.map((t, i) => (
                <li
                  key={t.name}
                  style={{ animationDelay: `${i * 90}ms` }}
                  className="flex animate-in items-center gap-4 py-4 fade-in slide-in-from-left-4 fill-mode-both duration-500"
                >
                  <span
                    className={cn(
                      'flex size-10 shrink-0 items-center justify-center rounded-full font-semibold',
                      i === 0 ? 'bg-accent text-accent-foreground' : 'bg-muted text-muted-foreground',
                    )}
                  >
                    {i + 1}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold">{t.name}</p>
                    <p className="text-sm text-muted-foreground">{t.detail}</p>
                  </div>
                  <span className="font-serif text-lg font-semibold text-primary">{t.score}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  )
}
