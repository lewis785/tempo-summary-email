import Worklog from "../../src/entity/Worklog";

it("timeSpentSeconds", () => {
    const worklog = new Worklog(exampleData);
    expect(worklog.timeSpentSeconds).toBe(1200);
});

it("timeSpentMinute", () => {
    const worklog = new Worklog(exampleData);
    expect(worklog.timeSpentMinutes).toBe(20);
});

it("timeSpentHour", () => {
    const worklog = new Worklog(exampleData);
    expect(worklog.timeSpentHours).toBe(0.33);
});

it("issueKey", () => {
    const worklog = new Worklog(exampleData);
    expect(worklog.issueKey).toBe("ABC-123");
});

it("description", () => {
    const worklog = new Worklog(exampleData);
    expect(worklog.description).toBe("This is an example description");
});

const exampleData = {
    description: "This is an example description",
    issue: {
        key: "ABC-123",
    },
    timeSpentSeconds: 1200,
};
