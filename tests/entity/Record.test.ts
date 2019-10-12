// import JiraIssue from "../../src/entity/JiraIssue";
import Record from "../../src/entity/Record";
import JiraIssue from "../../src/entity/JiraIssue";
import Worklog from "../../src/entity/Worklog";

jest.mock("../../src/entity/JiraIssue");
jest.mock("../../src/entity/Worklog");

it("getJiraIssue", () => {
    const jiraIssue = new JiraIssue(jiraIssueJson,"test.net");
    const record = new Record(jiraIssue);
    expect(record.getJiraIssue()).toBe(jiraIssue)
});

it("test add and get worklog", () => {
    const jiraIssue = new JiraIssue(jiraIssueJson,"test.net");
    const worklog = new Worklog(worklogJson);
    const record = new Record(jiraIssue);
    record.addWorklog(worklog);
    expect(record.getWorklogs()).toStrictEqual([worklog])
});

const jiraIssueJson = {
    key: "ABC-123",
    fields: {
        summary: "This is a test summary"
    }
};

const worklogJson = {
    timeSpentSeconds: 1200,
    issue: {
        key: "ABC-123"
    },
    description: "This is a test description",
    startDate: "2019-01-01"
};