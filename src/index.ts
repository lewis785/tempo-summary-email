import JiraApi from 'jira-client'
import TempoApi from 'tempo-client'
import Worklog from './entity/Worklog'
import JiraIssue from './entity/JiraIssue'
import GenerateEmail from "./GenerateEmail";

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

    private createTempoClient(): TempoApi {
        return new TempoApi({
            protocol: 'https',
            host: 'api.tempo.io',
            bearerToken: this.tempoApiKey,
            apiVersion: '3'
        })
    }

    private createJiraClient(): JiraApi {
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

    public async retrieveTempoData(from:string, to:string) {
        const accountId = await this.getUserAccountId();
        const tempo = this.createTempoClient();

        const tempoWorklogs = await tempo.getWorklogsForUser(
            accountId,
            {
                from: from,
                to: to
            }
        ).catch(err => {
            console.log(err);
        });

        const results = tempoWorklogs.results;
        const worklogs = [];
        const jira = this.createJiraClient();
        for (let index in results) {
            if (!results.hasOwnProperty(index)) {
                continue
            }
            const worklog = new Worklog(results[index]);
            worklogs.push(worklog);

            const issue = await jira.findIssue(worklog.issueKey);
            const jiraIssue = new JiraIssue(issue, config.jira.domain);
            console.log(jiraIssue.getIssueUrl());
        }

        const emailGenerator = new GenerateEmail(worklogs);
        console.log(emailGenerator.generateEmail());
    }
}

const temp = new TempoDailyEmail({
    tempoApiKey: config.tempo.apiKey,
    jiraUsername: config.jira.username,
    jiraApiKey: config.jira.apiKey,
    jiraDomain: config.jira.domain
});

temp.retrieveTempoData('2019-10-09', '2019-10-09');
