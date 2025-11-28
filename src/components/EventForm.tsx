"use client";
import React, { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { IEvent } from "@/types/event";
import { zodResolver } from "@hookform/resolvers/zod";
import { EventFormValues, eventSchema } from "@/lib/validation/eventSchema";
import Image from "next/image";

interface Props {
  initialValues?: Partial<IEvent>;
  onSubmit: (data: FormData) => Promise<void>;
  submitLabel: string;
}

const EventForm: React.FC<Props> = ({ initialValues, onSubmit, submitLabel }) => {
  const { register, handleSubmit, control, formState: { errors } } = useForm<EventFormValues>({
    resolver: zodResolver(eventSchema),
    defaultValues: initialValues ?? {
      title: "",
      description: "",
      date: "",
      startTime: "",
      endTime: "",
      location: "",
      eventType: "",
      agenda: [],
      trainers: [],
    },
  });

  const {
    fields: agendaFields,
    append: addAgenda,
    remove: removeAgenda,
  } = useFieldArray<EventFormValues, "agenda">({
    control,
    name: "agenda",
  });

  const {
    fields: trainerFields,
    append: addTrainer,
    remove: removeTrainer,
  } = useFieldArray<any, any>({
    control,
    name: "trainers",
  });

  const [imagePreview, setImagePreview] = useState<string | null>(
    initialValues?.image ? initialValues.image : null
  );
  const [safetyFileName, setSafetyFileName] = useState<string>(
    initialValues?.safetyChecklistUrl
      ? initialValues.safetyChecklistUrl.split("/").pop() ?? ""
      : ""
  );

  const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null);
  const [selectedChecklistFile, setSelectedChecklistFile] = useState<File | null>(null);

  const submitHandler = async (values: EventFormValues) => {
    const fd = new FormData();
    Object.entries(values).forEach(([key, val]) => {
      // Skip image and safetyChecklist as they are handled separately
      if (key === "image" || key === "safetyChecklist") return;

      if (Array.isArray(val)) {
        fd.append(key, JSON.stringify(val));
      } else if (val !== undefined && val !== null) {
        fd.append(key, String(val));
      }
    });

    if (selectedImageFile) fd.append("image", selectedImageFile);
    if (selectedChecklistFile) fd.append("safetyChecklist", selectedChecklistFile);

    console.log("Submitting FormData:", Array.from(fd.entries()));

    await onSubmit(fd);
  };

  return (
    <form
      onSubmit={handleSubmit(submitHandler)}
      className="bg-white rounded-3xl shadow-2xl max-w-4xl mx-auto overflow-hidden"
    >
      {/* Header Section */}
      <div className="bg-gradient-to-r from-[#490c0c] to-[#6b1010] px-8 py-6">
        <h2 className="text-3xl font-bold text-white">Event Details</h2>
        <p className="text-white/80 mt-1">Fill in the information below to create your event</p>
      </div>

      <div className="p-8 space-y-8">
        {/* Basic Information Section */}
        <div className="space-y-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-1 h-8 bg-[#490c0c] rounded-full"></div>
            <h3 className="text-xl font-bold text-[#490c0c]">Basic Information</h3>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Event Title <span className="text-[#490c0c]">*</span>
              </label>
              <input
                {...register("title", { required: true })}
                placeholder="Enter event title"
                className="w-full border-2 border-gray-200 focus:border-[#490c0c] focus:ring-2 focus:ring-[#490c0c]/20 p-3 rounded-xl transition-all duration-200 outline-none"
              />
              {errors.title && <p className="text-[#490c0c] text-sm mt-1 flex items-center gap-1">
                <span>⚠</span> {errors.title.message}
              </p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Description
              </label>
              <textarea
                {...register("description")}
                placeholder="Describe your event..."
                rows={4}
                className="w-full border-2 border-gray-200 focus:border-[#490c0c] focus:ring-2 focus:ring-[#490c0c]/20 p-3 rounded-xl transition-all duration-200 outline-none resize-none"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Date <span className="text-[#490c0c]">*</span>
                </label>
                <input
                  type="date"
                  {...register("date", { required: true })}
                  className="w-full border-2 border-gray-200 focus:border-[#490c0c] focus:ring-2 focus:ring-[#490c0c]/20 p-3 rounded-xl transition-all duration-200 outline-none"
                />
                {errors.date && <p className="text-[#490c0c] text-sm mt-1 flex items-center gap-1">
                  <span>⚠</span> {errors.date.message}
                </p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Event Type
                </label>
                <input
                  {...register("eventType")}
                  placeholder="e.g., Drill, Training, Meeting"
                  className="w-full border-2 border-gray-200 focus:border-[#490c0c] focus:ring-2 focus:ring-[#490c0c]/20 p-3 rounded-xl transition-all duration-200 outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Start Time
                </label>
                <input
                  type="time"
                  {...register("startTime")}
                  className="w-full border-2 border-gray-200 focus:border-[#490c0c] focus:ring-2 focus:ring-[#490c0c]/20 p-3 rounded-xl transition-all duration-200 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  End Time
                </label>
                <input
                  type="time"
                  {...register("endTime")}
                  className="w-full border-2 border-gray-200 focus:border-[#490c0c] focus:ring-2 focus:ring-[#490c0c]/20 p-3 rounded-xl transition-all duration-200 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Location <span className="text-[#490c0c]">*</span>
              </label>
              <input
                {...register("location")}
                placeholder="Enter event location"
                className="w-full border-2 border-gray-200 focus:border-[#490c0c] focus:ring-2 focus:ring-[#490c0c]/20 p-3 rounded-xl transition-all duration-200 outline-none"
              />
              {errors.location && <p className="text-[#490c0c] text-sm mt-1 flex items-center gap-1">
                <span>⚠</span> {errors.location.message}
              </p>}
            </div>
          </div>
        </div>

        {/* Agenda Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-1 h-8 bg-[#490c0c] rounded-full"></div>
            <h3 className="text-xl font-bold text-[#490c0c]">Event Agenda</h3>
          </div>

          <div className="space-y-3">
            {agendaFields.map((field, idx) => (
              <div key={field.id} className="bg-gray-50 p-4 rounded-xl border-2 border-gray-100">
                <div className="flex gap-3 items-start">
                  <div className="flex-1 space-y-2">
                    <input
                      {...register(`agenda.${idx}.time`)}
                      placeholder="Time (e.g., 10:00 AM)"
                      className="w-full border-2 border-gray-200 focus:border-[#490c0c] focus:ring-2 focus:ring-[#490c0c]/20 p-2.5 rounded-lg transition-all duration-200 outline-none bg-white"
                    />
                    {errors.agenda?.[idx]?.time && (
                      <p className="text-[#490c0c] text-xs flex items-center gap-1">
                        <span>⚠</span> {errors.agenda[idx]?.time?.message}
                      </p>
                    )}
                  </div>

                  <div className="flex-[2] space-y-2">
                    <input
                      {...register(`agenda.${idx}.title`)}
                      placeholder="Agenda item title"
                      className="w-full border-2 border-gray-200 focus:border-[#490c0c] focus:ring-2 focus:ring-[#490c0c]/20 p-2.5 rounded-lg transition-all duration-200 outline-none bg-white"
                    />
                    {errors.agenda?.[idx]?.title && (
                      <p className="text-[#490c0c] text-xs flex items-center gap-1">
                        <span>⚠</span> {errors.agenda[idx]?.title?.message}
                      </p>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => removeAgenda(idx)}
                    className="mt-0.5 p-2.5 bg-red-50 hover:bg-[#490c0c] text-[#490c0c] hover:text-white rounded-lg transition-all duration-200 font-semibold"
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={() => addAgenda({ time: "", title: "" })}
              className="w-full py-3 px-4 border-2 border-dashed border-gray-300 hover:border-[#490c0c] text-gray-600 hover:text-[#490c0c] rounded-xl transition-all duration-200 font-semibold flex items-center justify-center gap-2"
            >
              <span className="text-xl">+</span> Add Agenda Item
            </button>
          </div>
        </div>

        {/* Trainers Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-1 h-8 bg-[#490c0c] rounded-full"></div>
            <h3 className="text-xl font-bold text-[#490c0c]">Trainers</h3>
          </div>

          <div className="space-y-3">
            {trainerFields.map((field, idx) => (
              <div key={field.id} className="flex gap-3">
                <input
                  {...register(`trainers.${idx}` as const)}
                  placeholder="Trainer name"
                  className="flex-1 border-2 border-gray-200 focus:border-[#490c0c] focus:ring-2 focus:ring-[#490c0c]/20 p-3 rounded-xl transition-all duration-200 outline-none"
                />
                <button
                  type="button"
                  onClick={() => removeTrainer(idx)}
                  className="p-3 bg-red-50 hover:bg-[#490c0c] text-[#490c0c] hover:text-white rounded-xl transition-all duration-200 font-semibold px-5"
                >
                  ✕
                </button>
              </div>
            ))}

            <button
              type="button"
              onClick={() => addTrainer("")}
              className="w-full py-3 px-4 border-2 border-dashed border-gray-300 hover:border-[#490c0c] text-gray-600 hover:text-[#490c0c] rounded-xl transition-all duration-200 font-semibold flex items-center justify-center gap-2"
            >
              <span className="text-xl">+</span> Add Trainer
            </button>
          </div>
        </div>

        {/* Media Uploads Section */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-1 h-8 bg-[#490c0c] rounded-full"></div>
            <h3 className="text-xl font-bold text-[#490c0c]">Media & Documents</h3>
          </div>

          {/* Event Banner Image */}
          <div className="bg-gray-50 p-6 rounded-xl border-2 border-gray-100">
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Event Banner Image
            </label>
            <div className="space-y-4">
              <label className="flex items-center justify-center w-full py-4 px-4 border-2 border-dashed border-gray-300 hover:border-[#490c0c] rounded-xl cursor-pointer transition-all duration-200 bg-white">
                <div className="text-center">
                  <span className="text-3xl mb-2 block">📷</span>
                  <span className="text-sm text-gray-600 font-medium">Click to upload image</span>
                  <span className="text-xs text-gray-400 block mt-1">PNG, JPG, GIF up to 10MB</span>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setImagePreview(URL.createObjectURL(file));
                      setSelectedImageFile(file);
                    }
                  }}
                />
              </label>

              {imagePreview && (
                <div className="relative">
                  <Image
                    src={imagePreview}
                    height={100}
                    width={100}
                    alt="Preview"
                    className="w-full max-w-md mx-auto rounded-xl shadow-lg border-2 border-gray-200"
                  />
                  <div className="absolute top-2 right-2 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                    ✓ Uploaded
                  </div>
                </div>
              )}
            </div>
          </div>


          {/* Safety Checklist Document */}
          <div className="bg-gray-50 p-6 rounded-xl border-2 border-gray-100">
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Safety Checklist Document
            </label>
            <div className="space-y-4">
              <label className="flex items-center justify-center w-full py-4 px-4 border-2 border-dashed border-gray-300 hover:border-[#490c0c] rounded-xl cursor-pointer transition-all duration-200 bg-white">
                <div className="text-center">
                  <span className="text-3xl mb-2 block">📄</span>
                  <span className="text-sm text-gray-600 font-medium">Click to upload document</span>
                  <span className="text-xs text-gray-400 block mt-1">PDF, DOC, DOCX, XLS, XLSX, TXT</span>
                </div>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx,.xls,.xlsx,.txt"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setSafetyFileName(file.name); // show selected file name
                      setSelectedChecklistFile(file);
                    }
                  }}
                />
              </label>

              {/* ✅ Show uploaded or existing file */}
              {safetyFileName && (
                <div className="bg-white p-4 rounded-lg border-2 border-green-200 flex items-center gap-3">
                  <div className="bg-green-100 p-2 rounded-lg">
                    <span className="text-xl">✓</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-600">Uploaded file:</p>
                    <p className="font-semibold text-gray-900">{safetyFileName}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end pt-4">
          <button
            type="submit"
            className="bg-gradient-to-r from-[#490c0c] to-[#6b1010] hover:from-[#6b1010] hover:to-[#490c0c] text-white font-bold py-4 px-10 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
          >
            {submitLabel}
          </button>
        </div>
      </div>
    </form>
  );
};

export default EventForm;