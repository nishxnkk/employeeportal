import React, { useState } from 'react';
import { useAuth, useData } from '../hooks/useCustomHooks';
import { Plus, X, Check } from 'lucide-react';

const Leaves = () => {
    const { user } = useAuth();
    const { leaves, addLeave, updateLeaveStatus } = useData();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        type: 'Sick Leave',
        startDate: '',
        endDate: '',
        reason: ''
    });

    const myLeaves = user?.role === 'Admin' ? leaves : leaves.filter(l => l.employeeId === user?.id);

    const handleSubmit = (e) => {
        e.preventDefault();
        addLeave({
            employeeId: user.id,
            ...formData,
            status: 'Pending'
        });
        setIsModalOpen(false);
        setFormData({ type: 'Sick Leave', startDate: '', endDate: '', reason: '' });
    };

    const handleStatusChange = (id, newStatus) => {
        updateLeaveStatus(id, newStatus);
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Leaves</h1>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                    <Plus className="h-5 w-5" />
                    <span>Request Leave</span>
                </button>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-gray-600">
                        <thead className="bg-gray-50 text-gray-700 font-medium border-b border-gray-200">
                            <tr>
                                <th className="px-6 py-3">Employee ID</th>
                                <th className="px-6 py-3">Type</th>
                                <th className="px-6 py-3">Dates</th>
                                <th className="px-6 py-3">Reason</th>
                                <th className="px-6 py-3">Status</th>
                                {user?.role === 'Admin' && <th className="px-6 py-3 text-right">Actions</th>}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {myLeaves.map((leave) => (
                                <tr key={leave.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4">{leave.employeeId}</td>
                                    <td className="px-6 py-4">{leave.type}</td>
                                    <td className="px-6 py-4">
                                        {leave.startDate} to {leave.endDate}
                                    </td>
                                    <td className="px-6 py-4 max-w-xs truncate">{leave.reason}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${leave.status === 'Approved' ? 'bg-green-100 text-green-700' :
                                                leave.status === 'Rejected' ? 'bg-red-100 text-red-700' :
                                                    'bg-yellow-100 text-yellow-700'
                                            }`}>
                                            {leave.status}
                                        </span>
                                    </td>
                                    {user?.role === 'Admin' && leave.status === 'Pending' && (
                                        <td className="px-6 py-4 text-right space-x-2">
                                            <button
                                                onClick={() => handleStatusChange(leave.id, 'Approved')}
                                                className="text-green-600 hover:text-green-800"
                                                title="Approve"
                                            >
                                                <Check className="h-5 w-5" />
                                            </button>
                                            <button
                                                onClick={() => handleStatusChange(leave.id, 'Rejected')}
                                                className="text-red-600 hover:text-red-800"
                                                title="Reject"
                                            >
                                                <X className="h-5 w-5" />
                                            </button>
                                        </td>
                                    )}
                                    {user?.role === 'Admin' && leave.status !== 'Pending' && (
                                        <td className="px-6 py-4 text-right text-gray-400">
                                            -
                                        </td>
                                    )}
                                </tr>
                            ))}
                            {myLeaves.length === 0 && (
                                <tr>
                                    <td colSpan={user?.role === 'Admin' ? 6 : 5} className="px-6 py-8 text-center text-gray-500">
                                        No leave requests found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 relative">
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                        >
                            <X className="h-5 w-5" />
                        </button>

                        <h2 className="text-xl font-bold text-gray-800 mb-6">Request Leave</h2>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Leave Type</label>
                                <select
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500"
                                    value={formData.type}
                                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                                >
                                    <option value="Sick Leave">Sick Leave</option>
                                    <option value="Casual Leave">Casual Leave</option>
                                    <option value="Annual Leave">Annual Leave</option>
                                </select>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                                    <input
                                        type="date"
                                        required
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500"
                                        value={formData.startDate}
                                        onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                                    <input
                                        type="date"
                                        required
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500"
                                        value={formData.endDate}
                                        onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Reason</label>
                                <textarea
                                    required
                                    rows="3"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500"
                                    value={formData.reason}
                                    onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                                ></textarea>
                            </div>

                            <div className="pt-4 flex justify-end space-x-3">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                                >
                                    Submit Request
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Leaves;
