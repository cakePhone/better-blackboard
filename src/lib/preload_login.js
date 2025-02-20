import { emit } from "@tauri-apps/api/event";

window.addEventListener("load", () => {
  const sendURL = () => {
    emit("url-change", { url: window.location.href });
  };

  // Detect initial load
  sendURL();

  window.addEventListener("popstate", sendURL);
});
