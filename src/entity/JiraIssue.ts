export default class JiraIssue {
    private readonly data: any;
    private readonly domain: string;

    constructor(data: any, domain: string) {
        this.data = data;
        this.domain = domain;
    }

    public getIssueUrl(): string {
        return `https://${this.domain}/browse/${this.getIssueKey()}`;
    }

    private getIssueKey(): string {
        return this.data.key;
    }
}
