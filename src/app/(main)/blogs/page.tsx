import BlogsListing from '@/components/blogs/BlogsListing'
import Banner from '@/components/common/Banner'
import React from 'react'

const BlogsPage = () => {
    return (
        <div>
            <Banner title="Resources & Articles" backgroundImage="/img/about-hero-bg.webp" />
            <BlogsListing />
        </div>
    )
}

export default BlogsPage