import { MessagesOneWay } from "app/utils/api/messages";

export const tabPayloadChannel = new MessagesOneWay<{
  tabId: number;
  url: string;
}>("tab-payload");
