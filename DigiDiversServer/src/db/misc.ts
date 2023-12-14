import { DB_CONNECTION } from '../constants';
import { clearExampleBin } from './example_bin';
import { clearLabeledData } from './labeled_data';
import { clearQueue } from './queue';
import { clearTasks } from './tasks';

function setDB() {
	if (DB_CONNECTION.state === 'connected') {
		DB_CONNECTION.connect((err) => {
			if (err) {
				console.error('error connecting: ' + err.stack);
				return;
			}
		});
	}

	DB_CONNECTION.query('USE digi');
}

function resetDBTables() {
	clearQueue();
	clearLabeledData();
	clearExampleBin();
	clearTasks();
}

function closeDB() {
	DB_CONNECTION.end();
}

export { setDB, closeDB, resetDBTables };
