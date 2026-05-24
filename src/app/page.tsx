<<<<<<< HEAD
import Hero from '@/components/organisms/homepage/Hero'
import AboutUs from '@/components/organisms/homepage/AboutUs'

export default function Home() {
  return (
    <main>
      <Hero />
      <AboutUs />
      {/* komponen lain */}
    </main>
  )
}
=======
import AboutUs from '@/components/organisms/homepage/AboutUs'
import Hero from '@/components/organisms/homepage/Hero'
import Map from '@/components/organisms/homepage/Map'
import Moments from '@/components/organisms/homepage/Moments'

export default function Home() {
  return (
    <>
      <Hero />
      <AboutUs />
      <Moments />
      <Map />
    </>
  )
}
>>>>>>> dev
