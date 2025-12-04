import React, { useState, useRef } from 'react';
import { useAuth } from '../hooks/useCustomHooks';
import { User, Mail, Phone, MapPin, Briefcase, Camera, Upload } from 'lucide-react';
import api from '../utils/api';

const Profile = () => {
    const { user, setUser } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [uploading, setUploading] = useState(false);
    const fileInputRef = useRef(null);
    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        phone: '+1 (555) 123-4567',
        location: 'New York, USA',
        bio: 'Experienced professional with a passion for building great products.',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSave = () => {
        setIsEditing(false);
        // In a real app, update user context/backend here
        alert('Profile updated successfully! (Mock)');
    };

    const handleAvatarClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Validate file type
        if (!file.type.startsWith('image/')) {
            alert('Please select an image file');
            return;
        }

        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            alert('File size must be less than 5MB');
            return;
        }

        setUploading(true);
        try {
            const formData = new FormData();
            formData.append('avatar', file);

            const { data } = await api.post('/auth/upload-avatar', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            // Update user context with new avatar
            if (setUser) {
                setUser({ ...user, avatar: data.avatar });
            }
            alert('Profile picture updated successfully!');
        } catch (error) {
            console.error('Failed to upload avatar:', error);
            alert('Failed to upload profile picture. Please try again.');
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">My Profile</h1>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                {/* Cover Image */}
                <div className="h-32 bg-gradient-to-r from-blue-500 to-purple-600"></div>

                <div className="px-8 pb-8">
                    <div className="relative flex justify-between items-end -mt-12 mb-6">
                        <div className="relative">
                            <div className="h-24 w-24 rounded-full border-4 border-white bg-white overflow-hidden">
                                <img src={user?.avatar} alt={user?.name} className="h-full w-full object-cover" />
                            </div>
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                className="hidden"
                            />
                            <button
                                onClick={handleAvatarClick}
                                disabled={uploading}
                                className="absolute bottom-0 right-0 bg-gray-100 p-1.5 rounded-full border border-white hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                title="Upload profile picture"
                            >
                                {uploading ? (
                                    <Upload className="h-4 w-4 text-gray-600 animate-pulse" />
                                ) : (
                                    <Camera className="h-4 w-4 text-gray-600" />
                                )}
                            </button>
                        </div>
                        <button
                            onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                            className={`px-4 py-2 rounded-lg font-medium transition-colors ${isEditing
                                ? 'bg-green-600 text-white hover:bg-green-700'
                                : 'bg-blue-600 text-white hover:bg-blue-700'
                                }`}
                        >
                            {isEditing ? 'Save Changes' : 'Edit Profile'}
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="md:col-span-2 space-y-6">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-800">{user?.name}</h2>
                                <p className="text-gray-500">{user?.role} • {user?.department || 'Engineering'}</p>
                            </div>

                            <div className="space-y-4">
                                <h3 className="font-bold text-gray-800 border-b pb-2">About</h3>
                                {isEditing ? (
                                    <textarea
                                        name="bio"
                                        rows="4"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500"
                                        value={formData.bio}
                                        onChange={handleChange}
                                    />
                                ) : (
                                    <p className="text-gray-600 leading-relaxed">{formData.bio}</p>
                                )}
                            </div>

                            <div className="space-y-4">
                                <h3 className="font-bold text-gray-800 border-b pb-2">Contact Information</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-medium text-gray-500 mb-1">Email Address</label>
                                        <div className="flex items-center space-x-2 text-gray-700">
                                            <Mail className="h-4 w-4 text-gray-400" />
                                            <span>{user?.email}</span>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-gray-500 mb-1">Phone Number</label>
                                        {isEditing ? (
                                            <input
                                                type="text"
                                                name="phone"
                                                className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500"
                                                value={formData.phone}
                                                onChange={handleChange}
                                            />
                                        ) : (
                                            <div className="flex items-center space-x-2 text-gray-700">
                                                <Phone className="h-4 w-4 text-gray-400" />
                                                <span>{formData.phone}</span>
                                            </div>
                                        )}
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-gray-500 mb-1">Location</label>
                                        {isEditing ? (
                                            <input
                                                type="text"
                                                name="location"
                                                className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500"
                                                value={formData.location}
                                                onChange={handleChange}
                                            />
                                        ) : (
                                            <div className="flex items-center space-x-2 text-gray-700">
                                                <MapPin className="h-4 w-4 text-gray-400" />
                                                <span>{formData.location}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                                <h3 className="font-bold text-gray-800 mb-3">Work Details</h3>
                                <div className="space-y-3">
                                    <div>
                                        <p className="text-xs text-gray-500">Employee ID</p>
                                        <p className="font-medium text-gray-800">{user?.id}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500">Department</p>
                                        <p className="font-medium text-gray-800">{user?.department || 'Engineering'}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500">Position</p>
                                        <p className="font-medium text-gray-800">{user?.position || 'Senior Developer'}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500">Join Date</p>
                                        <p className="font-medium text-gray-800">{user?.joinDate || '2023-01-15'}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
