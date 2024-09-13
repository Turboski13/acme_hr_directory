const client = require('./client.js');

const createEmployee = async(employeeName, departmentId) => {
  try {
    const { rows } = await client.query(`
      INSERT INTO employees (name, department_id)
      VALUES ('${employeeName}', ${departmentId})
      RETURNING *;
    `);

    return rows[0];
  } catch(err) {
    console.log('ERROR CREATING AN EMPLOYEE: ', err);
  }
}

const getEmployees = async() => {
  try {
    const { rows } = await client.query(`
      SELECT * FROM employees;
    `);
    return rows;
  } catch(err) {
    console.log('ERROR GETTING EMPLOYEES: ', err);
  }
}

module.exports = {
  createEmployee: createEmployee,
  getEmployees: getEmployees
}