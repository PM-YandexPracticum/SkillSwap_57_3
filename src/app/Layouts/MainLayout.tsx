import { Outlet } from 'react-router-dom'
import { Header } from '@widgets/Header/Header'
import { Footer } from '@widgets/Footer/Footer'
import { useState } from 'react'
import { OfferCreatedPopup } from '@/widgets/OfferCreatedPopup'

export function MainLayout() {
  const [showOfferPopup, setShowOfferPopup] = useState(() => {
    return sessionStorage.getItem('offerCreated') === 'true'
  })

  const handleClosePopup = () => {
    sessionStorage.removeItem('offerCreated')
    setShowOfferPopup(false)
  }

  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
      {showOfferPopup && <OfferCreatedPopup onClose={handleClosePopup} />}
    </>
  )
}