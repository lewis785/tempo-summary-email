import JiraApi from 'jira-client'
import TempoApi from 'tempo-client'
import Worklog from './entity/Worklog'

const config = require('../config.json');

interface ITempoDailyEmailOptions {
    tempoApiKey: string,
    jiraUsername: string,
    jiraApiKey: string,
    jiraDomain: string
}

class TempoDailyEmail {
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

    private async getUserAccountId() {
        const jira = this.createJiraClient();
        const response = await jira.getCurrentUser().catch(reason => {
            throw new Error(reason)
        });

        return response.accountId
    }

    public async retrieveTempoData() {
        const accountId = await this.getUserAccountId();
        console.log(accountId);

        const tempo = this.createTempoClient();

        const worklogs = await tempo.getWorklogsForUser(
            accountId,
            {
                from: '2019-10-08',
                to: '2019-10-08'
            }
        ).catch(err => {
            console.log(err);
        });

        const results = worklogs.results;
        for (let index in results) {
            if (!results.hasOwnProperty(index)) {
                continue
            }

            const task = new Worklog(results[index]);
            console.log(task.workType);
        }
    }
}

const temp = new TempoDailyEmail({
    tempoApiKey: config.tempo.apiKey,
    jiraUsername: config.jira.username,
    jiraApiKey: config.jira.apiKey,
    jiraDomain: config.jira.domain
});

temp.retrieveTempoData();

