import {WorklogResponse} from "tempo-client/lib/responseTypes";
import SummaryItem from "../../src/entity/summary-item";
import JiraIssue from "../../src/entity/jira-issue";
import Worklog from "../../src/entity/worklog";

jest.mock("../../src/entity/jira-issue");
jest.mock("../../src/entity/worklog");

const jiraIssueJson = {
    key: "ABC-123",
    fields: {
        summary: "This is a test summary"
    }
};

const worklogJson: Partial<WorklogResponse> = {
    timeSpentSeconds: 1200,
    issue: {
        self: "https://example.com/api/issue/ABC-123",
        key: "ABC-123"
    },
    description: "This is a test description",
    startDate: "2019-01-01"
};

it("getJiraIssue", () => {
    const jiraIssue = new JiraIssue(jiraIssueJson,"test.net");
    const record = new SummaryItem(jiraIssue);
    expect(record.getJiraIssue()).toBe(jiraIssue)
});

it("test add and get worklog", () => {
    const jiraIssue = new JiraIssue(jiraIssueJson,"test.net");
    const worklog = new Worklog(worklogJson as WorklogResponse);
    const record = new SummaryItem(jiraIssue);
    record.addWorklog(worklog);
    expect(record.getWorklogs()).toStrictEqual([worklog])
});
