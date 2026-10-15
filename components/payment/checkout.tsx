'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Building2, Check, CheckCircle2, CreditCard, Loader2, Lock, ShieldCheck, Smartphone } from 'lucide-react'
import { courses, formatINR } from '@/lib/data'
import { cn } from '@/lib/utils'
import { createEnrollment } from '@/app/actions/enrollments'

const plans = [
  { id: 'full', label: 'Pay in full', note: 'Save 5% instantly', factor: 0.95 },
  { id: 'two', label: '2 installments', note: 'First installment now', factor: 0.5 },
  { id: 'four', label: '4 installments', note: 'First installment now', factor: 0.25 },
] as const

const methods = [
  { id: 'upi', label: 'UPI', icon: Smartphone },
  { id: 'card', label: 'Card', icon: CreditCard },
  { id: 'netbanking', label: 'Net Banking', icon: Building2 },
] as const

type Method = (typeof methods)[number]['id']
type PlanId = (typeof plans)[number]['id']

const inputClass =
  'w-full rounded-lg border bg-background px-3.5 py-2.5 text-sm outline-none transition-shadow focus:border-primary focus:ring-3 focus:ring-primary/15'

const GST = 0.18

export function Checkout({ initialCourse }: { initialCourse: string }) {
  const [courseId, setCourseId] = useState(initialCourse)
  const [planId, setPlanId] = useState<PlanId>('full')
  const [method, setMethod] = useState<Method>('upi')
  const [status, setStatus] = useState<'idle' | 'processing' | 'success'>('idle')
  const [error, setError] = useState('')
  const [receipt, setReceipt] = useState({ id: '', name: '', email: '' })

  const course = courses.find((c) => c.id === courseId) ?? courses[0]
  const plan = plans.find((p) => p.id === planId)!
  const base = Math.round(course.fee * plan.factor)
  const tax = Math.round(base * GST)
  const total = base + tax

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    const name = String(form.get('name') ?? '').trim()
    const email = String(form.get('email') ?? '').trim()
    const phone = String(form.get('phone') ?? '').replace(/\D/g, '')
    if (name.length < 2 || !/^\S+@\S+\.\S+$/.test(email) || phone.length !== 10) {
      setError('Please enter a valid name, email and 10-digit mobile number.')
      return
    }
    if (method === 'upi' && !/^[\w.-]+@[\w]+$/.test(String(form.get('upi') ?? ''))) {
      setError('Please enter a valid UPI ID, e.g. name@okaxis.')
      return
    }
    if (method === 'card' && String(form.get('card') ?? '').replace(/\s/g, '').length < 15) {
      setError('Please enter a valid card number.')
      return
    }
    setError('')
    setStatus('processing')
    createEnrollment({ name, email, phone, courseId, planId, method })
      .then((result) => {
        if (!result.ok) {
          setError(result.error)
          setStatus('idle')
          return
        }
        setReceipt({ id: result.receiptNo, name, email })
        setStatus('success')
        window.scrollTo({ top: 0, behavior: 'smooth' })
      })
      .catch(() => {
        setError('Something went wrong while saving your enrollment. Please try again.')
        setStatus('idle')
      })
  }

  if (status === 'success') {
    return (
      <div className="mx-auto mt-10 max-w-lg animate-in rounded-3xl border bg-card p-8 text-center shadow-xl fade-in zoom-in-95 duration-500">
        <span className="mx-auto flex size-16 animate-in items-center justify-center rounded-full bg-accent zoom-in-50 duration-700">
          <CheckCircle2 className="size-8 text-accent-foreground" aria-hidden="true" />
        </span>
        <h2 className="mt-5 font-serif text-2xl font-semibold">Payment successful</h2>
        <p className="mt-2 text-muted-foreground">
          Welcome to Pinnacle Academy, {receipt.name}! A receipt has been sent to {receipt.email}.
        </p>
        <dl className="mt-6 space-y-2 rounded-xl bg-secondary p-4 text-left text-sm">
          <div className="flex justify-between"><dt className="text-muted-foreground">Receipt no.</dt><dd className="font-mono font-medium">{receipt.id}</dd></div>
          <div className="flex justify-between"><dt className="text-muted-foreground">Program</dt><dd className="font-medium">{course.name}</dd></div>
          <div className="flex justify-between"><dt className="text-muted-foreground">Plan</dt><dd className="font-medium">{plan.label}</dd></div>
          <div className="flex justify-between border-t pt-2"><dt className="font-semibold">Amount paid</dt><dd className="font-semibold">{formatINR(total)}</dd></div>
        </dl>
        <Link href="/" className="mt-6 inline-flex rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all hover:shadow-lg">
          Back to home
        </Link>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="mt-10 grid gap-8 lg:grid-cols-3">
      <div className="flex flex-col gap-6 lg:col-span-2">
        <fieldset className="animate-in rounded-2xl border bg-card p-6 fade-in slide-in-from-bottom-4 fill-mode-both duration-500 [animation-delay:100ms]">
          <legend className="sr-only">Select program</legend>
          <h2 className="flex items-center gap-2 font-serif text-xl font-semibold">
            <span className="flex size-7 items-center justify-center rounded-full bg-primary text-sm text-primary-foreground">1</span>
            Select program
          </h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {courses.map((c) => (
              <label
                key={c.id}
                className={cn(
                  'relative cursor-pointer rounded-xl border p-4 transition-all duration-300 hover:border-primary/50',
                  courseId === c.id && 'border-primary bg-primary/5 ring-2 ring-primary/20',
                )}
              >
                <input type="radio" name="course" value={c.id} checked={courseId === c.id} onChange={() => setCourseId(c.id)} className="sr-only" />
                <span className="block pr-6 font-semibold">{c.name}</span>
                <span className="mt-1 block text-sm text-muted-foreground">{formatINR(c.fee)} · {c.duration}</span>
                <span
                  className={cn(
                    'absolute top-4 right-4 flex size-5 items-center justify-center rounded-full border transition-all',
                    courseId === c.id ? 'scale-100 border-primary bg-primary text-primary-foreground' : 'scale-90',
                  )}
                >
                  {courseId === c.id && <Check className="size-3" aria-hidden="true" />}
                </span>
              </label>
            ))}
          </div>

          <h3 className="mt-6 text-sm font-semibold">Payment plan</h3>
          <div className="mt-3 grid gap-3 sm:grid-cols-3">
            {plans.map((p) => (
              <label
                key={p.id}
                className={cn(
                  'cursor-pointer rounded-xl border p-3 transition-all duration-300 hover:border-primary/50',
                  planId === p.id && 'border-primary bg-primary/5 ring-2 ring-primary/20',
                )}
              >
                <input type="radio" name="plan" value={p.id} checked={planId === p.id} onChange={() => setPlanId(p.id)} className="sr-only" />
                <span className="block text-sm font-semibold">{p.label}</span>
                <span className="block text-xs text-muted-foreground">{p.note}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset className="animate-in rounded-2xl border bg-card p-6 fade-in slide-in-from-bottom-4 fill-mode-both duration-500 [animation-delay:200ms]">
          <legend className="sr-only">Student details</legend>
          <h2 className="flex items-center gap-2 font-serif text-xl font-semibold">
            <span className="flex size-7 items-center justify-center rounded-full bg-primary text-sm text-primary-foreground">2</span>
            Student details
          </h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label htmlFor="name" className="mb-1.5 block text-sm font-medium">Student name</label>
              <input id="name" name="name" autoComplete="name" required className={inputClass} placeholder="Full name" />
            </div>
            <div>
              <label htmlFor="email" className="mb-1.5 block text-sm font-medium">Email</label>
              <input id="email" name="email" type="email" autoComplete="email" required className={inputClass} placeholder="you@example.com" />
            </div>
            <div>
              <label htmlFor="phone" className="mb-1.5 block text-sm font-medium">Mobile number</label>
              <input id="phone" name="phone" type="tel" inputMode="numeric" autoComplete="tel-national" maxLength={10} required className={inputClass} placeholder="10-digit number" />
            </div>
          </div>
        </fieldset>

        <fieldset className="animate-in rounded-2xl border bg-card p-6 fade-in slide-in-from-bottom-4 fill-mode-both duration-500 [animation-delay:300ms]">
          <legend className="sr-only">Payment method</legend>
          <h2 className="flex items-center gap-2 font-serif text-xl font-semibold">
            <span className="flex size-7 items-center justify-center rounded-full bg-primary text-sm text-primary-foreground">3</span>
            Payment method
          </h2>
          <div role="tablist" aria-label="Payment method" className="mt-5 grid grid-cols-3 gap-2 rounded-xl bg-secondary p-1">
            {methods.map((m) => (
              <button
                key={m.id}
                type="button"
                role="tab"
                aria-selected={method === m.id}
                onClick={() => setMethod(m.id)}
                className={cn(
                  'flex items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-medium transition-all duration-300',
                  method === m.id ? 'bg-card shadow' : 'text-muted-foreground hover:text-foreground',
                )}
              >
                <m.icon className="size-4" aria-hidden="true" />
                {m.label}
              </button>
            ))}
          </div>

          <div key={method} role="tabpanel" className="mt-5 animate-in fade-in slide-in-from-right-4 duration-300">
            {method === 'upi' && (
              <div>
                <label htmlFor="upi" className="mb-1.5 block text-sm font-medium">UPI ID</label>
                <input id="upi" name="upi" className={inputClass} placeholder="yourname@okaxis" />
                <p className="mt-2 text-xs text-muted-foreground">Works with Google Pay, PhonePe, Paytm and BHIM.</p>
              </div>
            )}
            {method === 'card' && (
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label htmlFor="card" className="mb-1.5 block text-sm font-medium">Card number</label>
                  <input
                    id="card"
                    name="card"
                    inputMode="numeric"
                    autoComplete="cc-number"
                    maxLength={19}
                    className={inputClass}
                    placeholder="1234 5678 9012 3456"
                    onChange={(e) => {
                      e.target.value = e.target.value.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim()
                    }}
                  />
                </div>
                <div>
                  <label htmlFor="exp" className="mb-1.5 block text-sm font-medium">Expiry</label>
                  <input id="exp" name="exp" autoComplete="cc-exp" maxLength={5} className={inputClass} placeholder="MM/YY" />
                </div>
                <div>
                  <label htmlFor="cvv" className="mb-1.5 block text-sm font-medium">CVV</label>
                  <input id="cvv" name="cvv" type="password" inputMode="numeric" autoComplete="cc-csc" maxLength={4} className={inputClass} placeholder="•••" />
                </div>
              </div>
            )}
            {method === 'netbanking' && (
              <div>
                <label htmlFor="bank" className="mb-1.5 block text-sm font-medium">Select your bank</label>
                <select id="bank" name="bank" className={inputClass}>
                  <option>State Bank of India</option>
                  <option>HDFC Bank</option>
                  <option>ICICI Bank</option>
                  <option>Punjab National Bank</option>
                  <option>Axis Bank</option>
                  <option>Bank of Baroda</option>
                </select>
              </div>
            )}
          </div>
        </fieldset>
      </div>

      <aside className="animate-in fade-in slide-in-from-right-6 fill-mode-both duration-700 [animation-delay:200ms] lg:sticky lg:top-24 lg:self-start">
        <div className="rounded-2xl bg-primary p-6 text-primary-foreground shadow-xl">
          <h2 className="font-serif text-xl font-semibold">Order summary</h2>
          <div key={`${courseId}-${planId}`} className="animate-in fade-in duration-300">
            <p className="mt-4 font-semibold">{course.name}</p>
            <p className="text-sm text-primary-foreground/70">{plan.label}</p>
            <dl className="mt-5 space-y-2 border-t border-primary-foreground/15 pt-4 text-sm">
              <div className="flex justify-between"><dt className="text-primary-foreground/70">Program fee</dt><dd>{formatINR(course.fee)}</dd></div>
              <div className="flex justify-between"><dt className="text-primary-foreground/70">Due now</dt><dd>{formatINR(base)}</dd></div>
              <div className="flex justify-between"><dt className="text-primary-foreground/70">GST (18%)</dt><dd>{formatINR(tax)}</dd></div>
              <div className="flex justify-between border-t border-primary-foreground/15 pt-3 text-lg font-semibold">
                <dt>Total</dt>
                <dd className="text-accent">{formatINR(total)}</dd>
              </div>
            </dl>
          </div>

          {error && (
            <p role="alert" className="mt-4 animate-in rounded-lg bg-destructive/20 p-3 text-sm fade-in">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={status === 'processing'}
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent px-5 py-3.5 font-semibold text-accent-foreground transition-all hover:-translate-y-0.5 hover:shadow-lg disabled:translate-y-0 disabled:opacity-80"
          >
            {status === 'processing' ? (
              <>
                <Loader2 className="size-4 animate-spin" aria-hidden="true" /> Processing...
              </>
            ) : (
              <>
                <Lock className="size-4" aria-hidden="true" /> Pay {formatINR(total)}
              </>
            )}
          </button>
          <p className="mt-4 flex items-center justify-center gap-1.5 text-xs text-primary-foreground/60">
            <ShieldCheck className="size-3.5" aria-hidden="true" /> 256-bit encrypted · Demo mode, no real charge
          </p>
        </div>
      </aside>
    </form>
  )
}
