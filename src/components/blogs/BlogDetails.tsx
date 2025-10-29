"use client"

import useGetBlogById from '@/hooks/blogs/useGetBlogById'
import { useParams } from 'next/navigation'
import React from 'react'
import Loader from '../ui/Loader'
import Image from 'next/image'

const BlogDetails = () => {
    const { id } = useParams()
    const { data, isLoading } = useGetBlogById(id as string)
    if (isLoading) return <Loader />
    return (
        <section className='relative w-full sm:pt-[60px] pt-10'>
            <div className='ct-container'>
                <Image src={data!.featuredImage} alt={data!.title} width={100} height={100} className='w-full h-[400px] rounded-md' />
                <div className='mx-96 pt-10'>
                    <p>{data!.title}</p>
                    <div dangerouslySetInnerHTML={{ __html: data!.content }} className='prose max-w-none' />
                </div>
            </div>
        </section>
    )
}

export default BlogDetails