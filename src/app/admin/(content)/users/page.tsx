"use client"

import ConfirmDialog from '@/components/common/ConfirmDialog';
import MemberModal from '@/components/common/MemberModal';
import Loader from '@/components/ui/Loader';
import useDeleteUser from '@/hooks/users/useDeleteUser';
import useGetUsers from '@/hooks/users/useGetUsers';
import { IUser } from '@/models/User';
import React, { useState } from 'react'
import { UserPlus, Edit, Trash2, Users } from 'lucide-react';
import Image from 'next/image';

const MembersAdminPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingMember, setEditingMember] = useState<IUser | null>(null);
    const [isDeleting, setIsDeleting] = useState(false)
    const [deletingId, setDeletingId] = useState("")
    const { data: members, isLoading } = useGetUsers();
    const { mutateAsync: deleteUser, isPending } = useDeleteUser()

    const openAdd = () => {
        setEditingMember(null);
        setIsModalOpen(true);
    };

    const openEdit = (m: IUser) => {
        setEditingMember(m);
        setIsModalOpen(true);
    };

    const handleDelete = (id: string) => {
        setIsDeleting(true)
        setDeletingId(id)
    };

    const handleConfirmDelete = async () => {
        if (!deletingId) return
        const deletedData = await deleteUser(deletingId)
        if (deletedData.success) {
            setIsDeleting(false)
            setDeletingId("")
        }
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-brand-800 shadow-lg">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <div className="p-3 bg-white/10 rounded-lg">
                                <Users className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h1 className="text-2xl md:text-3xl font-bold text-white">Members</h1>
                                <p className="text-white/80 text-sm mt-1">
                                    Manage your organization members
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={openAdd}
                            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-brand-800 rounded-lg hover:bg-white/90 transition-colors font-medium shadow-md"
                        >
                            <UserPlus className="w-5 h-5" />
                            <span>Add Member</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="bg-white rounded-xl shadow-md overflow-hidden">
                    {/* Stats Bar */}
                    <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                        <div className="flex items-center justify-between">
                            <p className="text-sm text-gray-600">
                                Total Members: <span className="font-semibold text-brand-800">{members?.length || 0}</span>
                            </p>
                        </div>
                    </div>

                    {/* Table */}
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Member
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Role
                                    </th>
                                    <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {isLoading ? (
                                    <tr>
                                        <td colSpan={4} className="py-12">
                                            <Loader />
                                        </td>
                                    </tr>
                                ) : members?.length === 0 ? (
                                    <tr>
                                        <td colSpan={4} className="py-12">
                                            <div className="text-center">
                                                <Users className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                                                <p className="text-gray-500 text-sm mb-2">No members yet</p>
                                                <button
                                                    onClick={openAdd}
                                                    className="text-brand-800 text-sm font-medium hover:underline"
                                                >
                                                    Add your first member
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    members?.map((m, index) => (
                                        <tr key={index} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-4">
                                                    <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-full bg-brand-800/10 border-2 border-brand-800/20">
                                                        {m.imageFile ? (
                                                            <Image
                                                                src={m.imageFile}
                                                                alt={m.name}
                                                                width={100}
                                                                height={100}
                                                                className="h-full w-full object-cover"
                                                            />
                                                        ) : (
                                                            <div className="flex h-full w-full items-center justify-center text-sm font-semibold text-brand-800">
                                                                {m.name.charAt(0).toUpperCase()}
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div>
                                                        <div className="font-semibold text-gray-900">{m.name}</div>
                                                    </div>
                                                </div>
                                            </td>

                                            <td className="px-6 py-4">
                                                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-brand-800/10 text-brand-800">
                                                    {m.role}
                                                </span>
                                            </td>

                                            <td className="px-6 py-4">
                                                <div className="flex justify-end gap-2">
                                                    <button
                                                        onClick={() => openEdit(m)}
                                                        className="inline-flex items-center gap-1.5 px-3 py-1.5 border-2 border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                                                    >
                                                        <Edit className="w-4 h-4" />
                                                        <span className="hidden sm:inline">Edit</span>
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(m._id as string)}
                                                        className="inline-flex items-center gap-1.5 px-3 py-1.5 border-2 border-red-300 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                        <span className="hidden sm:inline">Delete</span>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Floating Add Button for Mobile */}
            <button
                onClick={openAdd}
                className="fixed bottom-6 right-6 md:hidden flex items-center justify-center w-14 h-14 bg-brand-800 text-white rounded-full shadow-lg hover:bg-brand-800/90 transition-all hover:scale-110"
                aria-label="Add member"
            >
                <UserPlus className="w-6 h-6" />
            </button>

            <MemberModal
                isOpen={isModalOpen}
                onClose={() => { setIsModalOpen(false); setEditingMember(null) }}
                initialData={editingMember}
            />

            <ConfirmDialog
                open={isDeleting}
                title='Delete Member'
                message='Are you sure you want to delete this member? This action cannot be undone.'
                cancelText='Cancel'
                confirmText='Delete'
                isLoading={isPending}
                onCancel={() => { setIsDeleting(false); setDeletingId("") }}
                onConfirm={handleConfirmDelete}
            />
        </div>
    );
}

export default MembersAdminPage