"use client"

import ConfirmDialog from '@/components/common/ConfirmDialog';
import MemberModal from '@/components/common/MemberModal';
import Loader from '@/components/ui/Loader';
import useDeleteUser from '@/hooks/users/useDeleteUser';
import useGetUsers from '@/hooks/users/useGetUsers';
import { IUser } from '@/models/User';
import React, { useState } from 'react'

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

    console.log("deleting Id outside =====>", deletingId)

    const handleConfirmDelete = async () => {
        console.log("DeletingIdv ====>", deletingId)
        if (!deletingId) return
        const deletedData = await deleteUser(deletingId)
        if (deletedData.success) {
            setIsDeleting(false)
            setDeletingId("")
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 p-4 sm:p-8">
            <div className="mx-auto max-w-5xl">
                <div className="mb-6 flex items-center justify-between">
                    <h1 className="text-2xl font-semibold">Members</h1>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={openAdd}
                            className="hidden items-center gap-2 rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white md:flex"
                        >
                            + Add member
                        </button>

                        {/* small screen floating add button */}
                        <button
                            onClick={openAdd}
                            className="md:hidden rounded-full bg-indigo-600 p-3 text-white"
                            aria-label="Add member"
                        >
                            +
                        </button>
                    </div>
                </div>

                <div className="rounded-lg bg-white p-4 shadow sm:p-6">
                    <div className="overflow-x-auto">
                        <table className="w-full table-auto">
                            <thead>
                                <tr className="text-left text-sm text-gray-500">
                                    <th className="py-2">Member</th>
                                    <th className="py-2">Role</th>
                                    <th className="py-2">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y">
                                {members.map((m, index) => (
                                    <tr key={index} className="align-top">
                                        <td className="py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-full bg-gray-200">
                                                    {m.imageFile ? (
                                                        // eslint-disable-next-line @next/next/no-img-element
                                                        <img src={m.imageFile} alt={m.name} className="h-full w-full object-cover" />
                                                    ) : (
                                                        <div className="flex h-full w-full items-center justify-center text-sm text-gray-600">{m.name}</div>
                                                    )}
                                                </div>
                                                <div>
                                                    <div className="font-medium">{m.name}</div>
                                                </div>
                                            </div>
                                        </td>

                                        <td className="py-4">
                                            <div className="text-sm text-gray-700">{m.role}</div>
                                        </td>

                                        <td className="py-4">
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => openEdit(m)}
                                                    className="rounded-md border px-3 py-1 text-sm"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(m._id as string)}
                                                    className="rounded-md border px-3 py-1 text-sm text-red-600"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}

                                {isLoading && (
                                    <tr>
                                        <td colSpan={3}>
                                            <Loader />
                                        </td>
                                    </tr>
                                )}

                                {members.length === 0 && (
                                    <tr>
                                        <td colSpan={3} className="py-8 text-center text-sm text-gray-500">
                                            No members yet. Click Add member to create one.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <MemberModal
                isOpen={isModalOpen}
                onClose={() => { setIsModalOpen(false); setEditingMember(null) }}
                initialData={editingMember}
            />

            <ConfirmDialog open={isDeleting} title='Delete User' message='Are you sure you want to delete this user ?' cancelText='Cancel' confirmText='Confirm' isLoading={isPending} onCancel={() => { setIsDeleting(false); setDeletingId("") }} onConfirm={handleConfirmDelete} />
        </div>
    );
}

export default MembersAdminPage