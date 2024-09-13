const express = require('express')
const app = express()
const { getEmployees, createEmployee } = require('./db/employees.js');  

// parse the body into JS Objects
app.use(express.json())

app.get('/', (req, res, next) => {
  res.send('Employee and Department DB!');
})

// Log the requests as they come in
app.use(require('morgan')('dev'))

// Create employees
app.get('/api/v1/pets', async(req, res, next) => {
  try {
    const allEmployees = await getEmployees();

    res.send(allEmployees);
  } catch(err) {
    console.log()
  }
});

app.post('/api/v1/employees', async(req, res, next) => {
  const createdEmployee = await createEmployee(req.body.name, null)
  res.send(createdEmployee);
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`listening on port ${PORT}`));
