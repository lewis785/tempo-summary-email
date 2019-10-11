import Worklog from "./entity/Worklog";

export default class GenerateEmail {

    private static generateDetails(worklog: Worklog): string {
        return `${worklog.issueKey}
${worklog.description} - ${worklog.timeSpentHours}h (${worklog.timeSpentMinutes}m)
`;
    }

    private readonly worklogs: Worklog[];

    constructor(worklogs: Worklog[]) {
        this.worklogs = worklogs;
    }

    public generateEmail() {
        let output = "";
        for (const worklog in this.worklogs) {
            if (Object.prototype.hasOwnProperty.call(this.worklogs, worklog)) {
                output += GenerateEmail.generateDetails(this.worklogs[worklog]);
            }
        }

        return output;
    }
}
