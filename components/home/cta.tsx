import Link from 'next/link'
import { ArrowRight, Phone } from 'lucide-react'
import { Reveal } from '@/components/reveal'

export function Cta() {
  return (
    <section className="px-4 pb-20 md:px-6 md:pb-28">
      <Reveal className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl bg-accent p-8 md:p-14">
        <div aria-hidden="true" className="absolute -right-16 -bottom-16 size-64 rounded-full bg-primary/10" />
        <div aria-hidden="true" className="absolute -top-10 right-40 size-24 rounded-full bg-primary/10" />
        <div className="relative flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div className="max-w-xl">
            <h2 className="font-serif text-3xl font-semibold text-balance text-accent-foreground md:text-4xl">
              Book a free demo class and scholarship test
            </h2>
            <p className="mt-3 text-accent-foreground/80">
              Get up to 50% fee waiver based on your PASAT score. Seats for 2027 batches are filling fast.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/payment"
              className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground transition-all hover:-translate-y-0.5 hover:shadow-xl"
            >
              Enroll & pay online
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </Link>
            <a
              href="tel:+915622000000"
              className="inline-flex items-center gap-2 rounded-full border border-primary/30 px-6 py-3 font-semibold text-accent-foreground transition-colors hover:bg-primary/10"
            >
              <Phone className="size-4" aria-hidden="true" /> Call us
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
