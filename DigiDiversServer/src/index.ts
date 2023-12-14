import express, { Express } from 'express';
import dotenv from 'dotenv';
import {
	fetchDigiRouter,
	fetchDoneOrdersInfoRouter,
	fetchDoneZipRouter,
	fetchExampleRouter,
	fetchProcessingOrdersInfoRouter,
	fetchToLabelRouter,
	uploadLDRouter,
	uploadUDRouter,
} from './api';

var cors = require('cors');
const bodyParser = require('body-parser');

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 8080;

// MIDDLE WARE
app.use(cors());
app.options('*', cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// ROUTES
app.use('/api', uploadUDRouter); // will be accessed at https://localhost:8080/api/uploadUD
app.use('/api', uploadLDRouter); // will be accessed at https://localhost:8080/api/uploadUD
app.use('/api', fetchToLabelRouter);
app.use('/api', fetchExampleRouter);
app.use('/api', fetchDoneOrdersInfoRouter);
app.use('/api', fetchProcessingOrdersInfoRouter);
app.use('/api', fetchDigiRouter);
app.use('/api', fetchDoneZipRouter);

app.get('/', (req, res) => {
	// will be accessed at https://localhost:8080/
	res.send('Hello World!');
});

// STARTS SERVER
app.listen(port, () => {
	console.log(`Server started at http://localhost:${port}`);
});
