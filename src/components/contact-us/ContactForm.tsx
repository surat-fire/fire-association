"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ContactFormData, formSchema } from "@/lib/validation/contactUsSchema";
import SectionTitle from "../common/SectionTitle";
import { Button } from "../ui/Button";
import useSendContactInfo from "@/hooks/contact/useSendContactInfo";
import { toast } from "react-toastify";
import Loader from "../ui/Loader";

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(formSchema),
  });
  const { mutateAsync: sendContact, isPending } = useSendContactInfo();

  const onSubmit = async (data: ContactFormData) => {
    console.log("Form submitted:", data);
    const contactData = await sendContact(data);
    if (contactData.success) {
      toast.success(contactData.message);
      reset();
    }
  };

  return (
    <section className="relative w-full sm:pt-[60px] pt-10">
      <div className="ct-container">
        <SectionTitle
          subtitle="Get in Touch"
          title="Get in Touch With Us for Further Information."
          align="center"
          titleClass="max-w-[440px] w-full mx-auto"
        />
        <div className=" flex items-center justify-center sm:mt-10 mt-7">
          <div className="w-full bg-[rgba(221,40,40,0.08)] rounded-2xl p-8 md:p-12">
            <p className="block text-[13px] leading-5 m-0 font-normal mb-2.5 text-[var(--primary)]">
              Fill out the form below and we&apos;ll get back to you within 24
              hours
            </p>
            <h5 className="font-bold text-2xl text-[var(--primary)] mb-8">
              Send us a Message
            </h5>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* Full Name */}
                <div>
                  <label className="font-medium text-base text-black mb-2.5 block">
                    Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="Full Name"
                    {...register("fullName")}
                    className="w-full px-4 py-3  border border-[rgba(93,93,93,1)] rounded-xl text-[#3d3d3d] placeholder-[rgba(93,93,93,1)] focus:outline-none focus:ring-2 focus:ring-[rgba(73,12,12,1)] focus:border-transparent bg-transparent"
                  />
                  {errors.fullName && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.fullName.message}
                    </p>
                  )}
                </div>

                {/* Email Address */}
                <div>
                  <label className="font-medium text-base text-black mb-2.5 block">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="Email Address"
                    {...register("email")}
                    className="w-full px-4 py-3  border border-[rgba(93,93,93,1)] rounded-xl text-[#3d3d3d] placeholder-[rgba(93,93,93,1)] focus:outline-none focus:ring-2 focus:ring-[rgba(73,12,12,1)] focus:border-transparent bg-transparent"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Phone Number */}
                <div>
                  <label className="font-medium text-base text-black mb-2.5 block">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    {...register("phone")}
                    className="w-full px-4 py-3  border border-[rgba(93,93,93,1)] rounded-xl text-[#3d3d3d] placeholder-[rgba(93,93,93,1)] focus:outline-none focus:ring-2 focus:ring-[rgba(73,12,12,1)] focus:border-transparent bg-transparent"
                  />
                  {errors.phone && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.phone.message}
                    </p>
                  )}
                </div>

                {/* Company Name */}
                <div>
                  <label className="font-medium text-base text-black mb-2.5 block">
                    Company Name
                  </label>
                  <input
                    type="text"
                    placeholder="Company Name"
                    {...register("company")}
                    className="w-full px-4 py-3  border border-[rgba(93,93,93,1)] rounded-xl text-[#3d3d3d] placeholder-[rgba(93,93,93,1)] focus:outline-none focus:ring-2 focus:ring-[rgba(73,12,12,1)] focus:border-transparent bg-transparent"
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
                <label className="font-medium text-base text-black mb-2.5 block">
                  Subject
                </label>
                <select
                  {...register("subject")}
                  className="w-full px-4 py-3  border border-[rgba(93,93,93,1)] rounded-xl text-[#3d3d3d] placeholder-[rgba(93,93,93,1)] focus:outline-none focus:ring-2 focus:ring-[rgba(73,12,12,1)] focus:border-transparent bg-transparent appearance-none cursor-pointer"
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
                <label className="font-medium text-base text-black mb-2.5 block">
                  Message
                </label>
                <textarea
                  placeholder="Please describe your requirement in details"
                  {...register("message")}
                  rows={6}
                  className="w-full px-4 py-3  border border-[rgba(93,93,93,1)] rounded-xl text-[#3d3d3d] placeholder-[rgba(93,93,93,1)] focus:outline-none focus:ring-2 focus:ring-[rgba(73,12,12,1)] focus:border-transparent bg-transparent resize-none"
                />
                {errors.message && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.message.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <Button type="submit" className="sm:py-4 sm:text-base">
                {isPending ? <Loader /> : "Send Message"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
