import Image from 'next/image'
import { faculty } from '@/lib/data'
import { Reveal } from '@/components/reveal'
import { SectionHeading } from './section-heading'

export function Faculty() {
  return (
    <section id="faculty" className="scroll-mt-20 bg-secondary py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <SectionHeading
          eyebrow="Our Faculty"
          title="Taught by people who've been there"
          description="Our teachers come from IITs, AIIMS and top universities, with an average of 17 years of classroom experience."
        />
        <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {faculty.map((f, i) => (
            <Reveal as="li" key={f.name} delay={i * 120}>
              <article className="group overflow-hidden rounded-2xl border bg-card">
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image
                    src={f.image}
                    alt={`Portrait of ${f.name}`}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 flex items-end bg-gradient-to-t from-primary/90 via-primary/10 to-transparent p-4 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                    <p className="translate-y-4 text-sm text-primary-foreground transition-transform duration-500 group-hover:translate-y-0">
                      {f.creds}
                    </p>
                  </div>
                  <span className="absolute top-3 left-3 rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground">
                    {f.subject}
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="font-serif text-lg font-semibold">{f.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {f.exp} experience · {f.creds}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
