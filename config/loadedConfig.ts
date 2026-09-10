

import { config } from '../playwright.config';

export const configParameters = config.use as MyConfigParameters;

export class MyConfigParameters {
    baseURL!: string;
    erickVar!: string;
    erickVarString!: string;
    erickVarInt!: number;
    erickVarFloat!: number;
    erickVarBoolean!: boolean;
    users!: ConfigUser[];
}

export interface ConfigUser {
    username: string;
    password: string;
    role: string;
    accounts: ConfigAccount[];
}

export interface ConfigAccount {
    accountNumber: string;
    nickname: string;
}