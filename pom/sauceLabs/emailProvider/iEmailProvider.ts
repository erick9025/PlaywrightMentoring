export interface IEmailAuthenticator {
    login(user: string, password: string): Promise<void>;
}

export interface IInboxNavigator {
    goToInbox(): Promise<void>;
}

export interface IEmailReader {
    openEmail(fromWho: string, subject: string): Promise<string>;
}

// Backward-compatible aggregate contract for consumers that need the full workflow.
export interface IEmailProvider extends IEmailAuthenticator, IInboxNavigator, IEmailReader {}