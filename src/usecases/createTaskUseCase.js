const { createTask } = require('../gateways/jiraGateway');
const fs = require('fs');

// Create tasks from CSV file
async function createTasksFromCsv(csvFilePath) {
  try {
    const csvData = fs.readFileSync(csvFilePath, 'utf-8');
    const tasks = csvData.split('\n').slice(1); // Exclude header row

    for (const task of tasks) {
      const [projectKey, projectId, issueType, summary, description, duedate, labels] = task.split(',');

      await createTask(projectKey, projectId, issueType, summary, description, duedate, labels);
    }
  } catch (error) {
    console.error('Error creating tasks from CSV:', error);
  }
}

// Create tasks from JSON file
async function createTasksFromJson(jsonFilePath) {
  try {
    const jsonData = fs.readFileSync(jsonFilePath, 'utf-8');
    const tasks = JSON.parse(jsonData);

    for (const task of tasks) {
      const { projectKey, projectId, issueType, summary, description, duedate, labels } = task;

      await createTask(projectKey, projectId, issueType, summary, description, duedate, labels);
    }
  } catch (error) {
    console.error('Error creating tasks from JSON:', error);
  }
}

module.exports = {
  createTasksFromCsv,
  createTasksFromJson
};
