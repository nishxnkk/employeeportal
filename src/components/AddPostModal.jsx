import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useData, useAuth } from '../hooks/useCustomHooks';

const AddPostModal = ({ isOpen, onClose }) => {
    const { employees, addFeedItem } = useData();
    const { user } = useAuth();
    const [formData, setFormData] = useState({
        type: 'Employee of the Month',
        employeeId: '',
        message: '',
        tags: ''
    });

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        const recipient = employees.find(emp => emp._id === formData.employeeId);

        if (!recipient) {
            alert('Please select an employee');
            return;
        }

        const newPost = {
            recipientId: recipient._id,
            type: 'Appreciation',
            badge: formData.type === 'Employee of the Month' ? 'APPRECIATED' : 'PROMOTED',
            content: {
                title: formData.type === 'Employee of the Month' ? `Congratulations to ${recipient.name}` : `Promoted: ${recipient.name}`,
                tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
                body: formData.message
            }
        };

        const result = await addFeedItem(newPost);
        if (result.success) {
            onClose();
            setFormData({ type: 'Employee of the Month', employeeId: '', message: '', tags: '' });
        } else {
            alert('Failed to create post');
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-gray-800">Add New Post</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                        <X className="h-6 w-6" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Post Type</label>
                        <select
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={formData.type}
                            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                        >
                            <option>Employee of the Month</option>
                            <option>Promotion</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Select Employee</label>
                        <select
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={formData.employeeId}
                            onChange={(e) => setFormData({ ...formData, employeeId: e.target.value })}
                            required
                        >
                            <option value="">Select an employee...</option>
                            {employees.map(emp => (
                                <option key={emp._id} value={emp._id}>{emp.name} - {emp.designation || emp.department}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Tags (comma separated)</label>
                        <input
                            type="text"
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="e.g. Hard Work, Leadership"
                            value={formData.tags}
                            onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                        <textarea
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            rows="4"
                            placeholder="Write something about the employee..."
                            value={formData.message}
                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
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
                            Post
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddPostModal;
