import fs from 'fs/promises'

const getLatestFileName = async (folder) => {
  const files = await fs.readdir(folder);

  const dates = files.map((file) => extractDate(file));
  const sortedDates = [...dates].sort((a, b) => b - a);
  
  const latestFileIndex = dates.findIndex(date => date === sortedDates[0]);
  return files[latestFileIndex];
};

const re = new RegExp(/(\d{4}-\d{2}-\d{2})/);

const extractDate = (dateString) => {
  const [year, month, day] = dateString.match(re)[0].split('-');
  return new Date(year, month - 1, day);
}

export default getLatestFileName;
