import React from 'react';
import { useData } from '../hooks/useCustomHooks';

const Calendar = () => {
    const { events } = useData();

    // Helper to get days in current month
    const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
    const getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth();
    const daysInMonth = getDaysInMonth(currentYear, currentMonth);
    const firstDay = getFirstDayOfMonth(currentYear, currentMonth);

    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    const blanks = Array.from({ length: firstDay }, (_, i) => i);

    const getEventsForDay = (day) => {
        const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        return events.filter(e => e.date === dateStr);
    };

    return (
        <div>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Calendar</h1>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 transition-colors duration-200">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-gray-800 dark:text-white">
                        {today.toLocaleString('default', { month: 'long' })} {currentYear}
                    </h2>
                </div>

                <div className="grid grid-cols-7 gap-4 mb-4 text-center font-medium text-gray-500 dark:text-gray-400">
                    <div>Sun</div>
                    <div>Mon</div>
                    <div>Tue</div>
                    <div>Wed</div>
                    <div>Thu</div>
                    <div>Fri</div>
                    <div>Sat</div>
                </div>

                <div className="grid grid-cols-7 gap-4">
                    {blanks.map((_, i) => (
                        <div key={`blank-${i}`} className="h-24 bg-gray-50 dark:bg-gray-700/50 rounded-lg"></div>
                    ))}
                    {days.map((day) => {
                        const dayEvents = getEventsForDay(day);
                        const isToday = day === today.getDate();

                        return (
                            <div
                                key={day}
                                className={`h-24 border rounded-lg p-2 overflow-y-auto transition-colors ${isToday ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'border-gray-200 dark:border-gray-700'
                                    }`}
                            >
                                <div className={`text-sm font-medium mb-1 ${isToday ? 'text-blue-600 dark:text-blue-400' : 'text-gray-700 dark:text-gray-300'}`}>
                                    {day}
                                </div>
                                <div className="space-y-1">
                                    {dayEvents.map((evt) => (
                                        <div
                                            key={evt.id}
                                            className={`text-xs p-1 rounded ${evt.type === 'Holiday' ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400' : 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
                                                }`}
                                        >
                                            {evt.title}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Calendar;
