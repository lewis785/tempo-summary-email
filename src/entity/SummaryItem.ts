import JiraIssue from "./JiraIssue";
import Worklog from "./Worklog"

export default class SummaryItem {
    private readonly jiraIssue: JiraIssue;
    private readonly worklogs: Worklog[];

    constructor(jiraIssue: JiraIssue) {
        this.jiraIssue = jiraIssue;
        this.worklogs = [];
    }

    public addWorklog(worklog: Worklog) {
        this.worklogs.push(worklog);
    }

    public getJiraIssue(): JiraIssue {
        return this.jiraIssue;
    }

    public getWorklogs(): Worklog[] {
        return this.worklogs;
    }
}
