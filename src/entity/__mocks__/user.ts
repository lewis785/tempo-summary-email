export default class User {
    constructor() {
        console.log('Mock constructor');
    }

    public getAccountId(): string {
        return '123456789';
    }

    public getDisplayName(): string {
        return 'John Smith'
    }
}