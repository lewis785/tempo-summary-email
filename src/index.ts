import JiraApi from 'jira-client'
import TempoApi  from 'tempo-client'

const config = require('../config.json');

interface ITempoDailyEmailOptions {
    tempoApiKey: string,
    jiraUsername: string,
    jiraApiKey: string,
    jiraDomain: string
}

class TempoDailyEmail
{
    public readonly tempoApiKey: string;
    public readonly jiraUsername: string;
    public readonly jiraApiKey: string;
    public readonly jiraDomain: string;

    constructor(options: ITempoDailyEmailOptions) {
        this.tempoApiKey = options.tempoApiKey;
        this.jiraUsername = options.jiraUsername;
        this.jiraApiKey = options.jiraApiKey;
        this.jiraDomain = options.jiraDomain;
    }


    private createTempoClient() {
        return new TempoApi({
            protocol: 'https',
            host: 'api.tempo.io',
            bearerToken: this.tempoApiKey,
            apiVersion: '3'
        })
    }

    private createJiraClient() {
        return new JiraApi({
            protocol: 'https',
            host: this.jiraDomain,
            username: this.jiraUsername,
            password: this.jiraApiKey,
            apiVersion: '3',
            strictSSL: true
        });
    }

    public retrieveTempoData() {
        const jira = this.createJiraClient();
        const tempo = this.createTempoClient();

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
                        const results = worklogs.results;
                        const output = {};
                        for (let index in results) {
                            if (!results.hasOwnProperty(index)) {
                                continue
                            }

                            const log = results[index];
                            const task = {
                                description: log.description,
                                timeSpent: log.timeSpentSeconds,
                                workType: log.attributes.values[0].value
                            };

                            console.log(log.jiraWorklogId);
                            // if (!output.hasOwnProperty(log.issue.key)) {
                            //   output[log.issue.key] = [task]
                            // } else {
                            //   output[log.issue.key].push(task)
                            // }

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
}

const temp = new TempoDailyEmail({
    tempoApiKey: config.tempo.apiKey,
    jiraUsername: config.jira.username,
    jiraApiKey: config.jira.apiKey,
    jiraDomain: config.jira.domain
});

temp.retrieveTempoData();

