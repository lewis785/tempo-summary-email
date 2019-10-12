import JiraApi from "jira-client";
import TempoApi from "tempo-client";
// import Config from "./config.json";
import JiraIssue from "./entity/JiraIssue";
import Worklog from "./entity/Worklog";
import Record from "./entity/Record";
import GenerateEmail from "./GenerateEmail";

interface ITempoDailyEmailOptions {
    tempoApiKey: string;
    jiraUsername: string;
    jiraApiKey: string;
    jiraDomain: string;
}

export default class TempoDailyEmail {
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

    public async retrieveTempoData(from: string, to: string): Promise<GenerateEmail> {
        const accountId = await this.getUserAccountId();
        const tempo = this.createTempoClient();

        const tempoWorklogs = await tempo.getWorklogsForUser(
            accountId,
            {
                from,
                to,
            },
        );

        const results = tempoWorklogs.results;
        const jira = this.createJiraClient();

        const records: {[id: string] :Record} = {};

        for (const index in results) {
            if (!Object.prototype.hasOwnProperty.call(results, index)) {
                continue;
            }
            const worklog = new Worklog(results[index]);

            let record;
            if (worklog.issueKey in records) {
                record = records[worklog.issueKey]
            } else {
                const issue = await jira.findIssue(worklog.issueKey);
                const jiraIssue = new JiraIssue(issue, this.jiraDomain);
                record = new Record(jiraIssue);
                // eslint-disable-next-line require-atomic-updates
                records[worklog.issueKey] = record
            }

            record.addWorklog(worklog);
        }

        const recordArray = Object.keys(records).map(i => records[i]);
        return new GenerateEmail(recordArray);
    }

    private createTempoClient(): TempoApi {
        return new TempoApi({
            apiVersion: "3",
            bearerToken: this.tempoApiKey,
            host: "api.tempo.io",
            protocol: "https",
        });
    }

    private createJiraClient(): JiraApi {
        return new JiraApi({
            apiVersion: "3",
            host: this.jiraDomain,
            password: this.jiraApiKey,
            protocol: "https",
            strictSSL: true,
            username: this.jiraUsername,
        });
    }

    private async getUserAccountId() {
        const jira = this.createJiraClient();
        const response = await jira.getCurrentUser().catch((reason) => {
            throw new Error(reason);
        });

        return response.accountId;
    }
}

// const temp = new TempoDailyEmail({
//     jiraApiKey: Config.jira.apiKey,
//     jiraDomain: Config.jira.domain,
//     jiraUsername: Config.jira.username,
//     tempoApiKey: Config.tempo.apiKey,
// });

// temp.retrieveTempoData("2019-10-09", "2019-10-09")
//     .then( ( generateEmail ) => {console.log(generateEmail.generateEmail())});
