type Listener = (
  message: any,
  sender: chrome.runtime.MessageSender,
  sendResponse: (response?: any) => void
) => void;
export class MessagesOneWay<T = undefined> {
  private listener: Listener | null = null;
  constructor(private channel: string) {}

  /**
   * for sending message from process to another process
   *
   */
  sendP2P(payload: T) {
    chrome.runtime.sendMessage({ type: this.channel, ...payload });
  }

  /**
   * for sending message from a content script to another process
   *
   */
  sendC2P(payload: T) {
    chrome.runtime.sendMessage({ type: this.channel, ...payload });
  }

  /**
   * for sending message from a process to a content script
   */
  sendP2C(tabId: number, payload: T) {
    chrome.tabs.sendMessage(tabId, { type: this.channel, ...payload });
  }

  listen(callback: (payload: T) => void) {
    const listener: Listener = (
      message: T & { type: string },
      sender: any,
      sendResponse: any
    ) => {
      if (message.type === this.channel) {
        callback(message);
      }
    };
    this.listener = listener;
    chrome.runtime.onMessage.addListener(this.listener);
  }

  removeListener() {
    if (this.listener) {
      chrome.runtime.onMessage.removeListener(this.listener);
    }
  }
}
