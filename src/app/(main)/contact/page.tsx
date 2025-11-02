import Banner from '@/components/common/Banner'
import ContactForm from '@/components/contact-us/ContactForm'
import FAQSection from '@/components/contact-us/FAQSection'
import GetInTouch from '@/components/contact-us/GetInTouch'
import MapSection from '@/components/contact-us/MapSection'
import React from 'react'

const ContactUspage = () => {
  return (
    <div>
      <Banner title="Contact Us" backgroundImage="/img/about-hero-bg.webp" />
      <ContactForm />
      <GetInTouch />
      <MapSection />
      <FAQSection />
    </div>
  )
}

export default ContactUspage