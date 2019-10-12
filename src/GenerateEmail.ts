import Worklog from "./entity/Worklog";
import SummaryItem from "./entity/SummaryItem";
import User from "./entity/User";

export default class GenerateEmail {

    private static generateDetails(worklog: Worklog): string {
        return `\t\u2022 (${worklog.getDate()}) [${worklog.getTimeSpentMinutes()}m/${worklog.getTimeSpentHours()}h] - ${worklog.getDescription()}\n`;
    }

    private readonly summaryItems: SummaryItem[];
    private readonly user: User;

    constructor(user: User, records: SummaryItem[]) {
        this.summaryItems = records;
        this.user = user;
    }

    private buildWorklog(): string {
        let worklogText = "";
        this.summaryItems.forEach((summaryItem) => {
            worklogText += `\n${summaryItem.getJiraIssue().getSummary()} (${summaryItem.getJiraIssue().getIssueKey()}): ${summaryItem.getJiraIssue().getIssueUrl()}\n`;

            summaryItem.getWorklogs().forEach((worklog) => {
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
