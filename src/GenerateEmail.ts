import Worklog from "./entity/Worklog";
import Record from "./entity/Record";

export default class GenerateEmail {

    private static generateDetails(worklog: Worklog): string {
        return `    \u2022 ${worklog.description} - ${worklog.timeSpentHours}h (${worklog.timeSpentMinutes}m)\n`;
    }

    private readonly records: Record[];

    constructor(records: Record[]) {
        this.records = records;
    }

    public generateEmail(): string {
        let output = "";

        this.records.forEach((record) => {
            output += `\u2022 ${record.getJiraIssue().getSummary()} (${record.getJiraIssue().getIssueKey()}) - ${record.getJiraIssue().getIssueUrl()}\n`;

            record.getWorklogs().forEach((worklog) => {
              output += GenerateEmail.generateDetails(worklog)
            });

            output += "\n";
        });

        return output;
    }
}
