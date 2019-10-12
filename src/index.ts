import JiraApi from "jira-client";
import TempoApi from "tempo-client";
// import Config from "./config.json";
import JiraIssue, {JiraIssueJson} from "./entity/JiraIssue";
import Worklog from "./entity/Worklog";
import Record from "./entity/Record";
import GenerateEmail from "./GenerateEmail";
import User, {UserJson} from "./entity/User";

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
        const user = await this.getUser();
        const tempo = this.createTempoClient();

        const tempoWorklogs = await tempo.getWorklogsForUser(
            user.getAccountId(),
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
            if (worklog.getIssueKey() in records) {
                record = records[worklog.getIssueKey()]
            } else {
                const issue = await jira.findIssue(worklog.getIssueKey()) as JiraIssueJson;
                const jiraIssue = new JiraIssue(issue, this.jiraDomain);
                record = new Record(jiraIssue);
                // eslint-disable-next-line require-atomic-updates
                records[worklog.getIssueKey()] = record
            }

            record.addWorklog(worklog);
        }

        const recordArray = Object.keys(records).map(i => records[i]);
        return new GenerateEmail(user, recordArray);
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

    private async getUser(): Promise<User> {
        const jira = this.createJiraClient();
        const response = await jira.getCurrentUser().catch((reason) => {
            throw new Error(reason);
        }) as UserJson;

        return new User(response);
    }
}

/** Used for testing */
// const temp = new TempoDailyEmail({
//     jiraApiKey: Config.jira.apiKey,
//     jiraDomain: Config.jira.domain,
//     jiraUsername: Config.jira.username,
//     tempoApiKey: Config.tempo.apiKey,
// });
//
// temp.retrieveTempoData("2019-10-09", "2019-10-12")
//     .then( ( generateEmail ) => {console.log(generateEmail.generateEmail())});
