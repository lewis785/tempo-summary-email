[![Actions Status](https://github.com/lewis785/tempo-summary-email/workflows/Node%20CI/badge.svg)](https://github.com/lewis785/tempo-summary-email/actions)
[![Npm Version](https://img.shields.io/npm/v/tempo-summary-email)](https://www.npmjs.com/package/tempo-summary-email)
[![install size](https://packagephobia.now.sh/badge?p=tempo-summary-email)](https://packagephobia.now.sh/result?p=tempo-summary-email)
[![Dependency Status](https://david-dm.org/lewis785/tempo-summary-email/status.svg)](https://david-dm.org/lewis785/tempo-summary-email)
[![Dev Dependency Status](https://david-dm.org/lewis785/tempo-summary-email/dev-status.svg)](https://david-dm.org/lewis785/tempo-summary-email?type=dev)
[![Code Coverage](https://codecov.io/gh/lewis785/tempo-summary-email/branch/master/graph/badge.svg)](https://codecov.io/gh/lewis785/tempo-summary-email)

# Tempo Summary Email
Uses Jira and Tempo apis to create a daily email about work completed.

## Installation

Install using [NPM](https://npmjs.org):

```shell script
$ npm install tempo-summary-email
```

## Example

```javascript
// ES5
const TempoSummaryEmail = require("tempo-summary-email").default;

// ES6
import TempoSummaryEmail from "tempo-summary-email";

const tempoSummaryEmail = new TempoSummaryEmail({
    tempoApiKey: "TEMPO_TOKEN",
    jiraUsername: "user@example.com",
    jiraApiKey: "JIRA_TOKEN",
    jiraDomain: "example.atlassian.net"
});

tempoSummaryEmail.generateEmailForRange("2020-01-01", "2020-01-01")
  .then(response => { 
    console.log(response)
  });
```

## Development
This project contains a Dockerfile which can be 
```shell script
docker-compose up -d
```

To access the docker container run:
```shell script
docker-compose exec tempo-summary-email bash
```

During development it's recommend to run:
```shell script
npm run dev
```

