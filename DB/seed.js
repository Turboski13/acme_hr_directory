const client = require('./client.js');
const { createEmployee } = require('./employees.js');
const { createDepartment } = require('./departments.js');

const dropTables = async() => {
  try {
    console.log('DROPPING TABLES!');

    await client.query(`
      DROP TABLE IF EXISTS employees;
      DROP TABLE IF EXISTS departments;
    `);

    console.log('TABLES DROPPED!');
  } catch(err) {
    console.log('ERROR DROPPING TABLES: ', err);
  }
}

const createTables = async() => {
  try {
    console.log('CREATING TABLES!');

    await client.query(`
        CREATE TABLE departments (
          id SERIAL PRIMARY KEY,
          name VARCHAR(30)
        );

        CREATE TABLE employeess (
          id SERIAL PRIMARY KEY,
          name VARCHAR(30) NOT NULL,
          created_at TIMESTAMP DEFAULT now(),
          updated_at TIMESTAMP DEFAULT now(),
          department_id INTEGER REFERENCES owners(id)
        );
    `);

    console.log('TABLES CREATED!');
  } catch(err) {
    console.log('ERROR CREATING TABLES: ', err);
  }
}

const syncAndSeed = async() => {
  await client.connect();
  console.log('CONNECTED!');

  await dropTables();
  await createTables();

  const qa = await createDepartment('Quality Assurance');
  const frp = await createDepartment('Facilities Resource Planning');
  const supc = await createDepartment('Supply Chain');
  const iandp = await createDepartment('Inspection and Packaging');
  const fac = await createDepartment('Facilities and Engineering');
  const qclabmgt = await createDepartment('Laboratory and Quality Control');
  console.log('DEPARTMENTS CREATED!');

  await createEmployee('Taylor', qa.id);
  await createEmployee('Dez', qa.id);
  await createEmployee('Derek', frp.id);
  await createEmployee('Niki', frp.id);
  await createEmployee('Jeremy', fac.id);
  await createEmployee('Dilley', fac.id);
  await createEmployee('James', qclabmgt.id);
  await createEmployee('Jen', qclabmgt.id);
  await createEmployee('Steven', null);
  console.log('EMPLOYEES CREATED!');

  client.end();
  console.log('CONNECTION CLOSED');
}

syncAndSeed();