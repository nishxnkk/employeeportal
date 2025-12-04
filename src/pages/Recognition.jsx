import React, { useState, useEffect } from 'react';
import { Trophy, Award, Star, TrendingUp } from 'lucide-react';
import api from '../utils/api';

const Recognition = () => {
    const [stats, setStats] = useState(null);
    const [employees, setEmployees] = useState([]);
    const [selectedRecipient, setSelectedRecipient] = useState('');
    const [message, setMessage] = useState('');
    const [selectedBadge, setSelectedBadge] = useState('');
    const [recentRecognitions, setRecentRecognitions] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);

    const badges = [
        { name: 'Top Performer Badge', color: 'purple' },
        { name: 'Team Player Badge', color: 'blue' },
        { name: 'Innovation Badge', color: 'green' },
        { name: 'Leadership Badge', color: 'orange' },
        { name: 'Excellence Badge', color: 'red' },
        { name: 'Customer Focus Badge', color: 'teal' }
    ];

    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        setCurrentUser(userInfo);
        fetchStats();
        fetchEmployees();
        fetchRecognitions();
    }, []);

    const fetchStats = async () => {
        try {
            const { data } = await api.get('/recognitions/stats');
            setStats(data);
        } catch (error) {
            console.error('Error fetching stats:', error);
        }
    };

    const fetchEmployees = async () => {
        try {
            const { data } = await api.get('/employees');
            setEmployees(data);
        } catch (error) {
            console.error('Error fetching employees:', error);
        }
    };

    const fetchRecognitions = async () => {
        try {
            const { data } = await api.get('/recognitions');
            setRecentRecognitions(data);
        } catch (error) {
            console.error('Error fetching recognitions:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!selectedRecipient || !message || !selectedBadge) {
            alert('Please fill all fields');
            return;
        }

        try {
            const badge = badges.find(b => b.name === selectedBadge);
            await api.post('/recognitions', {
                recipient: selectedRecipient,
                message,
                badge: selectedBadge,
                badgeColor: badge.color
            });

            alert('Recognition sent successfully!');
            setSelectedRecipient('');
            setMessage('');
            setSelectedBadge('');
            fetchStats();
            fetchRecognitions();
        } catch (error) {
            console.error('Error creating recognition:', error);
            alert('Failed to send recognition');
        }
    };

    const selectedEmployee = employees.find(e => e._id === selectedRecipient);

    const getBadgeColor = (badgeColor) => {
        const colors = {
            purple: 'bg-purple-100 text-purple-700',
            blue: 'bg-blue-100 text-blue-700',
            green: 'bg-green-100 text-green-700',
            orange: 'bg-orange-100 text-orange-700',
            red: 'bg-red-100 text-red-700',
            teal: 'bg-teal-100 text-teal-700'
        };
        return colors[badgeColor] || 'bg-purple-100 text-purple-700';
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const now = new Date();
        const diff = Math.floor((now - date) / 1000);

        if (diff < 60) return 'Just now';
        if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;
        if (diff < 86400) return `${Math.floor(diff / 3600)} hrs ago`;
        return `${Math.floor(diff / 86400)} days ago`;
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Left Sidebar */}
            <div className="lg:col-span-1 space-y-4">
                {/* Explorer Card */}
                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                    <h3 className="text-gray-600 text-sm mb-2">Explorer</h3>
                    <p className="text-xs text-gray-500 mb-3">Total recognition count that everyone users from is recognized</p>
                    <div className="bg-blue-600 text-white rounded-lg p-4 flex items-center justify-between">
                        <div>
                            <div className="text-sm">Total Given</div>
                            <div className="text-3xl font-bold">{stats?.totalCount || 0}</div>
                        </div>
                        <Trophy className="h-10 w-10 opacity-80" />
                    </div>
                </div>

                {/* Appreciation List */}
                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                    <h3 className="font-semibold text-gray-800 mb-4">Appreciation List</h3>
                    <p className="text-xs text-gray-500 mb-4">Employee receiving recognition for a dedicated</p>

                    <div className="space-y-3">
                        {stats?.recentRecognitions?.slice(0, 5).map((rec, index) => (
                            <div key={rec._id} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold text-sm">
                                        {rec.recipient.name.charAt(0)}
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-900">{rec.recipient.name}</p>
                                        <p className="text-xs text-gray-500">{rec.recipient.department}</p>
                                    </div>
                                </div>
                                <span className="text-xs text-gray-400">#{index + 1}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Leaderboard */}
                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                    <h3 className="font-semibold text-gray-800 mb-4">Leaderboard</h3>

                    <div className="space-y-3">
                        {stats?.leaderboard?.slice(0, 5).map((item, index) => (
                            <div key={item.user._id} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                                <div className="flex items-center gap-3">
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm ${index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : index === 2 ? 'bg-orange-600' : 'bg-blue-500'
                                        }`}>
                                        {index + 1}
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-900">{item.user.name}</p>
                                        <p className="text-xs text-gray-500">{item.user.department}</p>
                                    </div>
                                </div>
                                <span className="text-sm font-semibold text-gray-700">{item.count}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3 space-y-6">
                {/* Recognition Form */}
                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900">Give Recognition</h2>
                            <p className="text-sm text-gray-500 mt-1">Choose a colleague you'd like to appreciate</p>
                        </div>
                        <div className="flex gap-4">
                            <div className="text-center">
                                <div className="flex items-center gap-2 bg-yellow-50 px-4 py-2 rounded-lg">
                                    <Trophy className="h-5 w-5 text-yellow-600" />
                                    <div>
                                        <p className="text-xs text-gray-600">Badges Served</p>
                                        <p className="text-lg font-bold text-gray-900">{stats?.totalCount || 0}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="text-center">
                                <div className="flex items-center gap-2 bg-green-50 px-4 py-2 rounded-lg">
                                    <TrendingUp className="h-5 w-5 text-green-600" />
                                    <div>
                                        <p className="text-xs text-gray-600">Recent Years</p>
                                        <p className="text-lg font-bold text-gray-900">#3</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Select the Recipient
                                </label>
                                <select
                                    value={selectedRecipient}
                                    onChange={(e) => setSelectedRecipient(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                >
                                    <option value="">Choose a colleague you'd like to appreciate</option>
                                    {employees.map(emp => (
                                        <option key={emp._id} value={emp._id}>{emp.name}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Recipient Name
                                </label>
                                <input
                                    type="text"
                                    value={selectedEmployee?.name || ''}
                                    readOnly
                                    placeholder="Team, Recipient Name"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Department/Dept
                                </label>
                                <input
                                    type="text"
                                    value={selectedEmployee?.department || ''}
                                    readOnly
                                    placeholder="IT & Software"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Employee ID
                                </label>
                                <input
                                    type="text"
                                    value={selectedEmployee?.employeeId || ''}
                                    readOnly
                                    placeholder="Enter ID"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Job Title
                                </label>
                                <input
                                    type="text"
                                    value={selectedEmployee?.designation || ''}
                                    readOnly
                                    placeholder="Select"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Recognition Note
                            </label>
                            <textarea
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                rows="4"
                                placeholder="Write a message to appreciate your colleague..."
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Select Badge
                            </label>
                            <div className="grid grid-cols-3 gap-3">
                                {badges.map((badge) => (
                                    <button
                                        key={badge.name}
                                        type="button"
                                        onClick={() => setSelectedBadge(badge.name)}
                                        className={`p-3 rounded-lg border-2 transition-all ${selectedBadge === badge.name
                                                ? 'border-blue-500 bg-blue-50'
                                                : 'border-gray-200 hover:border-gray-300'
                                            }`}
                                    >
                                        <Award className={`h-6 w-6 mx-auto mb-1 ${selectedBadge === badge.name ? 'text-blue-600' : 'text-gray-400'}`} />
                                        <p className="text-xs text-center text-gray-700">{badge.name}</p>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                        >
                            Send Recognition
                        </button>
                    </form>
                </div>

                {/* Recent Recognition */}
                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Recognition</h3>

                    <div className="space-y-4">
                        {recentRecognitions.slice(0, 10).map((rec) => (
                            <div key={rec._id} className="border border-gray-200 rounded-lg p-4">
                                <div className="flex items-start justify-between mb-3">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold">
                                            {rec.recipient.name.charAt(0)}
                                        </div>
                                        <div>
                                            <p className="font-semibold text-gray-900">{rec.recipient.name}</p>
                                            <p className="text-xs text-gray-500">{formatDate(rec.createdAt)}</p>
                                        </div>
                                    </div>
                                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getBadgeColor(rec.badgeColor)}`}>
                                        {rec.badge}
                                    </span>
                                </div>
                                <p className="text-sm text-gray-600 mb-2">{rec.message}</p>
                                <p className="text-xs text-gray-500">
                                    From: <span className="font-medium text-gray-700">{rec.giver.name}</span>
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Recognition;
