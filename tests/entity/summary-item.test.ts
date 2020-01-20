import {ResponseTypes} from "tempo-client";
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

const worklogJson: Partial<ResponseTypes.WorklogResponse> = {
    timeSpentSeconds: 1200,
    issue: {
        self: "https://example.com/api/issue/ABC-123",
        key: "ABC-123"
    },
    description: "This is a test description",
    startDate: "2019-01-01"
};
