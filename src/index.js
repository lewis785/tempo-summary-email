import JiraApi from 'jira-client'
import TempoApi  from 'tempo-client'

const config = require('../config.json')

exports.generateEmail = function () {
  retrieveTempoData()
}

function createTempoClient() {
  return new TempoApi({
    protocol: 'https',
    host: 'api.tempo.io',
    bearerToken: config.tempo.apiKey,
    apiVersion: '3'
  })
}

function createJiraClient () {
  return new JiraApi({
    protocol: 'https',
    host: 'podfather.atlassian.net',
    username: config.jira.username,
    password: config.jira.apiKey,
    apiVersion: '3',
    strictSSL: true
  });
}

function retrieveTempoData() {
  const jira = createJiraClient()
  const tempo = createTempoClient()

   jira.getCurrentUser()
    .then(user => {
      const accountId = user.accountId;
      tempo.getWorklogsForUser(
        accountId,
        {
          from: '2019-10-01',
          to: '2019-10-07'
        }
      )
        .then(worklogs => {
          const results = worklogs.results
          const output = {}
          for(let index in results) {
            if (!results.hasOwnProperty(index)) {
              continue
            }

            const log = results[index]
            const task = {
              description: log.description,
              timeSpent: log.timeSpentSeconds,
              workType: log.attributes.values[0].value
            }

            console.log(log.jiraWorklogId)
            if ( !output.hasOwnProperty(log.issue.key)) {
              output[log.issue.key] = [task]
            } else {
              output[log.issue.key].push(task)
            }

          }
          console.log(output)
        })
        .catch(err => {
          console.log(err);
        });
    })
    .catch(err => {
      console.error(err);
    });
}

retrieveTempoData()


