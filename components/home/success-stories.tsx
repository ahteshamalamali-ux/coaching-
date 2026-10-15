'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react'
import { stories } from '@/lib/data'
import { Reveal } from '@/components/reveal'
import { SectionHeading } from './section-heading'
import { cn } from '@/lib/utils'

export function SuccessStories() {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const story = stories[index]

  useEffect(() => {
    if (paused) return
    const id = setInterval(() => setIndex((i) => (i + 1) % stories.length), 6000)
    return () => clearInterval(id)
  }, [paused])

  const go = (dir: number) => setIndex((i) => (i + dir + stories.length) % stories.length)

  return (
    <section id="stories" className="scroll-mt-20 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <SectionHeading eyebrow="Success Stories" title="From our classrooms to India's best campuses" />

        <Reveal className="mt-14">
          <div
            className="grid items-center gap-8 rounded-3xl border bg-card p-6 md:grid-cols-5 md:p-10"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            aria-roledescription="carousel"
            aria-label="Student success stories"
          >
            <div key={`img-${index}`} className="relative aspect-square animate-in overflow-hidden rounded-2xl fade-in zoom-in-95 duration-700 md:col-span-2">
              <Image src={story.image} alt={`Portrait of ${story.name}`} fill sizes="(min-width: 768px) 40vw, 100vw" className="object-cover" />
              <div className="absolute inset-x-3 bottom-3 rounded-xl bg-background/90 p-3 backdrop-blur">
                <p className="text-xs text-muted-foreground">Now at</p>
                <p className="text-sm font-semibold">{story.college}</p>
              </div>
            </div>

            <div key={`txt-${index}`} className="animate-in fade-in slide-in-from-right-6 duration-700 md:col-span-3" aria-live="polite">
              <Quote className="size-10 text-accent" aria-hidden="true" />
              <blockquote className="mt-4 font-serif text-xl leading-relaxed text-pretty md:text-2xl">{story.quote}</blockquote>
              <div className="mt-6">
                <p className="text-lg font-semibold">{story.name}</p>
                <p className="text-sm font-medium text-primary">{story.result}</p>
              </div>

              <div className="mt-8 flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => go(-1)}
                  aria-label="Previous story"
                  className="flex size-11 items-center justify-center rounded-full border transition-colors hover:bg-primary hover:text-primary-foreground"
                >
                  <ChevronLeft className="size-5" />
                </button>
                <button
                  type="button"
                  onClick={() => go(1)}
                  aria-label="Next story"
                  className="flex size-11 items-center justify-center rounded-full border transition-colors hover:bg-primary hover:text-primary-foreground"
                >
                  <ChevronRight className="size-5" />
                </button>
                <div className="ml-2 flex gap-2">
                  {stories.map((s, i) => (
                    <button
                      key={s.name}
                      type="button"
                      onClick={() => setIndex(i)}
                      aria-label={`Show story ${i + 1}`}
                      aria-current={i === index}
                      className={cn('h-2 rounded-full transition-all duration-500', i === index ? 'w-8 bg-primary' : 'w-2 bg-border')}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
