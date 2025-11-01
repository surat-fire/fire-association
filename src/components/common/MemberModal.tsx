import useCreateUser from "@/hooks/users/useCreateUser";
import useEditUser from "@/hooks/users/useUpdateUser";
import { MemberFormValues, MemberSchema } from "@/lib/validation/contactUsSchema";
import { IUser } from "@/models/User";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const MemberModal = ({
    isOpen,
    onClose,
    initialData,
}: {
    isOpen: boolean;
    onClose: () => void;
    initialData?: IUser | null;
}) => {
    console.log("initialData ===>", initialData)
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
        if(!initialData) {
            console.log("inside initialData")
            reset()
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

            // ✅ For CREATE: always append image if available
            // ✅ For UPDATE: append only if it's a File (not URL string)
            if (file instanceof File) {
                formData.append("imageFile", file);
            }

            if (initialData) {
                // Editing existing member
                await updateUser(formData);
            } else {
                // Creating new member
                await createUser(formData);
            }

            onClose();
        } catch (err) {
            console.error("Member submit error:", err);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-40 flex items-center justify-center p-4">
            <div
                className="absolute inset-0 bg-black/40"
                onClick={() => {
                    if (!isSubmitting) onClose();
                }}
            />

            <div className="relative z-50 w-full max-w-lg rounded-2xl bg-white p-6 shadow-lg">
                <h3 className="mb-4 text-xl font-semibold">
                    {initialData ? "Edit member" : "Add member"}
                </h3>

                <form onSubmit={handleSubmit(submit)} className="space-y-4">
                    {/* Name */}
                    <div>
                        <label className="mb-1 block text-sm font-medium">Name</label>
                        <input
                            {...register("name")}
                            className="w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                            placeholder="Full name"
                        />
                        {errors.name && (
                            <p className="mt-1 text-sm text-red-600">
                                {errors.name.message}
                            </p>
                        )}
                    </div>

                    {/* Role */}
                    <div>
                        <label className="mb-1 block text-sm font-medium">Type / Role</label>
                        <input
                            {...register("role")}
                            className="w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                            placeholder="e.g. CEO, Staff, Contractor"
                        />
                        {errors.role && (
                            <p className="mt-1 text-sm text-red-600">
                                {errors.role.message}
                            </p>
                        )}
                    </div>

                    {/* Image */}
                    <div>
                        <label className="mb-1 block text-sm font-medium">Image (optional)</label>
                        <input
                            {...register("imageFile")}
                            type="file"
                            accept="image/*"
                            className="block w-full text-sm"
                        />
                        {preview && (
                            <div className="mt-2 flex items-center gap-3">
                                <img
                                    src={preview}
                                    alt="preview"
                                    className="h-16 w-16 rounded-md object-cover"
                                />
                                <div className="text-sm text-gray-600">Preview</div>
                            </div>
                        )}
                    </div>

                    {/* Actions */}
                    <div className="flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="rounded-md border px-4 py-2 text-sm"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting || createLoading || updateLoading}
                            className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white disabled:opacity-60"
                        >
                            {initialData ? "Save changes" : "Add member"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default MemberModal;
