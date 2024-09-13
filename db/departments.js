const client = require('./client.js');

const createDepartment = async(departmentName) => {
  try {
    const { rows } = await client.query(`
      INSERT INTO department (name)
      VALUES ('${departmentName}')
      RETURNING *;  
    `);
    const department = rows[0];
    return department;
  } catch(err) {
    console.log('ERROR CREATING DEPARTMENT: ', err);
  }
}

module.exports = {
  createDepartment: createDepartment
}