import Link from 'next/link'
import { GraduationCap, Mail, MapPin, Phone } from 'lucide-react'
import { navLinks } from '@/lib/data'

export function SiteFooter() {
  return (
    <footer id="contact" className="bg-primary text-primary-foreground">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 md:grid-cols-4 md:px-6">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2">
            <span className="flex size-9 items-center justify-center rounded-lg bg-accent text-accent-foreground">
              <GraduationCap className="size-5" aria-hidden="true" />
            </span>
            <span className="font-serif text-xl font-semibold">Pinnacle Academy</span>
          </div>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-primary-foreground/70">
            Shaping engineers, doctors and achievers in Agra since 2009. Expert faculty, honest guidance and results that speak for
            themselves.
          </p>
        </div>
        <div>
          <h2 className="text-sm font-semibold tracking-wider uppercase">Explore</h2>
          <ul className="mt-4 space-y-2 text-sm text-primary-foreground/70">
            {navLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="transition-colors hover:text-accent">
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/payment" className="transition-colors hover:text-accent">
                Fee Payment
              </Link>
            </li>
          </ul>
        </div>
        <address className="not-italic">
          <h2 className="text-sm font-semibold tracking-wider uppercase">Visit us</h2>
          <ul className="mt-4 space-y-3 text-sm text-primary-foreground/70">
            <li className="flex gap-2">
              <MapPin className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden="true" />
              2nd Floor, Sanjay Place, Agra, Uttar Pradesh 282002
            </li>
            <li className="flex gap-2">
              <Phone className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden="true" />
              <a href="tel:+915622000000" className="hover:text-accent">+91 562 200 0000</a>
            </li>
            <li className="flex gap-2">
              <Mail className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden="true" />
              <a href="mailto:admissions@pinnacleagra.in" className="hover:text-accent">admissions@pinnacleagra.in</a>
            </li>
          </ul>
        </address>
      </div>
      <div className="border-t border-primary-foreground/10">
        <p className="mx-auto max-w-6xl px-4 py-5 text-xs text-primary-foreground/60 md:px-6">
          {'© 2026 Pinnacle Academy, Agra. All rights reserved.'}
        </p>
      </div>
    </footer>
  )
}
