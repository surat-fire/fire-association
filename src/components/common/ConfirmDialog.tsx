"use client";
import React from "react";
import { Button } from "../ui/Button";
import { BiLoader } from "react-icons/bi";

interface ConfirmDialogProps {
    open: boolean;
    title?: string;
    message?: string;
    onCancel?: () => void;
    onConfirm?: () => void;
    cancelText?: string;
    confirmText?: string;
    isLoading: boolean
}

const ConfirmDialog = ({
    open,
    title = "Confirm",
    message = "Are you sure you want to confirm?",
    onCancel,
    onConfirm,
    cancelText = "Cancel",
    confirmText = "Confirm",
    isLoading
}: ConfirmDialogProps) => {
    if (!open) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
            <div className="bg-white rounded-xl p-6 shadow-lg w-full max-w-sm">
                <h2 className="text-lg font-semibold text-[#490c0c] mb-2">{title}</h2>
                <p className="text-gray-700 mb-4">{message}</p>
                <div className="flex justify-end gap-3">
                    <Button onClick={onCancel}>
                        {cancelText}
                    </Button>
                    <Button onClick={onConfirm}>{isLoading ? <BiLoader /> : confirmText}</Button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmDialog;