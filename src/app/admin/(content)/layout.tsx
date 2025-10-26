'use client';

import AdminHeader from '@/components/admin/AdminHeader'
import AdminSidebar from '@/components/admin/AdminSidebar'
import React, { useState } from 'react'

const Layout = ({ children }: { children: React.ReactNode }) => {
	const [sidebarOpen, setSidebarOpen] = useState(false);

	const admin = {
		name: 'Admin',
		email: 'admin@admin.com',
		role: 'admin',
	}

	return (
		<div className='flex flex-col min-h-screen bg-gray-50'>
			<AdminHeader admin={admin} onMenuClick={() => setSidebarOpen(true)} />
			<div className='flex flex-1 overflow-hidden'>
				<AdminSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
				<main className='flex-1 overflow-auto'>
					<div className='p-6'>
						{children}
					</div>
				</main>
			</div>
		</div>
	)
}

export default Layout