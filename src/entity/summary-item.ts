import JiraIssue from "./jira-issue";
import Worklog from "./worklog"

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
