import { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import EventCard from '../components/EventCard';
import CreateEventModal from '../components/CreateEventModal';
import api from '../utils/api';

const Events = () => {
    const [events, setEvents] = useState([]);
    const [filteredEvents, setFilteredEvents] = useState([]);
    const [activeTab, setActiveTab] = useState('all');
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);

    useEffect(() => {
        fetchEvents();
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        console.log('DEBUG - User Info:', userInfo);
        console.log('DEBUG - User Role:', userInfo?.role);
        console.log('DEBUG - Is Admin?:', userInfo?.role === 'Admin');
        setUser(userInfo);
    }, []);

    useEffect(() => {
        filterEvents();
    }, [activeTab, events]);

    const fetchEvents = async () => {
        try {
            setLoading(true);
            const { data } = await api.get('/events');
            setEvents(data);
        } catch (error) {
            console.error('Error fetching events:', error);
        } finally {
            setLoading(false);
        }
    };

    const filterEvents = () => {
        const now = new Date();

        if (activeTab === 'all') {
            setFilteredEvents(events);
        } else if (activeTab === 'upcoming') {
            const upcoming = events.filter(event => new Date(event.startDate) >= now);
            setFilteredEvents(upcoming);
        } else if (activeTab === 'past') {
            const past = events.filter(event => new Date(event.endDate) < now);
            setFilteredEvents(past);
        }
    };

    const handleRegister = async (eventId) => {
        try {
            await api.post(`/events/${eventId}/register`);
            alert('Registered successfully! ✓');
            fetchEvents(); // Refresh events
        } catch (error) {
            console.error('Error registering for event:', error);
            alert(error.response?.data?.message || 'Failed to register for event');
        }
    };

    const handleUnregister = async (eventId) => {
        try {
            await api.delete(`/events/${eventId}/register`);
            fetchEvents(); // Refresh events
        } catch (error) {
            console.error('Error unregistering from event:', error);
            alert(error.response?.data?.message || 'Failed to unregister from event');
        }
    };

    const handleCreateEvent = async (eventData) => {
        try {
            await api.post('/events', eventData);
            setShowCreateModal(false);
            fetchEvents(); // Refresh events
        } catch (error) {
            console.error('Error creating event:', error);
            alert(error.response?.data?.message || 'Failed to create event');
        }
    };

    const getTabCounts = () => {
        const now = new Date();
        const upcoming = events.filter(event => new Date(event.startDate) >= now).length;
        const past = events.filter(event => new Date(event.endDate) < now).length;

        return {
            all: events.length,
            upcoming,
            past
        };
    };

    const counts = getTabCounts();

    return (
        <div className="p-8">
            {/* Header */}
            <div className="flex justify-between items-start mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Events</h1>
                    <p className="text-gray-600">Discover professional HR events and conferences</p>
                </div>
                {/* DEBUG: Showing button unconditionally to test */}
                <button
                    onClick={() => setShowCreateModal(true)}
                    className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                    <Plus size={20} />
                    Create Event {user?.role ? `(Role: ${user.role})` : '(No role found)'}
                </button>
            </div>

            {/* Tabs */}
            <div className="flex gap-6 border-b border-gray-200 mb-8">
                <button
                    onClick={() => setActiveTab('all')}
                    className={`pb-3 px-1 font-medium transition-colors relative ${activeTab === 'all'
                        ? 'text-blue-600'
                        : 'text-gray-600 hover:text-gray-900'
                        }`}
                >
                    All
                    {activeTab === 'all' && (
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />
                    )}
                </button>
                <button
                    onClick={() => setActiveTab('upcoming')}
                    className={`pb-3 px-1 font-medium transition-colors relative ${activeTab === 'upcoming'
                        ? 'text-blue-600'
                        : 'text-gray-600 hover:text-gray-900'
                        }`}
                >
                    Upcoming
                    <span className="ml-2 text-sm text-gray-500">{counts.upcoming}</span>
                    {activeTab === 'upcoming' && (
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />
                    )}
                </button>
                <button
                    onClick={() => setActiveTab('past')}
                    className={`pb-3 px-1 font-medium transition-colors relative ${activeTab === 'past'
                        ? 'text-blue-600'
                        : 'text-gray-600 hover:text-gray-900'
                        }`}
                >
                    Past
                    <span className="ml-2 text-sm text-gray-500">{counts.past}</span>
                    {activeTab === 'past' && (
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />
                    )}
                </button>
            </div>

            {/* Events Grid */}
            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="text-gray-500">Loading events...</div>
                </div>
            ) : filteredEvents.length === 0 ? (
                <div className="flex justify-center items-center h-64">
                    <div className="text-gray-500">No events found</div>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredEvents.map(event => (
                        <EventCard
                            key={event._id}
                            event={event}
                            onRegister={handleRegister}
                            onUnregister={handleUnregister}
                            currentUserId={user?._id}
                        />
                    ))}
                </div>
            )}

            {/* Create Event Modal */}
            {showCreateModal && (
                <CreateEventModal
                    onClose={() => setShowCreateModal(false)}
                    onCreate={handleCreateEvent}
                />
            )}
        </div>
    );
};

export default Events;
