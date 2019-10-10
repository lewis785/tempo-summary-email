import JiraApi from "jira-client";
import TempoApi from "tempo-client";
// import Config from "./config.json";
import JiraIssue from "./entity/JiraIssue";
import Worklog from "./entity/Worklog";
import GenerateEmail from "./GenerateEmail"

interface ITempoDailyEmailOptions {
    tempoApiKey: string;
    jiraUsername: string;
    jiraApiKey: string;
    jiraDomain: string;
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

    public async retrieveTempoData(from: string, to: string) {
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
        const worklogs = [];
        const jira = this.createJiraClient();
        for (const index in results) {
            if (!results.hasOwnProperty(index)) {
                continue;
            }
            const worklog = new Worklog(results[index]);
            worklogs.push(worklog);

            const issue = await jira.findIssue(worklog.issueKey);
            const jiraIssue = new JiraIssue(issue, this.jiraDomain);
        }

        const emailGenerator = new GenerateEmail(worklogs);
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
//
// temp.retrieveTempoData("2019-10-09", "2019-10-09");
