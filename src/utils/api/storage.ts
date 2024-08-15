// export class SyncStorage<T extends Record<string, any>> {
//   constructor(private data: T) {}

//   async setup() {
//     const data = await chrome.storage.sync.get(this.data);
//     this.data = { ...this.data, ...data };
//   }

//   async isEmpty() {
//     const data = await chrome.storage.sync.get(this.data);
//     return Object.keys(data).length === 0;
//   }

//   async set<K extends keyof T>(key: K, value: T[K]) {
//     this.data[key] = value;
//     await chrome.storage.sync.set({ [key]: value });
//   }

//   async setMultiple(data: Partial<T>) {
//     this.data = { ...this.data, ...data };
//     await chrome.storage.sync.set(data);
//   }

//   async remove<K extends keyof T>(key: K) {
//     delete this.data[key];
//     await chrome.storage.sync.remove(key as string);
//   }

//   async get<K extends keyof T>(key: K) {
//     return this.data[key];
//   }

//   async getMultiple<K extends keyof T>(keys: K[]) {
//     return keys.reduce((acc, key) => {
//       acc[key] = this.data[key];
//       return acc;
//     }, {} as Partial<T>);
//   }
// }

abstract class Storage<T extends Record<string, any>> {
  constructor(
    protected defaultData: T,
    protected storage:
      | chrome.storage.SyncStorageArea
      | chrome.storage.LocalStorageArea
  ) {
    this.storage = storage;
    this.setup();
  }

  private async setup() {
    const data = await this.storage.get(this.getKeys());
    if (!data || Object.keys(data).length === 0) {
      await this.storage.set(this.defaultData);
    }
  }

  getKeys() {
    return Object.keys(this.defaultData) as (keyof T)[];
  }

  async set<K extends keyof T>(key: K, value: T[K]) {
    await this.storage.set({ [key]: value });
  }

  async setMultiple(data: Partial<T>) {
    await this.storage.set(data);
  }

  async remove<K extends keyof T>(key: K) {
    await this.storage.remove(key as string);
  }

  async removeMultiple<K extends keyof T>(keys: K[]) {
    await this.storage.remove(keys as string[]);
  }

  async clear() {
    await this.storage.clear();
  }

  async get<K extends keyof T>(key: K) {
    return (await this.storage.get([key])) as T[K];
  }

  async getMultiple<K extends keyof T>(keys: K[]) {
    return (await this.storage.get(keys)) as Extract<T, Record<K, any>>;
  }

  /**
   * gets the storage percentage used
   */
  async getStoragePercentageUsed() {
    const data = await this.storage.getBytesInUse(null);
    return (data / this.storage.QUOTA_BYTES) * 100;
  }

  onChanged(
    callback: (
      changes: { [key: string]: chrome.storage.StorageChange },
      namespace: "sync" | "local" | "managed" | "session"
    ) => void
  ) {
    chrome.storage.onChanged.addListener(callback);
  }
}

export class SyncStorage<T extends Record<string, any>> extends Storage<T> {
  constructor(defaultData: T) {
    super(defaultData, chrome.storage.sync);
  }
}

export class LocalStorage<T extends Record<string, any>> extends Storage<T> {
  constructor(defaultData: T) {
    super(defaultData, chrome.storage.local);
  }
}
