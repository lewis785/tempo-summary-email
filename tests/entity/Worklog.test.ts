import Worklog from "../../src/entity/Worklog";

it("timeSpentSeconds", () => {
    const worklog = new Worklog(exampleData);
    expect(worklog.getTimeSpentSeconds()).toBe(1200);
});

it("timeSpentMinute", () => {
    const worklog = new Worklog(exampleData);
    expect(worklog.getTimeSpentMinutes()).toBe(20);
});

it("timeSpentHour", () => {
    const worklog = new Worklog(exampleData);
    expect(worklog.getTimeSpentHours()).toBe(0.33);
});

it("issueKey", () => {
    const worklog = new Worklog(exampleData);
    expect(worklog.getIssueKey()).toBe("ABC-123");
});

it("description", () => {
    const worklog = new Worklog(exampleData);
    expect(worklog.getDescription()).toBe("This is an example description");
});

it("date", () => {
    const worklog = new Worklog(exampleData);
    expect(worklog.getDate()).toBe("2019-01-01");
});

const exampleData = {
    description: "This is an example description",
    issue: {
        key: "ABC-123",
    },
    timeSpentSeconds: 1200,
    startDate: '2019-01-01'
};
