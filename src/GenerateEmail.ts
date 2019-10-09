import Worklog from "./entity/Worklog";

export default class GenerateEmail {
    private readonly worklogs: Array<Worklog>;

    constructor(worklogs: Array<Worklog>){
        this.worklogs = worklogs
    }

    public generateEmail()
    {
        let output = '';
        for (const worklog in this.worklogs) {
            output += GenerateEmail.generateDetails(this.worklogs[worklog])
        }

        return output
    }

    private static generateDetails(worklog: Worklog): string {
        return `${worklog.issueKey}
${worklog.description} - ${worklog.timeSpentHours}h (${worklog.timeSpentMinutes}m)
`
    }
}