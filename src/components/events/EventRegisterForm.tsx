"use client"

import { EventFormData, EventFormSchema } from '@/lib/validation/eventRegisterSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react'
import { useForm } from 'react-hook-form';
import { Button } from '../ui/Button';
import useEventRegistration from '@/hooks/users/useCreateRegisterEvent';
import { toast } from 'react-toastify';
import Loader from '../ui/Loader';
import { useParams } from 'next/navigation';

const EventRegisterForm = () => {
    const { id } = useParams()
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<EventFormData>({
        resolver: zodResolver(EventFormSchema),
        defaultValues: {
            fullName: "",
            organization: "",
            phone: "",
            email: "",
        },
    });

    const { mutateAsync, isPending } = useEventRegistration()

    const onSubmit = async (data: EventFormData) => {
        console.log("Registration data:", data);
        const payload = {
            ...data,
            event: id as string
        }
        const eventRegisterData = await mutateAsync(payload)
        if (eventRegisterData.success) {
            toast.success("Registration submitted successfully!")
        }
        reset();
    };

    return (
        <div>
            <h2 className="text-2xl font-bold text-brand-800 mb-6">
                Register Forms
            </h2>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    {/* Full Name */}
                    <div>
                        <label className="block text-base font-semibold text-black mb-2">
                            Full Name
                        </label>
                        <input
                            type="text"
                            placeholder="Full Name"
                            {...register("fullName")}
                            className={`w-full px-4 py-3 bg-white border rounded-lg text-[#5D5D5D] placeholder-[#5D5D5D] focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent ${errors.fullName ? "border-red-500" : "border-gray-300"
                                }`}
                        />
                        {errors.fullName && (
                            <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>
                        )}
                    </div>

                    {/* Organization */}
                    <div>
                        <label className="block text-base font-semibold text-black mb-2">
                            Organization
                        </label>
                        <input
                            type="text"
                            placeholder="Organization Name"
                            {...register("organization")}
                            className={`w-full px-4 py-3 bg-white border rounded-lg text-[#5D5D5D] placeholder-[#5D5D5D] focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent ${errors.organization ? "border-red-500" : "border-gray-300"
                                }`}
                        />
                        {errors.organization && (
                            <p className="text-red-500 text-sm mt-1">{errors.organization.message}</p>
                        )}
                    </div>

                    {/* Phone */}
                    <div>
                        <label className="block text-base font-semibold text-black mb-2">
                            Phone
                        </label>
                        <input
                            type="tel"
                            placeholder="Enter Your Phone Number"
                            {...register("phone")}
                            className={`w-full px-4 py-3 bg-white border rounded-lg text-[#5D5D5D] placeholder-[#5D5D5D] focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent ${errors.phone ? "border-red-500" : "border-gray-300"
                                }`}
                        />
                        {errors.phone && (
                            <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
                        )}
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-base font-semibold text-black mb-2">
                            Email
                        </label>
                        <input
                            type="email"
                            placeholder="Enter Your Email"
                            {...register("email")}
                            className={`w-full px-4 py-3 bg-white border rounded-lg text-[#5D5D5D] placeholder-[#5D5D5D] focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent ${errors.email ? "border-red-500" : "border-gray-300"
                                }`}
                        />
                        {errors.email && (
                            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                        )}
                    </div>
                </div>

                {/* Submit Button */}
                <Button type='submit' className='sm:py-4 sm:text-base mt-5'>
                    {isPending ? <Loader /> : "Register Now"}
                </Button>
            </form>
        </div>
    );
};

export default EventRegisterForm;