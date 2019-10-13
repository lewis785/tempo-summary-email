import JiraApi from "jira-client";
import TempoApi from "tempo-client";
// import Config from "./config.json";
import JiraIssue, {JiraIssueJson} from "./entity/jira-issue";
import Worklog from "./entity/worklog";
import SummaryItem from "./entity/summary-item";
import GenerateEmail from "./generate-email";
import User, {UserJson} from "./entity/user";

interface TempoDailyEmailOptions {
    tempoApiKey: string;
    jiraUsername: string;
    jiraApiKey: string;
    jiraDomain: string;
}

export default class TempoSummaryEmail {
    private readonly tempoApiKey: string;
    private readonly jiraUsername: string;
    private readonly jiraApiKey: string;
    private readonly jiraDomain: string;
    private user?: User;

    constructor(options: TempoDailyEmailOptions) {
        this.tempoApiKey = options.tempoApiKey;
        this.jiraUsername = options.jiraUsername;
        this.jiraApiKey = options.jiraApiKey;
        this.jiraDomain = options.jiraDomain;
    }

    public async generateEmailForRange(from: string, to: string) {
        const summaryItems = await this.retrieveSummaryItems(from, to);
        return (new GenerateEmail(await this.getUser(), summaryItems)).generateEmail();
    }

    public async retrieveSummaryItems(from: string, to: string): Promise<SummaryItem[]> {
        const user = await this.getUser();
        const tempo = this.createTempoClient();
        const jira = this.createJiraClient();

        const tempoWorklogs = await tempo.getWorklogsForUser(user.getAccountId(), {from, to}).then((response) => {return response.results});

        const summaryItems: {[id: string] :SummaryItem} = {};

        for (const index in tempoWorklogs) {
            if (!Object.prototype.hasOwnProperty.call(tempoWorklogs, index)) {
                continue;
            }
            const worklog = new Worklog(tempoWorklogs[index]);

            let summaryItem;
            if (worklog.getIssueKey() in summaryItems) {
                summaryItem = summaryItems[worklog.getIssueKey()]
            } else {
                const issue = await jira.findIssue(worklog.getIssueKey()) as JiraIssueJson;
                const jiraIssue = new JiraIssue(issue, this.jiraDomain);
                summaryItem = new SummaryItem(jiraIssue);
                // eslint-disable-next-line require-atomic-updates
                summaryItems[worklog.getIssueKey()] = summaryItem
            }

            summaryItem.addWorklog(worklog);
        }

        return Object.keys(summaryItems).map(i => summaryItems[i]);
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
        if(typeof(this.user) !== "undefined") {
            return this.user;
        }

        const jira = this.createJiraClient();
        const response = await jira.getCurrentUser().catch((reason) => {
            throw new Error(reason);
        }) as UserJson;

        this.user = new User(response);
        return this.user
    }
}

/** Used for testing */
// const temp = new TempoSummaryEmail({
//     jiraApiKey: Config.jira.apiKey,
//     jiraDomain: Config.jira.domain,
//     jiraUsername: Config.jira.username,
//     tempoApiKey: Config.tempo.apiKey,
// });
//
// temp.generateEmailForRange("2019-10-09", "2019-10-09")
//     .then( ( response ) => {console.log(response)});
