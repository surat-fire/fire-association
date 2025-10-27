import React from 'react'
import Banner from '@/components/common/Banner'
import PublicEventCard from '@/components/events/PublicEventCard'

const EventsPage = () => {
    return (
        <div>
            <Banner title="Events & Training" backgroundImage="/img/about-hero-bg.webp" />
            <PublicEventCard />
        </div>
    )
}

export default EventsPage