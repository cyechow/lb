const { Pool, Client } = require('pg');

const pool = new Pool({
	user: 'postgres',
	host: 'localhost',
	database: 'lb',
	password: 'Legolos6',
	port: 5432
});

module.exports = {
	query: (text, params, callback) => {
		const start = Date.now();
		return pool.query(text, params, (err, res) => {
			if (err) {
				console.log(err.stack);
			}
			else {
				const duration = Date.now() - start;
				console.log('executed query', { text, duration, rows: res.rowCount });
			}
			callback(err, res);
		});
	},
	getClient: (callback) => {
		pool.connect((err, client, done) => {
			const query = client.query.bind(client);
			
			// Monkey patch (?) the query method to keep track of the last query executed.
			client.query = () => {
				client.lastQuery = arguments;
				client.query.apply(client, arguments);
			};
			
			// Timeout of 5 seconds, after which we will log this client's last query.
			const timeout = setTimeout(()=> {
				console.error('A client has been checked out for more than 5 seconds!');
				console.error(`The last executed query on this client was: ${client.lastQuery}`);
			}, 5000);
			
			const release = (err) => {
				// Call actual 'done' method, returning this client to the client pool
				done(err);
				
				// Clear our timeout
				clearTimeout(timeout);
				
				// Set query method back to its old un-monkey-patched version
				client.query = query;
			};
			
			callback(err, client, done);
		})
	}
}