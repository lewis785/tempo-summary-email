import Worklog from "../../src/entity/Worklog";

test("timeSpentSeconds", () => {
    const worklog = new Worklog(exampleData);
    expect(worklog.timeSpentSeconds).toBe(1200);
});

test("timeSpentMinute", () => {
    const worklog = new Worklog(exampleData);
    expect(worklog.timeSpentMinutes).toBe(20);
});

test("timeSpentHour", () => {
    const worklog = new Worklog(exampleData);
    expect(worklog.timeSpentHours).toBe(0.33);
});

test("issueKey", () => {
    const worklog = new Worklog(exampleData);
    expect(worklog.issueKey).toBe("ABC-123");
});

test("description", () => {
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
