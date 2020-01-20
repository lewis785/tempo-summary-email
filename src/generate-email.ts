import Worklog from "./entity/worklog";
import SummaryItem from "./entity/summary-item";
import User from "./entity/user";

export default class GenerateEmail {

    private readonly showDate: boolean;
    private readonly summaryItems: SummaryItem[];
    private readonly user: User;

    constructor(user: User, records: SummaryItem[], showTempoDate = false) {
        this.showDate = showTempoDate;
        this.summaryItems = records;
        this.user = user;
    }

    private buildWorklog(): string {
        let worklogText = "";
        this.summaryItems.forEach((summaryItem) => {
            worklogText += `\n${summaryItem.getJiraIssue().getSummary()} (${summaryItem.getJiraIssue().getIssueKey()}): ${summaryItem.getJiraIssue().getIssueUrl()}\n`;
            summaryItem.getWorklogs().forEach((worklog) => {
                worklogText += this.generateTempoIssue(worklog)
            });
        });

        return worklogText.replace(/^\s+|\s+$/g, '');
    }

    private generateTempoIssue(worklog: Worklog): string {
        const date = this.showDate ? `(${worklog.getDate()})` : "";
        return `\t\u2022 ${date} [${worklog.getTimeSpentMinutes()}m/${worklog.getTimeSpentHours()}h] - ${worklog.getDescription()}\n`;
    }

    public generateEmail(): string {
        let body = `Hi {{recipient_name}},
        
I have worked on:

{{worklogs}}

Thanks,
{{sender_name}}`;

        body = body.replace("{{recipient_name}}", "");
        body = body.replace("{{worklogs}}", this.buildWorklog());
        body = body.replace("{{sender_name}}", this.user.getDisplayName());
        return body
    }
}
