import { Connection } from 'mysql';

export function connectToDB(connection: Connection) {
	connection.connect(function (err: any) {
		if (err) {
			console.error('Database connection failed: ' + err.stack);
			return;
		}

		console.log('Connected to database.');
	});

	connection.query('USE digi');
}
