import * as sqlite3 from 'sqlite3';
sqlite3.verbose();
import * as dotenv from 'dotenv';
dotenv.config();

const db = new sqlite3.Database(process.env.DB_NAME);

export const query = (sql: string, params) => {
	return new Promise((res, rej) => {
		db.all(sql, params, (err, rows) => {
			if (err) rej(err);
			else res(rows);
		});
	});
};

db.on('trace', (msg) => {
	console.log(msg);
});
