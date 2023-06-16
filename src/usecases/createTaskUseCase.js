const { createTask } = require('../gateways/jiraGateway');
const fs = require('fs');
const csv = require('csv-parser');

// Create tasks from CSV file
async function createTasksFromCsv(csvFilePath) {
  try {
    const tasks = [];

    fs.createReadStream(csvFilePath)
      .pipe(csv())
      .on('data', (data) => {
        tasks.push(data);
      })
      .on('end', async () => {
        for (const task of tasks) {
          const { projectKey, projectId, issueType, summary, description, duedate, labels } = task;
          await createTask(projectKey, projectId, issueType, summary, description, duedate, labels);
        }
      });
  } catch (error) {
    console.error('Error creating tasks from CSV:', error);
  }
}

module.exports = {
  createTasksFromCsv
};
