import { LocalStorage, SyncStorage } from "app/utils/api/storage";

export const appStorage = new LocalStorage({});
export const appSettingsStorage = new SyncStorage({});

// define static methods here
export class Handler {}
