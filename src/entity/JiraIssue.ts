export interface JiraIssueJson {
    key: string;
    fields: {
        summary: string;
    };
}

export default class JiraIssue {
    private readonly data: JiraIssueJson;
    private readonly domain: string;

    constructor(data: JiraIssueJson, domain: string) {
        this.data = data;
        this.domain = domain;
    }

    public getIssueUrl(): string {
        return `https://${this.domain}/browse/${this.getIssueKey()}`;
    }

    public getIssueKey(): string {
        return this.data.key;
    }

    public getSummary(): string {
        return this.data.fields.summary;
    }
}
