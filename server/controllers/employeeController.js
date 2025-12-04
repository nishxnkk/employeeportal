const User = require('../models/User');

// @desc    Get all employees
// @route   GET /api/employees
// @access  Private
const getEmployees = async (req, res) => {
    const employees = await User.find({ role: { $ne: 'Admin' } }).select('-password');
    res.json(employees);
};

// @desc    Get employee by ID
// @route   GET /api/employees/:id
// @access  Private
const getEmployeeById = async (req, res) => {
    const employee = await User.findById(req.params.id).select('-password');

    if (employee) {
        res.json(employee);
    } else {
        res.status(404).json({ message: 'Employee not found' });
    }
};

// @desc    Update employee
// @route   PUT /api/employees/:id
// @access  Private/Admin
const updateEmployee = async (req, res) => {
    const employee = await User.findById(req.params.id);

    if (employee) {
        employee.name = req.body.name || employee.name;
        employee.email = req.body.email || employee.email;
        employee.role = req.body.role || employee.role;
        employee.department = req.body.department || employee.department;
        employee.designation = req.body.designation || employee.designation;
        employee.salary = req.body.salary || employee.salary;
        employee.status = req.body.status || employee.status;

        const updatedEmployee = await employee.save();
        res.json({
            _id: updatedEmployee._id,
            name: updatedEmployee.name,
            email: updatedEmployee.email,
            role: updatedEmployee.role,
            department: updatedEmployee.department,
            status: updatedEmployee.status
        });
    } else {
        res.status(404).json({ message: 'Employee not found' });
    }
};

// @desc    Delete employee
// @route   DELETE /api/employees/:id
// @access  Private/Admin
const deleteEmployee = async (req, res) => {
    const employee = await User.findById(req.params.id);

    if (employee) {
        await employee.deleteOne();
        res.json({ message: 'Employee removed' });
    } else {
        res.status(404).json({ message: 'Employee not found' });
    }
};

module.exports = { getEmployees, getEmployeeById, updateEmployee, deleteEmployee };
