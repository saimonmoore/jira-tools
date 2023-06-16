## Create jira tasks in bulk

### Setup

1. Use node v18 or higher.
2. `yarn install`

### Usage

1. Copy the .env.sample to .env and adapt accordingly

2. Copy one of tasks.json.sample or tasks.csv.sampe files and modify it accordingly (See [power user](/#power-user))

3. Execute:

```
node src/controllers/cliController.js ./tasks.json
```

### Power user

You can [use chatgpt](https://chat.openai.com/share/b6186f62-fbb8-4602-a27e-8da7f0a0c7d0) to generate the json file for you given a list of tasks.
