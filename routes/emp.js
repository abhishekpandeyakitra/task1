const express = require('express');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const router = express.Router();


// Create an employee
router.post('/employees', async (req, res) => {
  try {
    const { name, email, departmentId } = req.body;
    const employee = await prisma.employee.create({
      data: {
        name,
        email,
        departmentId,
      },
    });
    res.json({
      id: employee.id,
      name: name,
      email: email,
      departmentId: departmentId,
    });
  } catch (error) {
    res.status(500).json({ error: 'Error creating employee' });
  }
});


// Get all employees(Read)
router.get('/employees/read', async (req, res) => {
  try {
    const employees = await prisma.employee.findMany();
//   sorting the employees by name(ascending order)
  employees.sort((a, b) => a.name.localeCompare(b.name));

    res.json(employees);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving employees' });
  }
});

// Update an employee
router.put('/employees/update/:id', async (req, res) => {
  const { id } = req.params;
  const { name, email, departmentId } = req.body;
  try {
    const employee = await prisma.employee.update({
      where: { id: parseInt(id) },
      data: {
        name,
        email,
        departmentId,
      },
    });
    res.json(employee);
  } catch (error) {
    res.status(500).json({ error: 'Error updating employee' });
  }
});

// Delete an employee
router.delete('/employees/delete/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.employee.delete({
      where: { id: parseInt(id) },
    });
    res.json({ message: 'Employee deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting employee' });
  }
});

module.exports = router;

