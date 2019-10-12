export interface UserJson {
    accountId: string;
    displayName: string;
}

export default class User {
    private readonly data: UserJson;

    constructor(data: UserJson) {
        this.data = data;
    }

    public getAccountId(): string {
        return this.data.accountId;
    }

    public getDisplayName(): string {
        return this.data.displayName;
    }
}
