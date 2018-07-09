
const dbConfig = {
  user: 'postgres',
  password: 'Legolos6',
  database: 'lb',
  host: 'localhost',
  port: 5432,
  idleTimeoutMillis: 1000
};

const { Pool, Client } = require('pg');
const connectionString = process.env.DATABASE_URL || 'postgres://postgres:Legolos6@localhost:5432/lb';

const pool = new Pool(dbConfig)
const client = new Client(dbConfig);

/*
pool.query('CREATE TABLE users(id SERIAL PRIMARY KEY, username VARCHAR(40) not null, password VARCHAR(256) not null)', async(err, res) => {
	console.log(err, res)
	await pool.end()
});
*/

/*
pool.query('CREATE TABLE items(id SERIAL PRIMARY KEY, item VARCHAR(40) not null, count INTEGER)', async(err, res) => {
	console.log(err, res)
	await pool.end()
});
*/

/*
pool.query('CREATE TABLE orders(id SERIAL PRIMARY KEY, orderId SERIAL, clientName VARCHAR(40) not null, orderStatus VARCHAR(256) not null)', async(err, res) => {
	console.log(err, res)
	await pool.end()
});
*/

/*
pool.query('DROP TABLE orders', async(err, res) => {
	console.log(err, res)
	await pool.end()
});
*/

//await client.connect();

//const res = await client.query('CREATE TABLE items(id SERIAL PRIMARY KEY, item VARCHAR(40) not null, count INT)');
//await client.end();


//client.connect();
//const query = client.query(
//  'CREATE TABLE items(id SERIAL PRIMARY KEY, text VARCHAR(40) not null, complete BOOLEAN)');
//query.on('end', () => { client.end(); });