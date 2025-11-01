"use client"

import React from 'react'
import SectionTitle from '../common/SectionTitle'
import useGetUsers from '@/hooks/users/useGetUsers'
import Loader from '../ui/Loader'
import TeamMemberCard from './TeamMemberCard'

const MemberListing = () => {
    const { data: members, isLoading } = useGetUsers()
    if (isLoading) return <Loader />
    return (
        <section className='relative w-full sm:pt-[60px] pt-10'>
            <div className='ct-container'>
                <SectionTitle
                    subtitle="Members & Partners"
                    title="our network to strengthen fire preparedness across Surat."
                    align="center"
                    titleClass="max-w-[440px] w-full mx-auto"
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-10 ">
                    {members.map((member) => (
                        <TeamMemberCard key={member._id as string} member={member} />
                    ))}
                </div>
            </div>
        </section>
    )
}

export default MemberListing