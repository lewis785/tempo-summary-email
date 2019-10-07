import JiraApi from 'jira-client'
import TempoApi  from 'tempo-client'

const config = require('../config.json')

const tempo = new TempoApi({
  protocol: 'https',
  host: 'api.tempo.io',
  bearerToken: config.tempo.apiKey,
  apiVersion: '3'
})

const jira = new JiraApi({
  protocol: 'https',
  host: 'podfather.atlassian.net',
  username: config.jira.username,
  password: config.jira.apiKey,
  apiVersion: '3',
  strictSSL: true
});


jira.getCurrentUser()
  .then(user => {
    const accountId = user.accountId;
    tempo.getWorklogsForUser(
      accountId,
      {
        from: '2019-10-07',
        to: '2019-10-07'
      }
    )
      .then(worklogs => {
        console.log(worklogs.results);
      })
      .catch(err => {
        console.log(err);
      });
  })
  .catch(err => {
    console.error(err);
  });

