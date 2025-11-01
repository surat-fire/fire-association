import Banner from '@/components/common/Banner'
import MemberListing from '@/components/members/MemberListing'
import React from 'react'

const MembersPage = () => {
    return (
        <div>
            <Banner title="Members & Partners" backgroundImage="/img/about-hero-bg.webp" />
            <MemberListing />
        </div>
    )
}

export default MembersPage