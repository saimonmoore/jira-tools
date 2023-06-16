const { createTasksFromCsv, createTasksFromJson } = require('../usecases/createTaskUseCase');

// Get file path from command-line arguments
const filePath = process.argv[2];

if (!filePath) {
  console.error('Please provide a file path as an argument.');
  process.exit(1);
}

// Determine file extension
const fileExtension = filePath.split('.').pop();

// Call appropriate use case based on file extension
if (fileExtension === 'csv') {
  createTasksFromCsv(filePath);
} else if (fileExtension === 'json') {
  createTasksFromJson(filePath);
} else {
  console.error('Unsupported file extension. Please provide a CSV or JSON file.');
}
