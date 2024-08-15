import { Runtime } from "app/utils/api/runtime";

Runtime.onInstall({
  // runs first time you download the extension
  installCb: async () => {
    console.log("Extension installed");
  },
  // runs every time you update the extension or refresh it
  updateCb: async () => {
    console.log("Extension updated");
  },
  onAll: async () => {
    console.log("Extension loaded");
  },
});
