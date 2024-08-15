// requires "notifications" permission in manifest.json

export default class NotificationModel {
  static showBasicNotification({
    title,
    message,
    iconPath,
  }: {
    title: string;
    message: string;
    iconPath: string;
  }) {
    chrome.notifications.create({
      message,
      title: title,
      type: "basic",
      iconUrl: iconPath,
    });
  }

  constructor(private notificationId: string) {}

  showNotification(
    options: chrome.notifications.NotificationOptions<true>,
    cb?: (notificationId: string) => void
  ) {
    chrome.notifications.create(this.notificationId, options, cb);
  }

  clearNotification() {
    chrome.notifications.clear(this.notificationId);
  }
}

export class NotificationAPI {
  static show = chrome.notifications.create.bind(chrome.notifications);

  static onClick = chrome.notifications.onClicked.addListener.bind(
    chrome.notifications.onClicked
  );

  static onClose = chrome.notifications.onClosed.addListener.bind(
    chrome.notifications.onClosed
  );

  static onShowSettings = chrome.notifications.onShowSettings.addListener.bind(
    chrome.notifications.onShowSettings
  );
}

/**
 * Examples
 * 
 * 
 * NotificationModel.show({
    message: "Extension installed",
    title: "Extension installed",
    iconUrl: "icon.png",
    type: "basic",
    buttons: [
      {
        title: "View",
      },
    ],
  });
 */
