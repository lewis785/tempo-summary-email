import {ResponseTypes} from "tempo-client";
import {WorklogResponse} from "tempo-client/lib/responseTypes";
import Worklog from "../../src/entity/worklog";

describe(Worklog, () => {
    const exampleData: Partial<ResponseTypes.WorklogResponse> = {
        description: "This is an example description",
        issue: {
            self: "https://example.com/api/issue/ABC-123",
            key: "ABC-123",
        },
        timeSpentSeconds: 1200,
        startDate: '2019-01-01'
    };

    const worklog = new Worklog(exampleData as WorklogResponse);

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
});
