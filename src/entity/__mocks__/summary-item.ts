import JiraIssue from "../jira-issue";
import Worklog from "../worklog";

jest.mock("../jira-issue");
jest.mock("../worklog");

const mockData = {
    self: "https://api.tempo.io/core/3/worklogs",
    attributes: {self: "", values: []},
    author: {
        self: "https://podfather.atlassian.net/rest/api/2/user?accountId=123456789",
        accountId: '123456789',
        displayName: 'John Smith'},
    billableSeconds: 0,
    createdAt: "2019-01-01T17:00:00Z",
    description: "This is a test issue description",
    issue: {
        key: "ABC-123",
        self: "https://example.atlassian.net/rest/api/2/issue/ABC-123"
    },
    startDate: "2019-01-01",
    startTime: "00:00:00",
    tempoWorklogId: 1234,
    timeSpentSeconds: 1800,
    updatedAt: "2019-01-01T17:00:00Z"
};

export default class SummaryItem {
    constructor() {
        console.log("Mock constructor");
    }

    public addWorklog() {
    }

    public getJiraIssue(): JiraIssue {
        return new JiraIssue({fields: {summary: ""}, key: ""},'test');
    }

    public getWorklogs(): Worklog[] {
        return [new Worklog(mockData)];
    }
}
