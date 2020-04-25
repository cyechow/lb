const { Pool, Client } = require('pg');

const sgMail = require('@sendgrid/mail');

const pool = new Pool({
	user: 'edith.chow',
	host: 'localhost',
	database: 'lb',
	password: '523pFW2DaQEgc5',
	port: 5432
});

// Test connection:
const testGet = (req, res ) => {
    console.log('Request received.')
    res.status(201).send('Request received.')
}

const createAccount = (req, res) => {
	var jsonReq = req.body
	var username = jsonReq.username
	var pw = jsonReq.password
	console.log(jsonReq)
	pool.query(
		'INSERT INTO users(username, password) VALUES ($1, crypt($2, gen_salt($3)));',
		[username, pw, 'bf'])
		.then( results => {
			console.log('Successfully created account for ' + username)
			res.status(201).send('Account created.')
		})
		.catch( err => {
			console.log(err)
			res.status(500).send('Error creating account for user ' + username)
		})
}

const createClient = (req, res) => {
	var jsonReq = req.body
	var name = jsonReq.name
	var email = jsonReq.email
	pool.query(
		'INSERT INTO clients(name, email) VALUES ($1, $2);',
		[name, email])
		.then( results => {
			res.status(201).send('Client created.')
		})
		.catch( err => {
			res.status(500).send('Error creating client.')
		})
}

const getClientList = (req, res) => {
	pool.query(
		'SELECT * FROM clients')
		.then( results => {
			var clist = []
			for (row in results.rows)
			{
				clist.push({
					"Name": row.name,
					"Email": row.email,
					"Account Opened": row.datecreated
				})
			}

			console.log('Client list: ' + JSON.stringify(clist))
			res.status(201).send(JSON.stringify(clist))
		})
		.catch( err => {
			res.status(500).send('Error retrieving client list.')
		})
}

const securityCheck = (req, res) => {
	var jsonReq = req.body
	var username = jsonReq.username
	var pw = jsonReq.password
	console.log(jsonReq)
	pool.query(
		'SELECT (password = crypt($2, password)) AS pwd_match FROM users WHERE username = $1',
		[username, pw])
		.then( results => {
			for (row of results.rows)
			{
				res.status(201).send(row.pwd_match)
			}
		})
		.catch( err => {
			console.log(err)
			res.status(500).send('Error performing security check for ' + username)
		})
}

module.exports = {
    testGet,
	createAccount,
	createClient,
	getClientList,
	securityCheck
}