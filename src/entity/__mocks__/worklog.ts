export default class Worklog {
    constructor() {
        console.log("Mock constructor");
    }

    public getTimeSpentSeconds(): number {
        return 3600
    }

    public getTimeSpentMinutes(): number {
        return 60
    }

    public getTimeSpentHours(): number {
        return 1;
    }

    public getIssueKey(): string {
        return "DEF456"
    }

    public getDescription(): string {
        return "This is a mock description"
    }

    public getDate(): string {
        return "2019-01-01"
    }
}