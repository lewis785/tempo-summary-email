import JiraIssue from "../../src/entity/JiraIssue";

it("getIssueUrl", () => {
    const jiraIssue = new JiraIssue(testData, exampleDomain);
    expect(jiraIssue.getIssueUrl()).toBe("https://example.atlassian.net/browse/ABC-123");
});

it("getIssueKey", () => {
    const jiraIssue = new JiraIssue(testData, exampleDomain);
    expect(jiraIssue.getIssueKey()).toBe("ABC-123");
});

it("getSummary", () => {
    const jiraIssue = new JiraIssue(testData, exampleDomain);
    expect(jiraIssue.getSummary()).toBe("This is an example summary");
});

const exampleDomain = "example.atlassian.net";
const testData = {
    key: "ABC-123",
    fields: {
        summary: "This is an example summary"
    }
};
