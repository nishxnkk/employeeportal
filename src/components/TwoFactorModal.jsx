import React, { useState } from 'react';
import { X, QrCode } from 'lucide-react';

const TwoFactorModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("2FA Enabled successfully!");
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-gray-800">Enable 2FA</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                        <X className="h-6 w-6" />
                    </button>
                </div>

                <div className="flex flex-col items-center mb-6">
                    <div className="bg-gray-100 p-4 rounded-lg mb-4">
                        <QrCode className="h-32 w-32 text-gray-800" />
                    </div>
                    <p className="text-sm text-gray-500 text-center">
                        Scan this QR code with your authenticator app (e.g. Google Authenticator)
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Enter Code</label>
                        <input
                            type="text"
                            placeholder="123456"
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-center tracking-widest text-lg"
                            maxLength="6"
                            required
                        />
                    </div>

                    <div className="flex justify-end space-x-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        >
                            Verify & Enable
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default TwoFactorModal;
