"use client"

import React, { useMemo } from 'react'
import HomeFeaturedBlog from '../home/HomeFeaturedBlog'
import useGetBlogs from '@/hooks/blogs/useGetBlogs'
import Loader from '../ui/Loader'
import SectionTitle from '../common/SectionTitle'
import { formatDate } from '@/lib/utils'
import { MdKeyboardArrowRight } from 'react-icons/md'
import { useRouter } from 'next/navigation'

const BlogsListing = () => {
    const { data, isLoading } = useGetBlogs();
    const router = useRouter()

    const featuredBlog = useMemo(() => {
        const featuredData = data.blogs.find((blog) => blog.isFeatured === true)
        return featuredData
    }, [data])

    if (isLoading) return <Loader />
    return (
        <section className='w-full relative'>
            <div className='ct-container'>
                <HomeFeaturedBlog title={featuredBlog?.title} tag={featuredBlog?.tags[0]} created_at={featuredBlog?.createdAt} image={featuredBlog?.featuredImage} id={featuredBlog?._id} />
                <SectionTitle
                    subtitle="All Blog"
                    title="Latest Insights on Fire Safety"
                    align="center"
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 pt-10">
                    {data.blogs.map((blog, index) => (
                        <div
                            key={index}
                            className="w-full h-[400px] bg-cover bg-center bg-no-repeat rounded-3xl p-4 flex items-end"
                            style={{ backgroundImage: `url(${blog.featuredImage})` }}
                        >
                            <div className="w-full max-w-[555px] py-5 px-5 rounded-2xl bg-white gap-2">
                                <div className="flex w-full items-center">
                                    <div className="w-full flex-1">
                                        <h2 className="font-bold line-clamp-2 text-xl text-[var(--primary)] mb-6">
                                            {blog.title}
                                        </h2>
                                        <div className="w-full flex items-center gap-5">
                                            <span className="w-fit bg-[var(--primary)] text-white text-[13px] leading-4 py-2 px-4 rounded-full block">
                                                {blog.tags[0]}
                                            </span>
                                            <h2 className="block font-semibold text-base text-[var(--primary)] uppercase">
                                                {formatDate(blog.createdAt)}
                                            </h2>
                                        </div>
                                    </div>
                                    <MdKeyboardArrowRight onClick={() => router.push(`/blogs/${blog._id}`)} className="w-6 h-6 border border-brand-800 rounded-full hover:cursor-pointer" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section >
    )
}

export default BlogsListing