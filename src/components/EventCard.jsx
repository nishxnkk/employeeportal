import { Calendar, MapPin, Users } from 'lucide-react';
import { format } from 'date-fns';

const EventCard = ({ event, onRegister, onUnregister, currentUserId }) => {
    const isRegistered = event.attendees?.some(attendee =>
        attendee._id === currentUserId || attendee === currentUserId
    );

    const attendeeCount = event.attendees?.length || 0;
    const isFull = attendeeCount >= event.capacity;
    const isPast = new Date(event.endDate) < new Date();

    const formatDateRange = () => {
        const start = new Date(event.startDate);
        const end = new Date(event.endDate);

        if (start.toDateString() === end.toDateString()) {
            return format(start, 'MMMM d, yyyy');
        } else {
            return `${format(start, 'MMM d')}-${format(end, 'd, yyyy')}`;
        }
    };

    const getCategoryColor = () => {
        const colors = {
            Conference: 'bg-blue-100 text-blue-700',
            Workshop: 'bg-purple-100 text-purple-700',
            Expo: 'bg-green-100 text-green-700',
            Forum: 'bg-orange-100 text-orange-700',
            Symposium: 'bg-pink-100 text-pink-700'
        };
        return colors[event.category] || 'bg-gray-100 text-gray-700';
    };

    const handleButtonClick = () => {
        if (isRegistered) {
            onUnregister(event._id);
        } else {
            onRegister(event._id);
        }
    };

    const getButtonText = () => {
        if (isPast) return 'Event Ended';
        if (isFull) return 'Event Full';
        if (isRegistered) return 'Unregister';
        return 'Register Now';
    };

    const isButtonDisabled = isPast || (isFull && !isRegistered);

    return (
        <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden border border-gray-100">
            {/* Event Image */}
            <div className="relative h-48 bg-gray-200">
                {event.imageUrl ? (
                    <img
                        src={event.imageUrl}
                        alt={event.title}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-500 to-blue-600">
                        <Calendar size={48} className="text-white opacity-50" />
                    </div>
                )}

                {/* Category Badge */}
                <div className="absolute top-3 left-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor()}`}>
                        {event.category}
                    </span>
                </div>

                {/* Attendee Count Badge */}
                {attendeeCount > 0 && (
                    <div className="absolute top-3 right-3 bg-black bg-opacity-75 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                        <Users size={12} />
                        {attendeeCount}+
                    </div>
                )}
            </div>

            {/* Event Details */}
            <div className="p-5">
                {/* Date */}
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                    <Calendar size={16} />
                    <span>{formatDateRange()}</span>
                </div>

                {/* Title */}
                <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                    {event.title}
                </h3>

                {/* Location */}
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                    <MapPin size={16} />
                    <span className="line-clamp-1">{event.location}</span>
                </div>

                {/* Description */}
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                    {event.description}
                </p>

                {/* Register Button */}
                <button
                    onClick={handleButtonClick}
                    disabled={isButtonDisabled}
                    className={`w-full py-2.5 px-4 rounded-lg font-medium transition-colors ${isRegistered
                        ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        : isButtonDisabled
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            : 'bg-blue-600 text-white hover:bg-blue-700'
                        }`}
                >
                    {getButtonText()}
                </button>

                {/* Registration Info */}
                {!isPast && (
                    <div className="mt-2 text-xs text-gray-500 text-center">
                        {attendeeCount}/{event.capacity} registered
                    </div>
                )}
            </div>
        </div>
    );
};

export default EventCard;
