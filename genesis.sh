#!/bin/bash

# Create package directory
mkdir jira-tools
cd jira-tools

# Initialize npm package
npm init -y

# Create directories
mkdir src
cd src
mkdir controllers core gateways usecases
cd ..

# Install dependencies
npm install jira-client csv-parser

# Create Jira gateway file
cat > src/gateways/jiraGateway.js <<EOF
const JiraClient = require('jira-client');

// Configure Jira API client
const jira = new JiraClient({
  host: 'YOUR_JIRA_HOST',
  basic_auth: {
    username: 'YOUR_USERNAME',
    password: 'YOUR_PASSWORD'
  }
});

// Create a task
async function createTask(projectKey, issueType, summary, description) {
  try {
    const issue = await jira.addNewIssue({
      fields: {
        project: {
          key: projectKey
        },
        summary: summary,
        description: description,
        issuetype: {
          name: issueType
        }
      }
    });

    console.log(\`Task created successfully. Key: \${issue.key}\`);
  } catch (error) {
    console.error('Error creating task:', error);
  }
}

module.exports = {
  createTask
};
EOF

# Create createTask use case file
cat > src/usecases/createTaskUseCase.js <<EOF
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
          await createTask(task.projectKey, task.issueType, task.summary, task.description);
        }
      });
  } catch (error) {
    console.error('Error creating tasks from CSV:', error);
  }
}

module.exports = {
  createTasksFromCsv
};
EOF

# Create CLI controller file
cat > src/controllers/cliController.js <<EOF
const { createTasksFromCsv } = require('../usecases/createTaskUseCase');

// Get CSV file path from command-line arguments
const csvFilePath = process.argv[2];

if (!csvFilePath) {
  console.error('Please provide a CSV file path as an argument.');
  process.exit(1);
}

createTasksFromCsv(csvFilePath);
EOF

# Set main entry point in package.json
jq '.main = "src/controllers/cliController.js"' package.json > package.tmp && mv package.tmp package.json

# Display completion message
echo "Package structure generated successfully!"
