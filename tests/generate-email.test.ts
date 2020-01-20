import JiraIssue from "../src/entity/jira-issue";
import SummaryItem from "../src/entity/summary-item";
import User from "../src/entity/user";
import Worklog from "../src/entity/worklog";
import GenerateEmail from "../src/generate-email";

jest.mock('../src/entity/user');
jest.mock('../src/entity/worklog');
jest.mock('../src/entity/summary-item');
jest.mock('../src/entity/jira-issue');

beforeEach(() => {
    JiraIssue.mockClear();
    User.mockClear();
    SummaryItem.mockClear();
    Worklog.mockClear();
});

describe('listFilesInDirectorySync', () => {

    it('generateEmail', () => {
        return true;
    });
});
