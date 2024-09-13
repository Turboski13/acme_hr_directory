const { Client } = require('pg');
const client = new Client('postgres://localhost/acme_notes_db');

module.exports = client;