import React, { useState } from 'react';
import { useData } from '../hooks/useCustomHooks';
import { Plus, Search, Edit, Trash2 } from 'lucide-react';
import EmployeeForm from '../components/EmployeeForm';

const Employees = () => {
    const { employees, deleteEmployee } = useData();
    const [searchTerm, setSearchTerm] = useState('');
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingEmployee, setEditingEmployee] = useState(null);

    const filteredEmployees = employees.filter(emp =>
        emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.role.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleEdit = (employee) => {
        setEditingEmployee(employee);
        setIsFormOpen(true);
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this employee?')) {
            deleteEmployee(id);
        }
    };

    const handleCloseForm = () => {
        setIsFormOpen(false);
        setEditingEmployee(null);
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Employees</h1>
                <button
                    onClick={() => setIsFormOpen(true)}
                    className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                    <Plus className="h-5 w-5" />
                    <span>Add Employee</span>
                </button>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden transition-colors duration-200">
                <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search employees..."
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-gray-600 dark:text-gray-300">
                        <thead className="bg-gray-50 dark:bg-gray-700/50 text-gray-700 dark:text-gray-200 font-medium border-b border-gray-200 dark:border-gray-700">
                            <tr>
                                <th className="px-6 py-3">Name</th>
                                <th className="px-6 py-3">Role</th>
                                <th className="px-6 py-3">Department</th>
                                <th className="px-6 py-3">Status</th>
                                <th className="px-6 py-3 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                            {filteredEmployees.map((emp) => (
                                <tr key={emp._id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                                    <td className="px-6 py-4 flex items-center space-x-3">
                                        <img src={emp.avatar} alt={emp.name} className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-600" />
                                        <div>
                                            <p className="font-medium text-gray-800 dark:text-white">{emp.name}</p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">{emp.email}</p>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">{emp.role}</td>
                                    <td className="px-6 py-4">{emp.department}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${emp.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                            }`}>
                                            {emp.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right space-x-2">
                                        <button onClick={() => handleEdit(emp)} className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300">
                                            <Edit className="h-4 w-4" />
                                        </button>
                                        <button onClick={() => handleDelete(emp._id)} className="text-red-600 hover:text-red-800">
                                            <Trash2 className="h-4 w-4" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {filteredEmployees.length === 0 && (
                                <tr>
                                    <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                                        No employees found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {isFormOpen && (
                <EmployeeForm
                    isOpen={isFormOpen}
                    onClose={handleCloseForm}
                    employeeToEdit={editingEmployee}
                />
            )}
        </div>
    );
};

export default Employees;
