const { createTask, INVESTMENT_PROFILE_LABELS } = require('../gateways/jiraGateway');
const fs = require('fs');

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Create tasks from CSV file
async function createTasksFromCsv(csvFilePath) {
  try {
    const csvData = fs.readFileSync(csvFilePath, 'utf-8');
    const tasks = csvData.split('\n').slice(1); // Exclude header row

    for (const task of tasks) {
      const [projectKey, projectId, issueType, summary, description, duedate, labels] = task.split(',');

      await createTask(projectKey, projectId, issueType, summary, description, duedate, labels);
      await delay(500);
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

      const investmentProfile = task.investmentProfile || "NONE";

      await createTask(projectKey, projectId, issueType, summary, description, duedate, labels, investmentProfile);
      await delay(500);
    }
  } catch (error) {
    console.error('Error creating tasks from JSON:', error);
  }
}

module.exports = {
  createTasksFromCsv,
  createTasksFromJson
};
