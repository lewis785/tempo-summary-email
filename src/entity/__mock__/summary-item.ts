import JiraIssue from "../jira-issue";
import Worklog from "../worklog";

jest.mock("../jira-issue");
jest.mock("../worklog");

export default class SummaryItem {
    constructor() {
        console.log("Mock constructor")
    }

    public addWorklog() {
    }

    public getJiraIssue(): JiraIssue {
        return new JiraIssue({},'test');
    }

    public getWorklogs(): Worklog[] {
        return new Worklog()
    }
}