import AdminHeader from '@/components/admin/AdminHeader'
import AdminSidebar from '@/components/admin/AdminSidebar'
import React from 'react'

const layout = ({ children }: { children: React.ReactNode }) => {
	const admin = {
		name: 'Admin',
		email: 'admin@admin.com',
		role: 'admin',
	}
	return (
		<div className='flex flex-col min-h-screen'>
			<AdminSidebar />
			<div className='flex-1'>
				<AdminHeader admin={admin} />
				{children}
			</div>
		</div>
	)
}

export default layout