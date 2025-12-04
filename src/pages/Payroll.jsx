import React from 'react';
import { useData } from '../hooks/useCustomHooks';
import { Download } from 'lucide-react';

const Payroll = () => {
    const { employees } = useData();

    const handleDownload = (empName) => {
        alert(`Downloading payslip for ${empName}... (Mock Action)`);
    };

    return (
        <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Payroll</h1>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-gray-600">
                        <thead className="bg-gray-50 text-gray-700 font-medium border-b border-gray-200">
                            <tr>
                                <th className="px-6 py-3">Employee</th>
                                <th className="px-6 py-3">Role</th>
                                <th className="px-6 py-3">Department</th>
                                <th className="px-6 py-3">Base Salary</th>
                                <th className="px-6 py-3">Status</th>
                                <th className="px-6 py-3 text-right">Payslip</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {employees.map((emp) => (
                                <tr key={emp.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 flex items-center space-x-3">
                                        <img src={emp.avatar} alt={emp.name} className="h-8 w-8 rounded-full bg-gray-200" />
                                        <div>
                                            <p className="font-medium text-gray-800">{emp.name}</p>
                                            <p className="text-xs text-gray-500">{emp.id}</p>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">{emp.role}</td>
                                    <td className="px-6 py-4">{emp.department}</td>
                                    <td className="px-6 py-4 font-medium text-gray-800">
                                        ${emp.salary.toLocaleString()}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                                            Processed
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button
                                            onClick={() => handleDownload(emp.name)}
                                            className="text-blue-600 hover:text-blue-800 flex items-center justify-end w-full"
                                        >
                                            <Download className="h-4 w-4 mr-1" />
                                            <span>Download</span>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Payroll;
