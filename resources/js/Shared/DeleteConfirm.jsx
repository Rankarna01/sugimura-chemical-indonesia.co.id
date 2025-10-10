import React from "react";

export default function DeleteConfirm({ open, title, message, onClose, onConfirm }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" onClick={onClose}></div>

      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="w-full max-w-md rounded-3xl bg-white shadow-2xl border border-brand-100 overflow-hidden">
          <div className="px-6 py-4 bg-gradient-to-r from-red-600 to-red-500 text-white">
            <div className="text-lg font-bold">{title}</div>
          </div>
          <div className="px-6 py-5">
            <p className="text-brand-900">{message}</p>
          </div>
          <div className="px-6 pb-6 flex gap-3 justify-end">
            <button onClick={onClose} className="px-4 py-2 rounded-xl bg-gray-100 text-gray-700 hover:bg-gray-200">
              Batal
            </button>
            <button onClick={onConfirm} className="px-4 py-2 rounded-xl bg-red-600 text-white hover:bg-red-700">
              Ya, Hapus
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
