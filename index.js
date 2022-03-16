import getLatestFileName from './get-latest-file-name.js';
import parseTasks from './parse-tasks.js';
import readJSON from './read-json.js';
import writeStats from './write-stats.js';

// The new site became official (old site taken down) on July 19, 2021
const TRACKING_START_DATE = new Date(2021, 6, 19);
const TRACKING_FOLDER = './tracking-backup';

let fileName = process.argv[2];
if (!fileName) {
  fileName = await getLatestFileName(TRACKING_FOLDER);
  fileName = `${TRACKING_FOLDER}/${fileName}`;
} 
const tasks = await readJSON(fileName);
const stats = parseTasks(tasks, TRACKING_START_DATE);
await writeStats(stats);
