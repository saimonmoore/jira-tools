const { createTasksFromCsv } = require('../usecases/createTaskUseCase');

// Get CSV file path from command-line arguments
const csvFilePath = process.argv[2];

if (!csvFilePath) {
  console.error('Please provide a CSV file path as an argument.');
  process.exit(1);
}

createTasksFromCsv(csvFilePath);
