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
                <div className='md:h-[510px] dm:h-[400px] h-auto sm:rounded-3xl rounded-2xl w-full overflow-hidden'>
                    <Image src={data!.featuredImage} alt={data!.title} width={1024} height={600} className='w-full h-full object-cover' />
                </div>
                <div className='sm:mt-16 mt-10 w-full mx-auto max-w-[545px]'>
                    <p>{data!.title}</p>
                    <div dangerouslySetInnerHTML={{ __html: data!.content }} className='prose max-w-none' />
                </div>
            </div>
        </section>
    )
}

export default BlogDetails