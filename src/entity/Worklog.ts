export interface WorklogJson {
    timeSpentSeconds: number;
    issue: {
        key: string;
    };
    description: string;
    startDate: string;
}


export default class Worklog {
    private data: WorklogJson;

    constructor(data: WorklogJson) {
        this.data = data;
    }

    public getTimeSpentSeconds(): number {
        return this.data.timeSpentSeconds;
    }

    public getTimeSpentMinutes(): number {
        const timeInHours = (this.getTimeSpentSeconds() / 60);
        return Math.round(timeInHours * 100) / 100;
    }

    public getTimeSpentHours(): number {
        const timeInHours = (this.getTimeSpentMinutes() / 60);
        return Math.round(timeInHours * 100) / 100;
    }

    public getIssueKey(): string {
        return this.data.issue.key;
    }

    public getDescription(): string {
        return this.data.description;
    }

    public getDate(): string {
        return this.data.startDate;
    }
}
