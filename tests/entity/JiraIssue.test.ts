import JiraIssue from "../../src/entity/JiraIssue";

it("getIssueUrl", () => {
    const data = {
        key: "ABC-123",
    };
    const exampleDomain = "example.atlassian.net";
    const jiraIssue = new JiraIssue(data, exampleDomain);
    expect(jiraIssue.getIssueUrl()).toBe("https://example.atlassian.net/browse/ABC-123");
});
