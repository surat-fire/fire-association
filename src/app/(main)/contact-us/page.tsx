import Banner from '@/components/common/Banner'
import ContactForm from '@/components/contact-us/ContactForm'
import React from 'react'

const ContactUspage = () => {
  return (
    <div>
        <Banner title="Contact Us" backgroundImage="/img/about-hero-bg.webp" />
        <ContactForm />
    </div>
  )
}

export default ContactUspage