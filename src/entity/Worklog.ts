export default class Worklog {
    private data: any;

    constructor (data: any) {
        this.data = data
    }

    get timeSpentSeconds (): number {
        return this.data.timeSpentSeconds
    }

    get timeSpentMinutes (): number {
        const timeInHours = (this.timeSpentSeconds / 60);
        return Math.round(timeInHours * 100) / 100;
    }

    get timeSpentHours (): number {
        const timeInHours = (this.timeSpentMinutes / 60);
        return Math.round(timeInHours * 100) / 100;
    }

    get issueKey (): string {
        return this.data.issue.key
    }

    get description (): string {
        return this.data.description
    }

    get workType (): string {
        return this.data.attributes.values[0].value
    }
}
