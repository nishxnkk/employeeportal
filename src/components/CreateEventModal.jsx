import { useState } from 'react';
import { X } from 'lucide-react';

const CreateEventModal = ({ onClose, onCreate }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: 'Conference',
        startDate: '',
        endDate: '',
        location: '',
        imageUrl: '',
        capacity: 100,
        registrationDeadline: ''
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error for this field
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const validate = () => {
        const newErrors = {};

        if (!formData.title.trim()) newErrors.title = 'Title is required';
        if (!formData.description.trim()) newErrors.description = 'Description is required';
        if (!formData.startDate) newErrors.startDate = 'Start date is required';
        if (!formData.endDate) newErrors.endDate = 'End date is required';
        if (!formData.location.trim()) newErrors.location = 'Location is required';
        if (!formData.registrationDeadline) newErrors.registrationDeadline = 'Registration deadline is required';

        if (formData.startDate && formData.endDate) {
            if (new Date(formData.endDate) < new Date(formData.startDate)) {
                newErrors.endDate = 'End date must be after start date';
            }
        }

        if (formData.registrationDeadline && formData.startDate) {
            if (new Date(formData.registrationDeadline) > new Date(formData.startDate)) {
                newErrors.registrationDeadline = 'Registration deadline must be before start date';
            }
        }

        if (formData.capacity < 1) {
            newErrors.capacity = 'Capacity must be at least 1';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validate()) {
            onCreate(formData);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                    <h2 className="text-2xl font-bold text-gray-900">Create New Event</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    {/* Title */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Event Title *
                        </label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.title ? 'border-red-500' : 'border-gray-300'
                                }`}
                            placeholder="e.g., HR Leadership Summit 2024"
                        />
                        {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Description *
                        </label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows={3}
                            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.description ? 'border-red-500' : 'border-gray-300'
                                }`}
                            placeholder="Describe the event..."
                        />
                        {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
                    </div>

                    {/* Category */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Category *
                        </label>
                        <select
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                            <option value="Conference">Conference</option>
                            <option value="Workshop">Workshop</option>
                            <option value="Expo">Expo</option>
                            <option value="Forum">Forum</option>
                            <option value="Symposium">Symposium</option>
                        </select>
                    </div>

                    {/* Dates Row */}
                    <div className="grid grid-cols-2 gap-4">
                        {/* Start Date */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Start Date *
                            </label>
                            <input
                                type="date"
                                name="startDate"
                                value={formData.startDate}
                                onChange={handleChange}
                                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.startDate ? 'border-red-500' : 'border-gray-300'
                                    }`}
                            />
                            {errors.startDate && <p className="text-red-500 text-xs mt-1">{errors.startDate}</p>}
                        </div>

                        {/* End Date */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                End Date *
                            </label>
                            <input
                                type="date"
                                name="endDate"
                                value={formData.endDate}
                                onChange={handleChange}
                                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.endDate ? 'border-red-500' : 'border-gray-300'
                                    }`}
                            />
                            {errors.endDate && <p className="text-red-500 text-xs mt-1">{errors.endDate}</p>}
                        </div>
                    </div>

                    {/* Location */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Location *
                        </label>
                        <input
                            type="text"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.location ? 'border-red-500' : 'border-gray-300'
                                }`}
                            placeholder="e.g., San Francisco Conference Center"
                        />
                        {errors.location && <p className="text-red-500 text-xs mt-1">{errors.location}</p>}
                    </div>

                    {/* Image URL */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Image URL (Optional)
                        </label>
                        <input
                            type="url"
                            name="imageUrl"
                            value={formData.imageUrl}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="https://example.com/image.jpg"
                        />
                    </div>

                    {/* Capacity and Registration Deadline Row */}
                    <div className="grid grid-cols-2 gap-4">
                        {/* Capacity */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Capacity *
                            </label>
                            <input
                                type="number"
                                name="capacity"
                                value={formData.capacity}
                                onChange={handleChange}
                                min="1"
                                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.capacity ? 'border-red-500' : 'border-gray-300'
                                    }`}
                            />
                            {errors.capacity && <p className="text-red-500 text-xs mt-1">{errors.capacity}</p>}
                        </div>

                        {/* Registration Deadline */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Registration Deadline *
                            </label>
                            <input
                                type="date"
                                name="registrationDeadline"
                                value={formData.registrationDeadline}
                                onChange={handleChange}
                                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.registrationDeadline ? 'border-red-500' : 'border-gray-300'
                                    }`}
                            />
                            {errors.registrationDeadline && <p className="text-red-500 text-xs mt-1">{errors.registrationDeadline}</p>}
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            Create Event
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateEventModal;
