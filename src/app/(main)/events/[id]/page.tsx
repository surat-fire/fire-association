import Banner from '@/components/common/Banner'
import EventDetails from '@/components/events/EventDetails'
import React from 'react'

const EventDetailPage = () => {
    return (
        <div>
            <Banner title="Events & Training" backgroundImage="/img/about-hero-bg.webp" />
            <EventDetails />
        </div>
    )
}

export default EventDetailPage