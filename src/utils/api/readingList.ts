export default class ReadingList {
  static async getAll() {
    return await chrome.readingList.query({});
  }

  static async getEntry(options: Partial<chrome.readingList.EntryOptions>) {
    return await chrome.readingList.query(options);
  }

  static async addEntry(entry: chrome.readingList.EntryOptions) {
    await chrome.readingList.addEntry(entry);
  }

  static async removeEntry(url: string) {
    await chrome.readingList.removeEntry({ url });
  }

  static async updateEntry(
    entry: Partial<chrome.readingList.EntryOptions> & { url: string }
  ) {
    await chrome.readingList.updateEntry(entry);
  }
}
