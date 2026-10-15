'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { GraduationCap, Menu, X } from 'lucide-react'
import { navLinks } from '@/lib/data'
import { cn } from '@/lib/utils'

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-300',
        scrolled || open ? 'border-b bg-background/90 shadow-sm backdrop-blur-md' : 'bg-transparent',
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
          <span className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <GraduationCap className="size-5" aria-hidden="true" />
          </span>
          <span className="flex flex-col leading-none">
            <span className="font-serif text-lg font-semibold">Pinnacle Academy</span>
            <span className="text-[11px] tracking-widest text-muted-foreground uppercase">Agra</span>
          </span>
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group relative rounded-md px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
            >
              {link.label}
              <span className="absolute inset-x-3 bottom-1 h-0.5 origin-left scale-x-0 rounded bg-accent transition-transform duration-300 group-hover:scale-x-100" />
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/payment"
            className="hidden rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:-translate-y-0.5 hover:shadow-lg sm:inline-flex"
          >
            Pay Fees
          </Link>
          <button
            type="button"
            className="inline-flex size-10 items-center justify-center rounded-md md:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      <div
        className={cn(
          'grid overflow-hidden transition-all duration-300 md:hidden',
          open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0',
        )}
      >
        <nav aria-label="Mobile" className="min-h-0">
          <ul className="flex flex-col gap-1 px-4 pb-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} onClick={() => setOpen(false)} className="block rounded-md px-3 py-2.5 font-medium hover:bg-muted">
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/payment"
                onClick={() => setOpen(false)}
                className="mt-2 block rounded-full bg-primary px-4 py-3 text-center font-semibold text-primary-foreground"
              >
                Pay Fees
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
