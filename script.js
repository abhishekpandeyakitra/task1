const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const app = express();

const employeeRoutes = require('./routes/emp');
const departmentRoutes = require('./routes/dep');
app.use(express.json());


app.use(employeeRoutes);
app.use(departmentRoutes);



const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});