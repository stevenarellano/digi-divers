import dotenv from 'dotenv';
import { Connection, createConnection } from 'mysql';

dotenv.config();

export const DB_CONNECTION: Connection = createConnection({
	host: process.env.RDS_HOSTNAME,
	user: process.env.RDS_USERNAME,
	password: process.env.RDS_PASSWORD,
	port: Number(process.env.RDS_PORT!),
});

export const DEBUG_MODE = true;
