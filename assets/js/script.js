'use strict';

function setCookie(name, value, seconds) {
  const date = new Date();
  date.setTime(date.getTime() + seconds * 1000);
  document.cookie = `${name}=${value};expires=${date.toUTCString()};path=/`;
}

function getCookie(name) {
  const cookies = document.cookie.split("; ");
  for (const cookie of cookies) {
    const [key, value] = cookie.split("=");
    if (key === name) return value;
  }
  return null;
}

function getBrowser() {
  const userAgent = navigator.userAgent;
  if (userAgent.includes("Chrome")) return "Chrome";
  if (userAgent.includes("Firefox")) return "Firefox";
  if (userAgent.includes("Safari") && !userAgent.includes("Chrome")) return "Safari";
  return "Unknown Browser";
}

function getOS() {
  const platform = navigator.platform.toLowerCase();
  if (platform.includes("win")) return "Windows";
  if (platform.includes("mac")) return "MacOS";
  if (platform.includes("linux")) return "Linux";
  return "Unknown OS";
}

function showCookieDialog() {
  const cookieDialog = document.getElementById("cookie-dialog");
  cookieDialog.classList.remove("hidden");
}

function showSettingsDialog() {
  const settingsDialog = document.getElementById("settings-dialog");
  settingsDialog.classList.remove("hidden");
}

function hideModals() {
  document.querySelectorAll(".modal").forEach((modal) => modal.classList.add("hidden"));
}

function logPreferences(browser, os, width, height) {
  if (browser) console.log("Browser:", getBrowser());
  if (os) console.log("Operating System:", getOS());
  if (width) console.log("Screen Width:", screen.width);
  if (height) console.log("Screen Height:", screen.height);
}

function init() {
  if (!getCookie("userConsent")) {
    setTimeout(showCookieDialog, 1000);
  }
}

document.getElementById("accept-all").addEventListener("click", () => {
  setCookie("userConsent", "all", 20);
  setCookie("browser", getBrowser(), 20);
  setCookie("os", getOS(), 20);
  setCookie("screenWidth", screen.width, 20);
  setCookie("screenHeight", screen.height, 20);

  logPreferences(true, true, true, true);

  hideModals();
});

const settingsButton = document.getElementById("settings");

function handleSettingsClick() {
  hideModals();
  showSettingsDialog();
}

settingsButton.addEventListener("click", handleSettingsClick);

document.getElementById("save-preferences").addEventListener("click", () => {
  const browserSelected = document.getElementById("browser-info").checked;
  const osSelected = document.getElementById("os-info").checked;
  const screenWidthSelected = document.getElementById("screen-width-info").checked;
  const screenHeightSelected = document.getElementById("screen-height-info").checked;

  if (browserSelected) setCookie("browser", getBrowser(), 20);
  if (osSelected) setCookie("os", getOS(), 20);
  if (screenWidthSelected) setCookie("screenWidth", screen.width, 20);
  if (screenHeightSelected) setCookie("screenHeight", screen.height, 20);

  setCookie("userConsent", "custom", 20);

  logPreferences(browserSelected, osSelected, screenWidthSelected, screenHeightSelected);

  hideModals();
});

window.onload = init;