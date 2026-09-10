import { PlaywrightTestConfig } from "@playwright/test"; 

export interface ProjectTestConfig extends PlaywrightTestConfig {
    use?:PlaywrightTestConfig['use'] & {
      erickVar?: string;
      erickVarString?: string;
      erickVarInt?: number;
      erickVarFloat?: number;
      erickVarBoolean?: boolean;
      users: ProjectTestConfigUsers[];
    }
}

interface ProjectTestConfigUsers {
    username: string;
    password: string;
    role: string;
    accounts: ProjectTestConfigUserAccount[];
}

interface ProjectTestConfigUserAccount {
    accountNumber: string;
    nickname: string;
}