import useCreateUser from "@/hooks/users/useCreateUser";
import useEditUser from "@/hooks/users/useUpdateUser";
import { MemberFormValues, MemberSchema } from "@/lib/validation/contactUsSchema";
import { IUser } from "@/models/User";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { X, Upload, User, Briefcase, Loader2, Image as ImageIcon } from "lucide-react";

const MemberModal = ({
    isOpen,
    onClose,
    initialData,
}: {
    isOpen: boolean;
    onClose: () => void;
    initialData?: IUser | null;
}) => {
    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: { errors, isSubmitting },
    } = useForm<MemberFormValues>({
        resolver: zodResolver(MemberSchema),
        defaultValues: {
            name: initialData?.name || "",
            role: initialData?.role || "",
            imageFile: undefined,
        },
    });

    const { mutateAsync: createUser, isPending: createLoading } = useCreateUser();
    const { mutateAsync: updateUser, isPending: updateLoading } = useEditUser(
        initialData?._id as string
    );

    const watchedFile = watch("imageFile");
    const [preview, setPreview] = useState<string | null>(null);

    // handle initial values + preview setup
    useEffect(() => {
        if (isOpen && initialData) {
            reset({
                name: initialData.name,
                role: initialData.role,
                imageFile: undefined,
            });
            setPreview(initialData.imageFile ?? null);
        }
        if (!initialData) {
            reset();
        }
        if (!isOpen) {
            reset();
            setPreview(null);
        }
    }, [isOpen, initialData, reset]);

    // preview image when user selects new file
    useEffect(() => {
        const f = watchedFile as FileList | File | undefined;
        if (!f) return;

        const file = f instanceof FileList ? f[0] : f;
        if (!file) return;

        const reader = new FileReader();
        reader.onload = () => {
            setPreview(String(reader.result));
        };
        reader.readAsDataURL(file);
    }, [watchedFile]);

    const submit = async (data: MemberFormValues) => {
        try {
            const formData = new FormData();

            formData.append("name", data.name);
            formData.append("role", data.role);

            const f = data.imageFile as FileList | File | string | undefined;
            const file = f instanceof FileList ? f[0] : f;

            if (file instanceof File) {
                formData.append("imageFile", file);
            }

            if (initialData) {
                await updateUser(formData);
            } else {
                await createUser(formData);
            }

            onClose();
        } catch (err) {
            console.error("Member submit error:", err);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div
                className="absolute inset-0"
                onClick={() => {
                    if (!isSubmitting && !createLoading && !updateLoading) onClose();
                }}
            />

            <div className="relative z-50 w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
                {/* Header */}
                <div className="bg-brand-800 px-6 py-5">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-white/20 rounded-lg">
                                <User className="w-5 h-5 text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-white">
                                {initialData ? "Edit Member" : "Add New Member"}
                            </h3>
                        </div>
                        <button
                            onClick={onClose}
                            disabled={isSubmitting || createLoading || updateLoading}
                            className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors disabled:opacity-50"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                    <p className="text-white/80 text-sm mt-2">
                        {initialData ? "Update member information" : "Fill in the details to add a new member"}
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit(submit)} className="p-6 space-y-5">
                    {/* Name Field */}
                    <div>
                        <label className="flex items-center gap-2 mb-2 text-sm font-semibold text-brand-800">
                            <User className="w-4 h-4" />
                            Full Name <span className="text-red-500">*</span>
                        </label>
                        <input
                            {...register("name")}
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-800 focus:border-transparent transition-all"
                            placeholder="Enter full name"
                        />
                        {errors.name && (
                            <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                                <span className="text-xs">⚠</span>
                                {errors.name.message}
                            </p>
                        )}
                    </div>

                    {/* Role Field */}
                    <div>
                        <label className="flex items-center gap-2 mb-2 text-sm font-semibold text-brand-800">
                            <Briefcase className="w-4 h-4" />
                            Role / Position <span className="text-red-500">*</span>
                        </label>
                        <input
                            {...register("role")}
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-800 focus:border-transparent transition-all"
                            placeholder="e.g. Fire Chief, Officer, Volunteer"
                        />
                        {errors.role && (
                            <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                                <span className="text-xs">⚠</span>
                                {errors.role.message}
                            </p>
                        )}
                    </div>

                    {/* Image Upload */}
                    <div>
                        <label className="flex items-center gap-2 mb-2 text-sm font-semibold text-brand-800">
                            <ImageIcon className="w-4 h-4" />
                            Profile Image
                        </label>

                        {preview ? (
                            <div className="relative group">
                                <div className="relative aspect-square w-32 mx-auto rounded-xl overflow-hidden border-4 border-brand-800/20">
                                    <img
                                        src={preview}
                                        alt="preview"
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <label className="cursor-pointer">
                                            <input
                                                {...register("imageFile")}
                                                type="file"
                                                accept="image/*"
                                                className="hidden"
                                            />
                                            <div className="px-4 py-2 bg-white text-brand-800 rounded-lg font-medium text-sm flex items-center gap-2">
                                                <Upload className="w-4 h-4" />
                                                Change
                                            </div>
                                        </label>
                                    </div>
                                </div>
                                <p className="text-center text-xs text-gray-500 mt-2">
                                    Hover to change image
                                </p>
                            </div>
                        ) : (
                            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-brand-800 transition-colors">
                                <label className="cursor-pointer">
                                    <input
                                        {...register("imageFile")}
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                    />
                                    <div className="flex flex-col items-center gap-2">
                                        <div className="p-3 bg-brand-800/10 rounded-full">
                                            <Upload className="w-6 h-6 text-brand-800" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-700">
                                                Click to upload image
                                            </p>
                                            <p className="text-xs text-gray-500 mt-1">
                                                PNG, JPG, WEBP (Max 5MB)
                                            </p>
                                        </div>
                                    </div>
                                </label>
                            </div>
                        )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col-reverse sm:flex-row gap-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={isSubmitting || createLoading || updateLoading}
                            className="flex-1 px-6 py-3 border-2 border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors disabled:opacity-50"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting || createLoading || updateLoading}
                            className="flex-1 px-6 py-3 bg-brand-800 text-white rounded-lg font-medium hover:bg-brand-800/90 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                        >
                            {(isSubmitting || createLoading || updateLoading) ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    {initialData ? "Saving..." : "Adding..."}
                                </>
                            ) : (
                                <>
                                    {initialData ? "Save Changes" : "Add Member"}
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default MemberModal;