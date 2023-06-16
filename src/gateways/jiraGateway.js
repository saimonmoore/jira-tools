const JiraClient = require('jira-client');
require('dotenv').config();

// Configure Jira API client
const jira = new JiraClient({
  host: process.env.JIRA_HOST,
  protocol: 'https',
  apiVersion: '2',
  strictSSL: false,
  username: process.env.JIRA_USERNAME,
  password: process.env.JIRA_PASSWORD
});

const ISSUE_TYPES = {
  "Bug": 1,
  "Epic": 23,
  "Highlevel Testcase": 20,
  "Investigation": 10500,
  "Portability Testcase": 30,
  "Task": 3,
  "Technical Debt": 13700,
  "Training": 11603,
  "User Story": 13,
  "Lowlevel Testcase": 21,
  "Sub-Task": 5
}

// Create a task
async function createTask(projectKey, projectId, issueType, summary, description, duedate, labels) {
  console.log(`Creating task: `, {
    projectKey, projectId, issueType, summary, description, duedate, labels
  });

  try {
    const issue = await jira.addNewIssue({
      fields: {
        project: {
          id: projectId,
        },
        issuetype: {
          id: ISSUE_TYPES[issueType] || ISSUE_TYPES.Task
        },
        summary: summary,
        description: description,
        duedate: duedate || undefined,
        labels: labels ? labels.split(', ') : []
      }
    });

    console.log(`Task created successfully. https://jira.xing.hh/${issue.key}`);
  } catch (error) {
    console.error('Error creating task:', error);
  }
}

module.exports = {
  createTask
};
