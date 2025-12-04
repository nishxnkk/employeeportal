import React, { useState, useEffect } from 'react';
import { useData } from '../hooks/useCustomHooks';
import { X } from 'lucide-react';

const EmployeeForm = ({ isOpen, onClose, employeeToEdit }) => {
    const { addEmployee, updateEmployee } = useData();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'Employee',
        department: '',
        designation: '',
        salary: '',
        status: 'Active',
    });

    useEffect(() => {
        if (employeeToEdit) {
            setFormData({
                ...employeeToEdit,
                password: '' // Don't populate password for editing
            });
        } else {
            setFormData({
                name: '',
                email: '',
                password: '',
                role: 'Employee',
                department: '',
                designation: '',
                salary: '',
                status: 'Active',
            });
        }
    }, [employeeToEdit]);

    if (!isOpen) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const dataToSave = {
            ...formData,
            salary: Number(formData.salary),
            avatar: employeeToEdit?.avatar || `https://ui-avatars.com/api/?name=${formData.name}&background=random`,
            joiningDate: employeeToEdit?.joiningDate || new Date().toISOString().split('T')[0]
        };

        if (employeeToEdit) {
            // For updates, remove password if not changed
            if (!dataToSave.password) {
                delete dataToSave.password;
            }
            const result = await updateEmployee(employeeToEdit._id, dataToSave);
            if (result.success) {
                onClose();
            }
        } else {
            const result = await addEmployee(dataToSave);
            if (result.success) {
                onClose();
            } else {
                alert(result.message || 'Failed to add employee');
            }
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 relative">
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
                    <X className="h-5 w-5" />
                </button>

                <h2 className="text-xl font-bold text-gray-800 mb-6">
                    {employeeToEdit ? 'Edit Employee' : 'Add New Employee'}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                        <input
                            type="text"
                            name="name"
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            value={formData.name}
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input
                            type="email"
                            name="email"
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Password {employeeToEdit && <span className="text-xs text-gray-500">(leave blank to keep current)</span>}
                        </label>
                        <input
                            type="password"
                            name="password"
                            required={!employeeToEdit}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder={employeeToEdit ? "Leave blank to keep current" : "Enter password"}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">\n                        <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                        <select
                            name="role"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            value={formData.role}
                            onChange={handleChange}
                        >
                            <option value="Employee">Employee</option>
                            <option value="Admin">Admin</option>
                        </select>
                    </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                            <select
                                name="status"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                value={formData.status}
                                onChange={handleChange}
                            >
                                <option value="Active">Active</option>
                                <option value="Inactive">Inactive</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                            <input
                                type="text"
                                name="department"
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                value={formData.department}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Designation</label>
                            <input
                                type="text"
                                name="designation"
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                value={formData.designation}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Salary</label>
                        <input
                            type="number"
                            name="salary"
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            value={formData.salary}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="pt-4 flex justify-end space-x-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                        >
                            {employeeToEdit ? 'Save Changes' : 'Add Employee'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EmployeeForm;
