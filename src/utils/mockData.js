
export const MOCK_EMPLOYEES = [
    {
        id: 'EMP001',
        name: 'John Doe',
        email: 'john.doe@example.com',
        role: 'Admin',
        department: 'HR',
        position: 'HR Manager',
        joinDate: '2023-01-15',
        salary: 75000,
        status: 'Active',
        avatar: 'https://ui-avatars.com/api/?name=John+Doe&background=0D8ABC&color=fff'
    },
    {
        id: 'EMP002',
        name: 'Jane Smith',
        email: 'jane.smith@example.com',
        role: 'Employee',
        department: 'Engineering',
        position: 'Senior Developer',
        joinDate: '2023-03-10',
        salary: 95000,
        status: 'Active',
        avatar: 'https://ui-avatars.com/api/?name=Jane+Smith&background=random'
    },
    {
        id: 'EMP003',
        name: 'Mike Johnson',
        email: 'mike.johnson@example.com',
        role: 'Employee',
        department: 'Marketing',
        position: 'Marketing Specialist',
        joinDate: '2023-06-20',
        salary: 60000,
        status: 'Active',
        avatar: 'https://ui-avatars.com/api/?name=Mike+Johnson&background=random'
    }
];

export const MOCK_ATTENDANCE = [
    {
        id: 'ATT001',
        employeeId: 'EMP002',
        date: '2023-11-28',
        checkIn: '09:00 AM',
        checkOut: '05:00 PM',
        status: 'Present'
    },
    {
        id: 'ATT002',
        employeeId: 'EMP002',
        date: '2023-11-29',
        checkIn: '09:15 AM',
        checkOut: '05:15 PM',
        status: 'Present'
    },
    {
        id: 'ATT003',
        employeeId: 'EMP003',
        date: '2023-11-29',
        checkIn: '09:30 AM',
        checkOut: '06:00 PM',
        status: 'Present'
    }
];

export const MOCK_LEAVES = [
    {
        id: 'LEAVE001',
        employeeId: 'EMP002',
        type: 'Sick Leave',
        startDate: '2023-12-01',
        endDate: '2023-12-02',
        reason: 'Flu',
        status: 'Pending'
    },
    {
        id: 'LEAVE002',
        employeeId: 'EMP003',
        type: 'Casual Leave',
        startDate: '2023-12-05',
        endDate: '2023-12-05',
        reason: 'Personal work',
        status: 'Approved'
    }
];

export const MOCK_EVENTS = [
    {
        id: 'EVT001',
        title: 'Team Building',
        date: '2023-12-15',
        type: 'Event'
    },
    {
        id: 'EVT002',
        title: 'Christmas Holiday',
        date: '2023-12-25',
        type: 'Holiday'
    }
]
