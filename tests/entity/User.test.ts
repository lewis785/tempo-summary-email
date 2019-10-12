import User from "../../src/entity/User";

const testData = {
    accountId: "abcdef123456",
    displayName: "John Smith"
};

it('getAccountId', () => {
    const  user = new User(testData);
    expect(user.getAccountId()).toBe('abcdef123456')
});

it('getDisplayName', () => {
   const  user = new User(testData);
    expect(user.getDisplayName()).toBe('John Smith')
});