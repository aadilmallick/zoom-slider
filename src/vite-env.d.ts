/// <reference types="vite/client" />

declare module "*.svg" {
  const content: string;
  export default content;
}

declare namespace chrome.readingList {
  export function query(
    options: Partial<chrome.readingList.EntryOptions>
  ): Promise<chrome.readingList.ReadingListEntry[]>;

  export function addEntry(
    options: chrome.readingList.EntryOptions
  ): Promise<void>;

  export function removeEntry(options: { url: string }): Promise<void>;

  export function updateEntry(
    options: Partial<chrome.readingList.EntryOptions>
  ): Promise<void>;

  export interface EntryOptions {
    hasBeenRead: boolean;
    title: string;
    url: string;
  }

  export interface ReadingListEntry {
    title: string;
    url: string;
    hasBeenRead: boolean;
    creationTime: number;
    lastUpdateTime: number;
  }
}

interface HTMLElement {
  $(selector: string): HTMLElement | null;
  $$(selector: string): NodeListOf<HTMLElement>;
}
