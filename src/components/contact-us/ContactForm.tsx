'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ContactFormData, formSchema } from '@/lib/validation/contactUsSchema';
import SectionTitle from '../common/SectionTitle';
import { Button } from '../ui/Button';
import useSendContactInfo from '@/hooks/contact/useSendContactInfo';
import { toast } from 'react-toastify';
import Loader from '../ui/Loader';

export default function ContactForm() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<ContactFormData>({
        resolver: zodResolver(formSchema),
    });
    const { mutateAsync: sendContact, isPending } = useSendContactInfo()

    const onSubmit = async (data: ContactFormData) => {
        console.log('Form submitted:', data);
        const contactData = await sendContact(data)
        if (contactData.success) {
            toast.success(contactData.message)
            reset();
        }
    };

    return (
        <section className='relative w-full sm:pt-[60px] pt-10'>
            <div className='ct-container'>
                <SectionTitle
                    subtitle="Get in Touch"
                    title="Get in Touch With Us  for Further Information."
                    align="center"
                    titleClass="max-w-[440px] w-full mx-auto"
                />
                <div className=" flex items-center justify-center">
                    <div className="w-full bg-pink-50 rounded-lg p-8 md:p-12">
                        <p className="text-sm text-gray-600 mb-2">
                            Fill out the form below and we&apos;ll get back to you within 24 hours
                        </p>
                        <h1 className="text-3xl font-bold text-gray-900 mb-8">
                            Send us a Message
                        </h1>

                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                {/* Full Name */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-900 mb-2">
                                        Full Name
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Full Name"
                                        {...register('fullName')}
                                        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-transparent"
                                    />
                                    {errors.fullName && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.fullName.message}
                                        </p>
                                    )}
                                </div>

                                {/* Email Address */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-900 mb-2">
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        placeholder="Email Address"
                                        {...register('email')}
                                        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-transparent"
                                    />
                                    {errors.email && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.email.message}
                                        </p>
                                    )}
                                </div>

                                {/* Phone Number */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-900 mb-2">
                                        Phone Number
                                    </label>
                                    <input
                                        type="tel"
                                        placeholder="Phone Number"
                                        {...register('phone')}
                                        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-transparent"
                                    />
                                    {errors.phone && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.phone.message}
                                        </p>
                                    )}
                                </div>

                                {/* Company Name */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-900 mb-2">
                                        Company Name
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Company Name"
                                        {...register('company')}
                                        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-transparent"
                                    />
                                    {errors.company && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.company.message}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Subject */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-900 mb-2">
                                    Subject
                                </label>
                                <select
                                    {...register('subject')}
                                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-md text-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-transparent appearance-none cursor-pointer"
                                    defaultValue=""
                                >
                                    <option value="" disabled>
                                        Select a Subject
                                    </option>
                                    <option value="general">General Inquiry</option>
                                    <option value="support">Technical Support</option>
                                    <option value="sales">Sales</option>
                                    <option value="partnership">Partnership</option>
                                    <option value="other">Other</option>
                                </select>
                                {errors.subject && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.subject.message}
                                    </p>
                                )}
                            </div>

                            {/* Message */}
                            <div className="mb-8">
                                <label className="block text-sm font-medium text-gray-900 mb-2">
                                    Message
                                </label>
                                <textarea
                                    placeholder="Please describe your requirement in details"
                                    {...register('message')}
                                    rows={6}
                                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-transparent resize-none"
                                />
                                {errors.message && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.message.message}
                                    </p>
                                )}
                            </div>

                            {/* Submit Button */}
                            <Button type='submit'>
                                {isPending ? <Loader /> : "Send Message"}
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}