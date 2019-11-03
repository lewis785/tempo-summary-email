import {ResponseTypes} from "tempo-client";
import Worklog from "../../src/entity/worklog";

describe(Worklog, () => {
    const exampleData: Partial<ResponseTypes.IWorklogResponse> = {
        description: "This is an example description",
        issue: {
            self: "https://example.com/api/issue/ABC-123",
            key: "ABC-123",
        },
        timeSpentSeconds: 1200,
        startDate: '2019-01-01'
    };

    //@ts-ignore
    const worklog = new Worklog(exampleData);

    it("timeSpentSeconds", () => {
        expect(worklog.getTimeSpentSeconds()).toBe(1200);
    });

    it("timeSpentMinute", () => {
        expect(worklog.getTimeSpentMinutes()).toBe(20);
    });

    it("timeSpentHour", () => {
        expect(worklog.getTimeSpentHours()).toBe(0.33);
    });

    it("issueKey", () => {
        expect(worklog.getIssueKey()).toBe("ABC-123");
    });

    it("description", () => {
        expect(worklog.getDescription()).toBe("This is an example description");
    });

    it("date", () => {
        expect(worklog.getDate()).toBe("2019-01-01");
    });
})
