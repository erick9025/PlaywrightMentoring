export interface IEmailProvider {
    login(user: string, password: string): Promise<void>;
    goToInbox(): Promise<void>;
    openEmail(fromWho: string, subject: string): Promise<string>;
}