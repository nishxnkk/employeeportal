import { createContext, useState, useMemo, useEffect } from 'react';
import api from '../utils/api';

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const [employees, setEmployees] = useState([]);
    const [attendance, setAttendance] = useState([]);
    const [leaves, setLeaves] = useState([]);
    const [events, setEvents] = useState([]);
    const [feedItems, setFeedItems] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Listen for auth success event to fetch data
        const handleAuthSuccess = () => {
            fetchAllData();
        };

        window.addEventListener('auth-success', handleAuthSuccess);

        return () => {
            window.removeEventListener('auth-success', handleAuthSuccess);
        };
    }, []);

    const fetchAllData = async () => {
        setLoading(true);
        try {
            const [employeesRes, eventsRes, feedRes] = await Promise.all([
                api.get('/employees'),
                api.get('/events'),
                api.get('/feed')
            ]);
            setEmployees(employeesRes.data);
            setEvents(eventsRes.data);
            setFeedItems(feedRes.data);
        } catch (error) {
            console.error('Failed to fetch data:', error);
        } finally {
            setLoading(false);
        }
    };

    const addEmployee = async (employee) => {
        try {
            const { data } = await api.post('/auth/register', employee);
            console.log('Employee added:', data);
            setEmployees(prevEmployees => [...prevEmployees, data]);
            return { success: true };
        } catch (error) {
            console.error('Failed to add employee:', error);
            return { success: false, message: error.response?.data?.message };
        }
    };

    const updateEmployee = async (id, updatedData) => {
        try {
            const { data } = await api.put(`/employees/${id}`, updatedData);
            setEmployees(employees.map(emp => emp._id === id ? data : emp));
            return { success: true };
        } catch (error) {
            console.error('Failed to update employee:', error);
            return { success: false };
        }
    };

    const deleteEmployee = async (id) => {
        try {
            await api.delete(`/employees/${id}`);
            setEmployees(employees.filter(emp => emp._id !== id));
            return { success: true };
        } catch (error) {
            console.error('Failed to delete employee:', error);
            return { success: false };
        }
    };

    const addAttendance = async (record) => {
        try {
            const { data } = await api.post('/attendance/check-in', record);
            setAttendance([...attendance, data]);
            return { success: true };
        } catch (error) {
            console.error('Failed to add attendance:', error);
            return { success: false, message: error.response?.data?.message };
        }
    };

    const addLeave = async (leave) => {
        try {
            const { data } = await api.post('/leaves', leave);
            setLeaves([...leaves, data]);
            return { success: true };
        } catch (error) {
            console.error('Failed to add leave:', error);
            return { success: false };
        }
    };

    const updateLeaveStatus = async (id, status) => {
        try {
            const { data } = await api.put(`/leaves/${id}/status`, { status });
            setLeaves(leaves.map(leave => leave._id === id ? data : leave));
            return { success: true };
        } catch (error) {
            console.error('Failed to update leave:', error);
            return { success: false };
        }
    };

    const addEvent = async (event) => {
        try {
            const { data } = await api.post('/events', event);
            setEvents([...events, data]);
            return { success: true };
        } catch (error) {
            console.error('Failed to add event:', error);
            return { success: false };
        }
    };

    const deleteEvent = async (id) => {
        try {
            await api.delete(`/events/${id}`);
            setEvents(events.filter(event => event._id !== id));
            return { success: true };
        } catch (error) {
            console.error('Failed to delete event:', error);
            return { success: false };
        }
    };

    const addFeedItem = async (item) => {
        try {
            const { data } = await api.post('/feed', item);
            setFeedItems([data, ...feedItems]);
            return { success: true };
        } catch (error) {
            console.error('Failed to add feed item:', error);
            return { success: false };
        }
    };

    const toggleLike = async (id) => {
        try {
            const { data } = await api.put(`/feed/${id}/like`);
            setFeedItems(feedItems.map(item =>
                item._id === id ? { ...item, likes: data.likes } : item
            ));
            return { success: true };
        } catch (error) {
            console.error('Failed to toggle like:', error);
            return { success: false };
        }
    };

    const addComment = async (id, comment) => {
        try {
            const { data } = await api.post(`/feed/${id}/comment`, { text: comment });
            setFeedItems(feedItems.map(item =>
                item._id === id ? data : item
            ));
            return { success: true };
        } catch (error) {
            console.error('Failed to add comment:', error);
            return { success: false };
        }
    };

    const deleteFeedItem = async (id) => {
        try {
            await api.delete(`/feed/${id}`);
            setFeedItems(feedItems.filter(item => item._id !== id));
            return { success: true };
        } catch (error) {
            console.error('Failed to delete feed item:', error);
            return { success: false };
        }
    };

    const value = useMemo(() => ({
        employees,
        attendance,
        leaves,
        events,
        feedItems,
        loading,
        fetchAllData,
        addEmployee,
        updateEmployee,
        deleteEmployee,
        addAttendance,
        addLeave,
        updateLeaveStatus,
        addEvent,
        deleteEvent,
        addFeedItem,
        toggleLike,
        addComment,
        deleteFeedItem
    }), [employees, attendance, leaves, events, feedItems, loading]);

    return (
        <DataContext.Provider value={value}>
            {children}
        </DataContext.Provider>
    );
};
