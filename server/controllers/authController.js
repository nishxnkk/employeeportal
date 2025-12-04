const User = require('../models/User');
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};

// @desc    Auth user & get token
// @route   POST /api/auth/login
// @access  Public
const authUser = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            avatar: user.avatar,
            token: generateToken(user._id),
        });
    } else {
        res.status(401).json({ message: 'Invalid email or password' });
    }
};

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Private/Admin
const registerUser = async (req, res) => {
    const { name, email, password, role, department, designation, avatar, joiningDate, salary, status } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400).json({ message: 'User already exists' });
        return;
    }

    const user = await User.create({
        name,
        email,
        password,
        role: role || 'Employee',
        department,
        designation,
        avatar: avatar || `https://ui-avatars.com/api/?name=${name}&background=random`,
        joiningDate: joiningDate || new Date().toISOString().split('T')[0],
        salary,
        status: status || 'Active'
    });

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            department: user.department,
            designation: user.designation,
            avatar: user.avatar,
            joiningDate: user.joiningDate,
            salary: user.salary,
            status: user.status
        });
    } else {
        res.status(400).json({ message: 'Invalid user data' });
    }
};

// @desc    Get user profile
// @route   GET /api/auth/profile
// @access  Private
const getUserProfile = async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            avatar: user.avatar,
            department: user.department,
            designation: user.designation,
            joiningDate: user.joiningDate
        });
    } else {
        res.status(404).json({ message: 'User not found' });
    }
};

// @desc    Upload user avatar
// @route   POST /api/auth/upload-avatar
// @access  Private
const uploadAvatar = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        // Construct the avatar URL (relative path)
        const avatarUrl = `/uploads/avatars/${req.file.filename}`;

        // Update user's avatar in database
        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.avatar = avatarUrl;
        await user.save();

        res.json({
            avatar: avatarUrl,
            message: 'Avatar uploaded successfully'
        });
    } catch (error) {
        console.error('Upload avatar error:', error);
        res.status(500).json({ message: 'Server error during upload' });
    }
};

module.exports = { authUser, registerUser, getUserProfile, uploadAvatar };
