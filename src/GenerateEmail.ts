import Worklog from "./entity/Worklog";
import Record from "./entity/Record";
import User from "./entity/User";

export default class GenerateEmail {

    private static generateDetails(worklog: Worklog): string {
        return `\t\u2022 (${worklog.getDate()}) [${worklog.getTimeSpentMinutes()}m/${worklog.getTimeSpentHours()}h] - ${worklog.getDescription()}\n`;
    }

    private readonly records: Record[];
    private readonly user: User;

    constructor(user: User, records: Record[]) {
        this.records = records;
        this.user = user;
    }

    private buildWorklog(): string {
        let worklogText = "";
        this.records.forEach((record) => {
            worklogText += `\n${record.getJiraIssue().getSummary()} (${record.getJiraIssue().getIssueKey()}): ${record.getJiraIssue().getIssueUrl()}\n`;

            record.getWorklogs().forEach((worklog) => {
                worklogText += GenerateEmail.generateDetails(worklog)
            });
        });

        return worklogText.replace(/^\s+|\s+$/g, '');
    }

    public generateEmail(): string {
        return`Hi,
        
Today I have worked on:

${this.buildWorklog()}

Thanks,
${this.user.getDisplayName()}`;
    }
}
