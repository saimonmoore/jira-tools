const JiraClient = require("jira-client");
require("dotenv").config();

// Configure Jira API client
const jira = new JiraClient({
  host: process.env.JIRA_HOST,
  protocol: "https",
  apiVersion: "2",
  strictSSL: false,
  username: process.env.JIRA_USERNAME,
  password: process.env.JIRA_PASSWORD,
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
  "Sub-Task": 5,
};

const INVESTMENT_PROFILE_LABELS = {
  "NONE": "",
  "NEW_OR_IMPROVED_FUNCTIONALITY": "New or improved Functionality",
  "NEW_OR_ADDITIONAL_REVENUE": "New or additional Revenue",
  "TECH_DEBT": "Tech Debt",
  "OPERATIONS_AND_SUSTAINABILITY": "Operations & Sustainability",
  "EXTERNAL_REQUEST_OR_CITIZENSHIP": "External Request / Citizenship",
  "BUG_OR_DEFECT": "Bug or Defect",
  "OTHER": "Other",
};

const INVESTMENT_PROFILE_FIELD = "customfield_25070";

// Create a task
async function createTask(
  projectKey,
  projectId,
  issueType,
  summary,
  description,
  duedate,
  labels,
  investmentProfile = "NONE"
) {
  console.log(`Creating task: `, {
    projectKey,
    projectId,
    issueType,
    summary,
    description,
    duedate,
    labels,
    investmentProfile,
  });

  const update ={};

  const fields = {
    project: {
      id: projectId,
    },
    issuetype: {
      id: ISSUE_TYPES[issueType] || ISSUE_TYPES.Task,
    },
    summary: summary,
    description: description,
    duedate: duedate || undefined,
    labels: labels ? labels.split(", ") : [],
  };

  if (investmentProfile) {
    update[INVESTMENT_PROFILE_FIELD] = [{
      "set": { "value": INVESTMENT_PROFILE_LABELS[investmentProfile] },
    }];
  }

  try {
    const issue = await jira.addNewIssue({
      fields,
      update
    });

    console.log(
      `Task created successfully. https://jira.xing.hh/browse/${issue.key}`,
    );
  } catch (error) {
    console.error("Error creating task:", error);
  }
}

module.exports = {
  createTask,
  INVESTMENT_PROFILE_LABELS,
};
