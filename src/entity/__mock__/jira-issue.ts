// import JiraIssue from "../jira-issue";

export class JiraIssue {
    constructor() {
        console.log('Mocked Constructor')
    }

    public getIssueUrl(): string {
        return 'https://test/browser/ABC-123';
    }

    public getIssueKey(): string {
        return 'ABC123';
    }

    public getSummary(): string {
        return 'This is a mock summary'
    }
}
