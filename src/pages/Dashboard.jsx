import React, { useState, useEffect } from 'react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Legend
} from 'recharts';
import { ArrowUpRight, ArrowDownRight, MoreVertical, Plus, Trash2 } from 'lucide-react';
import CreateMeetingModal from '../components/CreateMeetingModal';
import api from '../utils/api';

const StatCard = ({ title, value, subtext, change, isPositive }) => (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 transition-colors duration-200">
        <div className="flex justify-between items-start mb-2">
            <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
            <span className={`text-xs font-medium flex items-center ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
                {isPositive ? <ArrowUpRight className="h-3 w-3 mr-1" /> : <ArrowDownRight className="h-3 w-3 mr-1" />}
                {change}
            </span>
        </div>
        <div className="text-3xl font-bold text-gray-800 dark:text-white mb-1">{value}</div>
        <div className="text-xs text-gray-400 dark:text-gray-500">{subtext}</div>
    </div>
);

const MeetingItem = ({ meeting, onDelete, isAdmin }) => {
    const formatTime = (time) => {
        const [hours, minutes] = time.split(':');
        const hour = parseInt(hours);
        const ampm = hour >= 12 ? 'PM' : 'AM';
        const displayHour = hour % 12 || 12;
        return `${displayHour}:${minutes} ${ampm}`;
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase();
        const dayNum = date.getDate();
        return { day, dayNum };
    };

    const { day, dayNum } = formatDate(meeting.date);

    return (
        <div className="flex items-center p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors cursor-pointer group">
            <div className={`flex-shrink-0 w-12 h-12 ${meeting.color} rounded-lg flex flex-col items-center justify-center text-white mr-4`}>
                <span className="text-[10px] font-medium uppercase">{day}</span>
                <span className="text-lg font-bold leading-none">{dayNum}</span>
            </div>
            <div className="flex-1 min-w-0">
                <h4 className="text-sm font-semibold text-gray-800 dark:text-white truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {meeting.title}
                </h4>
                <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                    <span className="truncate">
                        From {formatTime(meeting.startTime)} to {formatTime(meeting.endTime)}
                    </span>
                </div>
            </div>
            {isAdmin && (
                <button
                    onClick={() => onDelete(meeting._id)}
                    className="text-gray-400 hover:text-red-600 transition-colors"
                >
                    <Trash2 className="h-4 w-4" />
                </button>
            )}
        </div>
    );
};

const Dashboard = () => {
    const [user, setUser] = useState(null);
    const [meetings, setMeetings] = useState([]);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        setUser(userInfo);
        fetchMeetings();
    }, []);

    const fetchMeetings = async () => {
        try {
            setLoading(true);
            const { data } = await api.get('/meetings');
            setMeetings(data);
        } catch (error) {
            console.error('Error fetching meetings:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleCreateMeeting = async (meetingData) => {
        try {
            await api.post('/meetings', meetingData);
            setShowCreateModal(false);
            fetchMeetings();
            alert('Meeting created successfully!');
        } catch (error) {
            console.error('Error creating meeting:', error);
            alert(error.response?.data?.message || 'Failed to create meeting');
        }
    };

    const handleDeleteMeeting = async (meetingId) => {
        if (!window.confirm('Are you sure you want to delete this meeting?')) {
            return;
        }

        try {
            await api.delete(`/meetings/${meetingId}`);
            fetchMeetings();
            alert('Meeting deleted successfully!');
        } catch (error) {
            console.error('Error deleting meeting:', error);
            alert(error.response?.data?.message || 'Failed to delete meeting');
        }
    };

    const hiringData = [
        { name: 'Jan', attrition: 10, netGrowth: 20, newHires: 30 },
        { name: 'Feb', attrition: 20, netGrowth: 120, newHires: 140 },
        { name: 'Mar', attrition: 40, netGrowth: 40, newHires: 80 },
        { name: 'Apr', attrition: 30, netGrowth: 90, newHires: 120 },
        { name: 'May', attrition: 50, netGrowth: 150, newHires: 200 },
        { name: 'Jun', attrition: 70, netGrowth: -40, newHires: 30 },
        { name: 'Jul', attrition: 40, netGrowth: 120, newHires: 160 },
        { name: 'Aug', attrition: 60, netGrowth: 30, newHires: 90 },
        { name: 'Sep', attrition: 50, netGrowth: 20, newHires: 70 },
        { name: 'Oct', attrition: 40, netGrowth: 70, newHires: 110 },
        { name: 'Nov', attrition: 25, netGrowth: 105, newHires: 130 },
        { name: 'Dec', attrition: 15, netGrowth: 105, newHires: 120 },
    ];

    const genderData = [
        { name: 'Male', value: 65 },
        { name: 'Female', value: 35 },
    ];
    const COLORS = ['#3B82F6', '#10B981'];

    const isAdmin = user?.role === 'Admin';

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400">Dashboard</h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="Total Employees" value="856" subtext="employees" change="+10.0%" isPositive={true} />
                <StatCard title="Job Views" value="3,342" subtext="views" change="+22.0%" isPositive={true} />
                <StatCard title="Job Applied" value="77" subtext="applications" change="+12.0%" isPositive={true} />
                <StatCard title="Resigned Employees" value="17" subtext="resigned" change="-7.0%" isPositive={false} />
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 transition-colors duration-200">
                <h2 className="text-lg font-bold text-blue-600 dark:text-blue-400 mb-6">Monthly Hiring & Attrition Analysis</h2>
                <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={hiringData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} dy={10} />
                            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} />
                            <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }} />
                            <Legend verticalAlign="bottom" height={36} iconType="plainline" wrapperStyle={{ paddingTop: '20px' }} />
                            <Line type="monotone" dataKey="attrition" name="Attrition" stroke="#F97316" strokeWidth={2} dot={{ r: 4, fill: '#fff', strokeWidth: 2 }} activeDot={{ r: 6 }} />
                            <Line type="monotone" dataKey="netGrowth" name="Net Growth" stroke="#10B981" strokeWidth={2} dot={{ r: 4, fill: '#fff', strokeWidth: 2 }} activeDot={{ r: 6 }} />
                            <Line type="monotone" dataKey="newHires" name="New Hires" stroke="#3B82F6" strokeWidth={2} dot={{ r: 4, fill: '#fff', strokeWidth: 2 }} activeDot={{ r: 6 }} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 transition-colors duration-200">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-lg font-bold text-blue-600 dark:text-blue-400">Meetings</h2>
                        <button
                            onClick={() => setShowCreateModal(true)}
                            className="flex items-center gap-2 bg-blue-600 text-white px-3 py-1.5 rounded-lg hover:bg-blue-700 transition-colors text-sm"
                        >
                            <Plus size={16} />
                            Add Meeting
                        </button>
                    </div>

                    {loading ? (
                        <div className="flex justify-center items-center h-32">
                            <div className="text-gray-500">Loading meetings...</div>
                        </div>
                    ) : meetings.length === 0 ? (
                        <div className="flex justify-center items-center h-32">
                            <div className="text-gray-500">No meetings scheduled</div>
                        </div>
                    ) : (
                        <div className="space-y-2">
                            {meetings.map(meeting => (
                                <MeetingItem key={meeting._id} meeting={meeting} onDelete={handleDeleteMeeting} isAdmin={isAdmin} />
                            ))}
                        </div>
                    )}

                    <div className="mt-4 flex justify-between items-center text-xs text-gray-400">
                        <span>Last synced just now</span>
                        <button onClick={fetchMeetings} className="bg-blue-600 text-white px-4 py-1.5 rounded-md hover:bg-blue-700 transition-colors">
                            Sync
                        </button>
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col transition-colors duration-200">
                    <h2 className="text-lg font-bold text-blue-600 dark:text-blue-400 mb-2">Employees</h2>
                    <h2 className="text-lg font-bold text-blue-600 dark:text-blue-400 mb-6">Composition</h2>

                    <div className="flex-1 min-h-[200px] relative flex items-center justify-center">
                        <ResponsiveContainer width="100%" height={250}>
                            <PieChart>
                                <Pie data={genderData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} fill="#8884d8" paddingAngle={0} dataKey="value" startAngle={90} endAngle={-270}>
                                    {genderData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>

                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <div className="text-center">
                                <span className="block text-3xl font-bold text-gray-800 dark:text-white">856</span>
                            </div>
                        </div>

                        <div className="absolute top-1/4 left-0">
                            <div className="bg-white dark:bg-gray-700 shadow-sm border border-gray-100 dark:border-gray-600 rounded px-2 py-1 text-xs font-bold text-blue-600 dark:text-blue-400 flex items-center">
                                <span className="w-2 h-2 rounded-full bg-blue-500 mr-1"></span> 35%
                            </div>
                        </div>
                        <div className="absolute bottom-1/4 right-0">
                            <div className="bg-white dark:bg-gray-700 shadow-sm border border-gray-100 dark:border-gray-600 rounded px-2 py-1 text-xs font-bold text-green-500 dark:text-green-400 flex items-center">
                                <span className="w-2 h-2 rounded-full bg-green-500 mr-1"></span> 65%
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {showCreateModal && (
                <CreateMeetingModal
                    onClose={() => setShowCreateModal(false)}
                    onCreate={handleCreateMeeting}
                />
            )}
        </div>
    );
};

export default Dashboard;
