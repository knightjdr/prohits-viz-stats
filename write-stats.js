import fs from 'fs';

const yearMonthDay = (time) => {
  const date = time ? new Date(time) : new Date();
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return `${year}-${month}-${day}`;
};

const writeStats = (stats) => (
  new Promise((resolve) => {
    const date = yearMonthDay();
    const stream = fs.createWriteStream(`./output/stats-${date}.txt`, 'utf8');

    // Write file stats
    stream.write('File\n');
    stream.write(`max: ${stats.files.max}\n`);
    stream.write(`median: ${stats.files.median}\n`);
    stream.write(`min: ${stats.files.min}\n`);

    stream.write('\nFile types\n');
    const fileTypeKeys = Object.keys(stats.fileTypes);
    fileTypeKeys.sort();
    fileTypeKeys.forEach((key) => {
      stream.write(`${key}: ${stats.fileTypes[key]}\n`);
    });

    // Write task stats
    stream.write('\nTasks\n');
    const taskKeys = Object.keys(stats.tasks);
    taskKeys.sort();
    taskKeys.forEach((key) => {
      stream.write(`${key}: ${stats.tasks[key]}\n`);
    });

    // Write tool stats
    stream.write('\nTools\n');
    const toolKeys = Object.keys(stats.tools);
    toolKeys.sort();
    toolKeys.forEach((key) => {
      stream.write(`${key}: ${stats.tools[key]}\n`);
    });

    // Write origin stats
    stream.write('\nOrigins\n');
    const originKeys = Object.keys(stats.origins);
    originKeys.sort();
    originKeys.forEach((key) => {
      stream.write(`${key}: ${stats.origins[key]}\n`);
    });

    stream.on('finish', () => {
      resolve();
    });
  })
);

export default writeStats;
