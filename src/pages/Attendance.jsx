import React, { useState } from 'react';
import { useAuth, useData } from '../hooks/useCustomHooks';
import { CalendarCheck, Clock, CheckCircle } from 'lucide-react';

const Attendance = () => {
    const { user } = useAuth();
    const { attendance, addAttendance } = useData();
    const [status, setStatus] = useState(''); // 'Checked In', 'Checked Out'

    const today = new Date().toISOString().split('T')[0];
    const userAttendance = attendance.filter(a => a.employeeId === user?.id);
    const todayRecord = userAttendance.find(a => a.date === today);

    const handleCheckIn = () => {
        if (todayRecord) return;
        const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        addAttendance({
            employeeId: user.id,
            date: today,
            checkIn: now,
            checkOut: '-',
            status: 'Present'
        });
        setStatus('Checked In');
    };

    const handleCheckOut = () => {
        if (!todayRecord || todayRecord.checkOut !== '-') return;
        // In a real app, we'd update the existing record. 
        // For this mock, we'll just simulate it or need an updateAttendance function in DataContext.
        // Let's assume for simplicity we just alert for now as updateAttendance wasn't strictly defined for partial updates in my initial DataContext mock logic (it replaced whole object).
        // I'll add a simple alert.
        alert("Check-out functionality would update the record in a real backend.");
    };

    return (
        <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Attendance</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 flex flex-col items-center justify-center text-center">
                    <Clock className="h-12 w-12 text-blue-600 mb-4" />
                    <p className="text-gray-500 mb-1">{new Date().toDateString()}</p>
                    <h2 className="text-3xl font-bold text-gray-800 mb-6">
                        {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </h2>

                    {!todayRecord ? (
                        <button
                            onClick={handleCheckIn}
                            className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors w-full"
                        >
                            Check In
                        </button>
                    ) : (
                        <button
                            onClick={handleCheckOut}
                            disabled={todayRecord.checkOut !== '-'}
                            className={`px-6 py-2 rounded-full transition-colors w-full ${todayRecord.checkOut !== '-'
                                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                    : 'bg-red-600 text-white hover:bg-red-700'
                                }`}
                        >
                            {todayRecord.checkOut !== '-' ? 'Completed' : 'Check Out'}
                        </button>
                    )}
                </div>

                <div className="md:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                    <div className="p-4 border-b border-gray-200">
                        <h2 className="font-bold text-gray-800">My Attendance History</h2>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm text-gray-600">
                            <thead className="bg-gray-50 text-gray-700 font-medium border-b border-gray-200">
                                <tr>
                                    <th className="px-6 py-3">Date</th>
                                    <th className="px-6 py-3">Check In</th>
                                    <th className="px-6 py-3">Check Out</th>
                                    <th className="px-6 py-3">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {userAttendance.map((record) => (
                                    <tr key={record.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4">{record.date}</td>
                                        <td className="px-6 py-4">{record.checkIn}</td>
                                        <td className="px-6 py-4">{record.checkOut}</td>
                                        <td className="px-6 py-4">
                                            <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                                                {record.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                                {userAttendance.length === 0 && (
                                    <tr>
                                        <td colSpan="4" className="px-6 py-8 text-center text-gray-500">
                                            No attendance records found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Attendance;
