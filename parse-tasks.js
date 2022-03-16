import median from './median.js';

const parseTasks = (tasks, startDate) => {
  const fileSizes = [];
  const fileTypes = {};
  const originBreakdown = {};
  const taskBreakdown = {};
  const toolBreakdown = {}

  tasks.forEach((task) => {
    const { file, fileSize, fileType, date, origin, path, tool } = task;
    const taskDate = new Date(date);
    if (taskDate.getTime() >= startDate.getTime()) {
      const fileTypeKey = fileType || 'not-specified';
      const taskType = defineTaskType(path);
      const toolType = tool || 'thirdPartyViz';

      fileTypes[fileTypeKey] = fileTypes[fileTypeKey] ? fileTypes[fileTypeKey] + 1 : 1;
      originBreakdown[origin] = originBreakdown[origin] ? originBreakdown[origin] + 1 : 1;
      taskBreakdown[taskType] = taskBreakdown[taskType] ? taskBreakdown[taskType] + 1 : 1;
      toolBreakdown[toolType] = toolBreakdown[toolType] ? toolBreakdown[toolType] + 1 : 1;

      if (file) {
        fileSizes.push(fileSize)
      }
    }
  })

  const fileBreakdown = {
    max: `${(Math.max(...fileSizes) / 1_000_000).toFixed(2)}MB`,
    median: `${(median(fileSizes) / 1_000).toFixed(2)}KB`,
    min: `${(Math.min(...fileSizes) / 1_000).toFixed(2)}KB`,
  }
  
  return {
    files: fileBreakdown,
    fileTypes,
    origins: originBreakdown,
    tasks: taskBreakdown,
    tools: toolBreakdown,
  }
};

const defineTaskType = (path) => {
  if (path.startsWith('/analysis/utility')) {
    return 'utility';
  } if (path.startsWith('/analysis/viz')) {
    return 'visualization';
  } if (path.startsWith('/third-party/viz')) {
    return 'thirdPartyViz';
  } if (path.startsWith('/analysis')) {
    return 'analysis';
  } 
  return 'unknown';
}

export default parseTasks;
