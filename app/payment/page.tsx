import type { Metadata } from 'next'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { Checkout } from '@/components/payment/checkout'
import { courses } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Fee Payment | Pinnacle Academy Agra',
  description: 'Securely pay your course fees online for Pinnacle Academy, Agra.',
}

export default async function PaymentPage({ searchParams }: { searchParams: Promise<{ course?: string }> }) {
  const { course } = await searchParams
  const initialCourse = courses.some((c) => c.id === course) ? course! : courses[0].id

  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-secondary pt-28 pb-20">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            <h1 className="font-serif text-3xl font-semibold md:text-5xl">Enroll & pay fees</h1>
            <p className="mt-3 max-w-xl text-muted-foreground">
              Choose your program and payment plan. You will receive a receipt and admission confirmation instantly.
            </p>
          </div>
          <Checkout initialCourse={initialCourse} />
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
