import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Award, Star } from 'lucide-react'
import { Counter } from '@/components/counter'

const stats = [
  { value: 17, suffix: '+', label: 'Years in Agra' },
  { value: 12000, suffix: '+', label: 'Students mentored' },
  { value: 210, suffix: '', label: 'IIT & NIT selections' },
  { value: 94, suffix: '', label: 'Govt. MBBS seats' },
]

const marquee = ['JEE Advanced', 'JEE Main', 'NEET-UG', 'CBSE Boards', 'UP Board', 'NTSE', 'Olympiads', 'KVPY']

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-28 pb-16 md:pt-36">
      <div aria-hidden="true" className="absolute -top-32 -right-32 size-[28rem] rounded-full bg-accent/20 blur-3xl" />
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 md:grid-cols-2 md:px-6">
        <div className="animate-in fade-in slide-in-from-bottom-6 duration-700">
          <span className="inline-flex items-center gap-2 rounded-full border bg-card px-3 py-1 text-xs font-medium">
            <span className="size-2 animate-pulse rounded-full bg-accent" />
            Admissions open for 2027 batches
          </span>
          <h1 className="mt-5 font-serif text-4xl leading-tight font-semibold text-balance md:text-6xl">
            {"Agra's home for "}
            <span className="relative whitespace-nowrap">
              <span className="relative z-10">top rankers</span>
              <span aria-hidden="true" className="absolute inset-x-0 bottom-1 z-0 h-3 rounded bg-accent/60 md:h-4" />
            </span>
          </h1>
          <p className="mt-5 max-w-lg text-lg leading-relaxed text-pretty text-muted-foreground">
            Focused coaching for JEE, NEET and school boards with IIT and AIIMS-trained faculty, small batches and a mentor who
            knows your name.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/#courses"
              className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground transition-all hover:-translate-y-0.5 hover:shadow-xl"
            >
              Explore courses
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </Link>
            <Link
              href="/#results"
              className="inline-flex items-center gap-2 rounded-full border bg-card px-6 py-3 font-semibold transition-all hover:-translate-y-0.5 hover:border-primary"
            >
              View 2026 results
            </Link>
          </div>
        </div>

        <div className="relative animate-in fade-in zoom-in-95 duration-1000">
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-2xl">
            <Image
              src="/images/hero.png"
              alt="Students attending a physics class at Pinnacle Academy"
              fill
              priority
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="absolute -bottom-6 -left-4 flex animate-float items-center gap-3 rounded-2xl border bg-card p-4 shadow-xl md:-left-8">
            <span className="flex size-11 items-center justify-center rounded-xl bg-accent">
              <Award className="size-5 text-accent-foreground" aria-hidden="true" />
            </span>
            <div>
              <p className="text-sm font-semibold">AIR 312 in JEE Adv.</p>
              <p className="text-xs text-muted-foreground">Our 2026 city topper</p>
            </div>
          </div>
          <div className="absolute -top-4 -right-2 flex animate-float items-center gap-1.5 rounded-full border bg-card px-4 py-2 shadow-lg [animation-delay:1.5s]">
            <Star className="size-4 fill-accent text-accent" aria-hidden="true" />
            <span className="text-sm font-semibold">4.9</span>
            <span className="text-xs text-muted-foreground">from 1,200+ reviews</span>
          </div>
        </div>
      </div>

      <dl className="mx-auto mt-20 grid max-w-6xl grid-cols-2 gap-6 px-4 md:grid-cols-4 md:px-6">
        {stats.map((s) => (
          <div key={s.label} className="rounded-2xl border bg-card p-5 transition-shadow hover:shadow-md">
            <dt className="text-sm text-muted-foreground">{s.label}</dt>
            <dd className="mt-1 font-serif text-3xl font-semibold text-primary md:text-4xl">
              <Counter value={s.value} suffix={s.suffix} />
            </dd>
          </div>
        ))}
      </dl>

      <div className="mt-14 overflow-hidden border-y bg-secondary py-4" aria-hidden="true">
        <div className="flex w-max animate-marquee gap-10">
          {[...marquee, ...marquee].map((item, i) => (
            <span key={i} className="flex items-center gap-10 text-sm font-semibold tracking-widest text-primary/70 uppercase">
              {item}
              <span className="size-1.5 rounded-full bg-accent" />
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
