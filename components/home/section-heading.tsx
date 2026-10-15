import { Reveal } from '@/components/reveal'

export function SectionHeading({ eyebrow, title, description }: { eyebrow: string; title: string; description?: string }) {
  return (
    <Reveal className="mx-auto max-w-2xl text-center">
      <p className="text-sm font-semibold tracking-widest text-accent-foreground/70 uppercase">
        <span className="rounded-full bg-accent/30 px-3 py-1">{eyebrow}</span>
      </p>
      <h2 className="mt-4 font-serif text-3xl font-semibold text-balance md:text-5xl">{title}</h2>
      {description && <p className="mt-4 leading-relaxed text-pretty text-muted-foreground">{description}</p>}
    </Reveal>
  )
}
