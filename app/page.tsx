import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { Hero } from '@/components/home/hero'
import { Courses } from '@/components/home/courses'
import { Results } from '@/components/home/results'
import { SuccessStories } from '@/components/home/success-stories'
import { Faculty } from '@/components/home/faculty'
import { Reviews } from '@/components/home/reviews'
import { getReviews } from '@/app/actions/reviews'
import { Cta } from '@/components/home/cta'

export const dynamic = 'force-dynamic'

export default async function HomePage() {
  const reviews = await getReviews()
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <Courses />
        <Results />
        <SuccessStories />
        <Faculty />
        <Reviews initialReviews={reviews} />
        <Cta />
      </main>
      <SiteFooter />
    </>
  )
}
