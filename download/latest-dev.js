// ==UserScript==
// @name         Kxs Client - Survev.io Client
// @namespace    https://github.com/Kisakay/KxsClient
// @version      1.1.1
// @description  A client to enhance the survev.io in-game experience with many features, as well as future features.
// @author       Kisakay x SoyAlguien
// @license      AGPL-3.0
// @run-at       document-end
// @downloadURL  https://kxs.rip/download/latest-dev.js
// @icon         https://kxs.rip/assets/KysClientLogo.png
// @match        *://survev.io/*
// @match        *://66.179.254.36/*
// @match        *://expandedwater.online/*
// @match        *://localhost:3000/*
// @match        *://surviv.wf/*
// @match        *://resurviv.biz/*
// @match        *://82.67.125.203/*
// @match        *://leia-uwu.github.io/survev/*
// @match        *://50v50.online/*
// @grant        GM_xmlhttpRequest
// @grant        GM_info
// @grant        GM.getValue
// @grant        GM.setValue
// ==/UserScript==
;
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 272:
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"base_url":"https://kxs.rip","fileName":"KxsClient.user.js","match":["*://survev.io/*","*://66.179.254.36/*","*://expandedwater.online/*","*://localhost:3000/*","*://surviv.wf/*","*://resurviv.biz/*","*://82.67.125.203/*","*://leia-uwu.github.io/survev/*","*://50v50.online/*"],"grant":["GM_xmlhttpRequest","GM_info","GM.getValue","GM.setValue"]}');

/***/ }),

/***/ 330:
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"name":"kxsclient","version":"1.1.1","main":"index.js","namespace":"https://github.com/Kisakay/KxsClient","icon":"https://kxs.rip/assets/KysClientLogo.png","placeholder":"Kxs Client - Survev.io Client","scripts":{"test":"echo \\"Error: no test specified\\" && exit 1","commits":"oco --yes; npm version patch; git push;","publish":"bun run ./KxsClient-Website-Updater.ts"},"keywords":[],"author":"Kisakay x SoyAlguien","license":"AGPL-3.0","description":"A client to enhance the survev.io in-game experience with many features, as well as future features.","devDependencies":{"@types/tampermonkey":"^5.0.4","ts-loader":"^9.5.1","typescript":"^5.7.2","webpack":"^5.97.1","webpack-cli":"^5.1.4"}}');

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/

;// ./src/ButtonManager.ts
class MenuButton {
    constructor(params) {
        var _a;
        this.isEnabled = (_a = params.initialState) !== null && _a !== void 0 ? _a : false;
        this.button = this.createButton(params);
    }
    createButton(params) {
        const button = document.createElement("button");
        // Set initial text
        this.updateButtonText(button, params.text);
        // Set styles
        Object.assign(button.style, {
            backgroundColor: this.getBackgroundColor(params.color),
            border: "none",
            color: "#fff",
            padding: "10px",
            borderRadius: "5px",
            width: "100%",
            marginBottom: "10px",
            fontSize: "14px",
            cursor: "pointer",
        });
        // Set click handler
        button.onclick = () => {
            this.isEnabled = !this.isEnabled;
            params.onClick();
            if (params.updateText !== false) {
                this.updateButtonText(button, params.text);
                this.updateButtonColor(button, params.color);
            }
        };
        return button;
    }
    updateButtonText(button, baseText) {
        button.textContent = `${baseText} ${this.isEnabled ? "✅" : "❌"}`;
    }
    getBackgroundColor(color) {
        if (color)
            return color;
        return this.isEnabled ? "#4CAF50" : "#FF0000";
    }
    updateButtonColor(button, color) {
        button.style.backgroundColor = this.getBackgroundColor(color);
    }
    getElement() {
        return this.button;
    }
    setState(enabled) {
        this.isEnabled = enabled;
        this.updateButtonColor(this.button);
    }
}
class MenuManager {
    constructor(menu) {
        this.buttons = {};
        this.menu = menu;
    }
    addToggleButton(params) {
        const button = new MenuButton({
            text: params.text,
            initialState: params.initialState,
            color: params.color,
            onClick: params.onClick,
            updateText: params.updateText,
        });
        this.buttons[params.id] = button;
        this.menu.appendChild(button.getElement());
        return button;
    }
    addButton(params) {
        var _a;
        const button = document.createElement("button");
        // Set initial text
        button.textContent = params.text;
        // Set styles
        Object.assign(button.style, {
            backgroundColor: (_a = params.color) !== null && _a !== void 0 ? _a : "#007BFF", // Default color
            border: "none",
            color: "#fff",
            padding: "10px",
            borderRadius: "5px",
            width: "100%",
            marginBottom: "10px",
            fontSize: "14px",
            cursor: "pointer",
        });
        // Set click handler
        button.onclick = params.onClick;
        this.menu.appendChild(button);
    }
    getButton(id) {
        return this.buttons[id];
    }
}


;// ./src/DiscordTracking.ts
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const stuff_emojis = {
    main_weapon: "🔫",
    secondary_weapon: "🔫",
    grenades: "💣",
    melees: "🔪",
    soda: "🥤",
    medkit: "🩹",
    bandage: "🩹",
    pills: "💊",
    backpack: "🎒",
    chest: "📦",
    helmet: "⛑️"
};
class WebhookValidator {
    static isValidWebhookUrl(url) {
        return this.DISCORD_WEBHOOK_REGEX.test(url);
    }
    static isWebhookAlive(webhookUrl) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // First check if the URL format is valid
                if (!this.isValidWebhookUrl(webhookUrl)) {
                    throw new Error("Invalid webhook URL format");
                }
                // Test the webhook with a GET request (Discord allows GET on webhooks)
                const response = yield fetch(webhookUrl, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                // Discord returns 200 for valid webhooks
                return response.status === 200;
            }
            catch (error) {
                console.error("Error validating webhook:", error);
                return false;
            }
        });
    }
    static testWebhook(webhookUrl) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!webhookUrl) {
                    return {
                        isValid: false,
                        message: "Please enter a webhook URL",
                    };
                }
                if (!this.isValidWebhookUrl(webhookUrl)) {
                    return {
                        isValid: false,
                        message: "Invalid Discord webhook URL format",
                    };
                }
                const isAlive = yield this.isWebhookAlive(webhookUrl);
                return {
                    isValid: isAlive,
                    message: isAlive
                        ? "Webhook is valid and working!"
                        : "Webhook is not responding or has been deleted",
                };
            }
            catch (error) {
                return {
                    isValid: false,
                    message: "Error testing webhook connection",
                };
            }
        });
    }
}
WebhookValidator.DISCORD_WEBHOOK_REGEX = /^https:\/\/discord\.com\/api\/webhooks\/\d+\/[\w-]+$/;
class DiscordTracking {
    constructor(kxsClient, webhookUrl) {
        this.kxsClient = kxsClient;
        this.webhookUrl = webhookUrl;
    }
    setWebhookUrl(webhookUrl) {
        this.webhookUrl = webhookUrl;
    }
    validateCurrentWebhook() {
        return __awaiter(this, void 0, void 0, function* () {
            return WebhookValidator.isWebhookAlive(this.webhookUrl);
        });
    }
    sendWebhookMessage(message) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!WebhookValidator.isValidWebhookUrl(this.webhookUrl)) {
                return;
            }
            this.kxsClient.nm.showNotification("Sending Discord message...", "info", 2300);
            try {
                const response = yield fetch(this.webhookUrl, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(message),
                });
                if (!response.ok) {
                    throw new Error(`Discord Webhook Error: ${response.status}`);
                }
            }
            catch (error) {
                console.error("Error sending Discord message:", error);
            }
        });
    }
    getEmbedColor(isWin) {
        return isWin ? 0x2ecc71 : 0xe74c3c; // Green for victory, red for defeat
    }
    trackGameEnd(result) {
        return __awaiter(this, void 0, void 0, function* () {
            const title = result.isWin
                ? "🏆 VICTORY ROYALE!"
                : `${result.position} - Game Over`;
            const embed = {
                title,
                description: `${result.username}'s Match`,
                color: this.getEmbedColor(result.isWin),
                fields: [
                    {
                        name: "💀 Eliminations",
                        value: result.kills.toString(),
                        inline: true,
                    },
                ],
            };
            if (result.duration) {
                embed.fields.push({
                    name: "⏱️ Duration",
                    value: result.duration,
                    inline: true,
                });
            }
            if (result.damageDealt) {
                embed.fields.push({
                    name: "💥 Damage Dealt",
                    value: Math.round(result.damageDealt).toString(),
                    inline: true,
                });
            }
            if (result.damageTaken) {
                embed.fields.push({
                    name: "💢 Damage Taken",
                    value: Math.round(result.damageTaken).toString(),
                    inline: true,
                });
            }
            if (result.username) {
                embed.fields.push({
                    name: "📝 Username",
                    value: result.username,
                    inline: true,
                });
            }
            if (result.stuff) {
                for (const [key, value] of Object.entries(result.stuff)) {
                    if (value) {
                        embed.fields.push({
                            name: `${stuff_emojis[key]} ${key.replace("_", " ").toUpperCase()}`,
                            value,
                            inline: true,
                        });
                    }
                }
            }
            const message = {
                username: result.username,
                content: result.isWin ? "🎉 New Victory!" : "Match Ended",
                embeds: [embed],
            };
            yield this.sendWebhookMessage(message);
        });
    }
}


;// ./src/ClientMainMenu.ts
var ClientMainMenu_awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};


class KxsMainClientMenu {
    constructor(kxsClient) {
        this.kxsClient = kxsClient;
        this.menu = document.createElement("div");
        this.setupKeyListeners();
        this.initMenu();
    }
    initMenu() {
        this.menu.id = "kxsMenu";
        Object.assign(this.menu.style, {
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            padding: "15px",
            marginLeft: "15px",
            borderRadius: "10px",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.6)",
            zIndex: "10001",
            width: "250px",
            fontFamily: "Arial, sans-serif",
            color: "#fff",
            maxHeight: "400px",
            overflowY: "auto",
        });
        const title = document.createElement("h2");
        title.textContent = "Kxs Client";
        title.style.margin = "0 0 10px";
        title.style.textAlign = "center";
        title.style.fontSize = "18px";
        title.style.color = "#FFAE00";
        this.menu.appendChild(title);
        window.onload = () => {
            const savedBackground = localStorage.getItem("backgroundImage");
            if (savedBackground) {
                const backgroundElement = document.getElementById("background");
                if (backgroundElement) {
                    backgroundElement.style.backgroundImage = `url(${savedBackground})`;
                }
            }
        };
        const startRowTop = document.getElementById("start-row-top");
        if (startRowTop) {
            startRowTop.appendChild(this.menu);
        }
        this.menuManager = new MenuManager(this.menu);
        this.menuManager.addToggleButton({
            id: "fps",
            text: "Show FPS",
            initialState: this.kxsClient.isFpsVisible,
            onClick: () => {
                this.kxsClient.isFpsVisible = !this.kxsClient.isFpsVisible;
                this.kxsClient.updateFpsVisibility();
                this.kxsClient.updateLocalStorage();
            },
        });
        this.menuManager.addToggleButton({
            id: "ping",
            text: `Show Ping`,
            initialState: this.kxsClient.isPingVisible,
            onClick: () => {
                this.kxsClient.isPingVisible = !this.kxsClient.isPingVisible;
                this.kxsClient.updatePingVisibility();
                this.kxsClient.updateLocalStorage();
            },
        });
        this.menuManager.addToggleButton({
            id: "kills",
            text: `Show Kills`,
            initialState: this.kxsClient.isKillsVisible,
            onClick: () => {
                this.kxsClient.isKillsVisible = !this.kxsClient.isKillsVisible;
                this.kxsClient.updateKillsVisibility();
                this.kxsClient.updateLocalStorage();
            },
        });
        this.menuManager.addToggleButton({
            id: "uncapFps",
            text: `Uncap FPS`,
            initialState: this.kxsClient.isFpsUncapped,
            onClick: () => {
                this.kxsClient.updateLocalStorage();
                this.kxsClient.toggleFpsUncap();
            },
        });
        this.menuManager.addButton({
            id: "hideShow",
            text: "👀 Hide/Show Menu [P]",
            color: "#6F42C1",
            onClick: () => this.toggleMenuVisibility(),
        });
        this.menuManager.addButton({
            id: "background",
            text: `🎨 Change Background`,
            color: "#007BFF",
            onClick: () => {
                const backgroundElement = document.getElementById("background");
                if (!backgroundElement) {
                    alert("Element with id 'background' not found.");
                    return;
                }
                const choice = prompt("Enter '1' to provide a URL or '2' to upload a local image:");
                if (choice === "1") {
                    const newBackgroundUrl = prompt("Enter the URL of the new background image:");
                    if (newBackgroundUrl) {
                        backgroundElement.style.backgroundImage = `url(${newBackgroundUrl})`;
                        this.kxsClient.saveBackgroundToLocalStorage(newBackgroundUrl);
                        alert("Background updated successfully!");
                    }
                }
                else if (choice === "2") {
                    const fileInput = document.createElement("input");
                    fileInput.type = "file";
                    fileInput.accept = "image/*";
                    fileInput.onchange = (event) => {
                        var _a, _b;
                        const file = (_b = (_a = event.target) === null || _a === void 0 ? void 0 : _a.files) === null || _b === void 0 ? void 0 : _b[0];
                        if (file) {
                            const reader = new FileReader();
                            reader.onload = () => {
                                backgroundElement.style.backgroundImage = `url(${reader.result})`;
                                this.kxsClient.saveBackgroundToLocalStorage(file);
                                alert("Background updated successfully!");
                            };
                            reader.readAsDataURL(file);
                        }
                    };
                    fileInput.click();
                }
            },
        });
        this.menuManager.addButton({
            id: "webhook",
            text: `🕸️ Change Discord Webhook`,
            color: "#007BFF",
            onClick: () => ClientMainMenu_awaiter(this, void 0, void 0, function* () {
                const choice = prompt("enter the new discord webhook url:");
                if (choice) {
                    const result = yield WebhookValidator.testWebhook(choice);
                    if (result.isValid) {
                        this.kxsClient.discordWebhookUrl = choice;
                        this.kxsClient.discordTracker.setWebhookUrl(choice);
                        this.kxsClient.updateLocalStorage();
                        alert(result.message);
                    }
                    else {
                        alert(result.message);
                    }
                }
            }),
        });
    }
    setupKeyListeners() {
        document.addEventListener("keydown", (event) => {
            if (event.key.toLowerCase() === "p") {
                this.toggleMenuVisibility();
            }
        });
    }
    toggleMenuVisibility() {
        var _a;
        const isVisible = ((_a = this.menu) === null || _a === void 0 ? void 0 : _a.style.display) !== "none";
        this.menu.style.display = isVisible ? "none" : "block";
    }
}


;// ./src/Ping.ts
class PingTest {
    constructor(selectedServer) {
        this.ptcDataBuf = new ArrayBuffer(1);
        this.test = {
            region: selectedServer.region,
            url: `wss://${selectedServer.url}/ptc`,
            ping: 0, // Initialize to 0 instead of 9999
            ws: null,
            sendTime: 0,
            retryCount: 0,
            isConnecting: false,
        };
    }
    startPingTest() {
        if (this.test.isConnecting)
            return; // Prevent multiple connection attempts
        if (this.test.ws)
            return; // Don't create new connection if one exists
        this.test.isConnecting = true;
        try {
            const ws = new WebSocket(this.test.url);
            ws.binaryType = "arraybuffer";
            ws.onopen = () => {
                this.test.ws = ws;
                this.test.isConnecting = false;
                this.test.retryCount = 0;
                this.sendPing();
            };
            ws.onmessage = (event) => {
                if (this.test.sendTime === 0)
                    return;
                const elapsed = Date.now() - this.test.sendTime;
                this.test.ping = Math.min(Math.round(elapsed), 999); // Cap at 999ms
                // Schedule next ping
                setTimeout(() => this.sendPing(), 250);
            };
            ws.onerror = (error) => {
                console.error("WebSocket error:", error);
                this.handleConnectionError();
            };
            ws.onclose = () => {
                this.test.ws = null;
                this.test.isConnecting = false;
                if (this.test.retryCount < 3) {
                    setTimeout(() => this.startPingTest(), 1000);
                }
            };
        }
        catch (error) {
            console.error("Failed to create WebSocket:", error);
            this.handleConnectionError();
        }
    }
    handleConnectionError() {
        this.test.ping = 0;
        this.test.isConnecting = false;
        this.test.retryCount++;
        if (this.test.ws) {
            this.test.ws.close();
            this.test.ws = null;
        }
        if (this.test.retryCount < 3) {
            setTimeout(() => this.startPingTest(), 1000);
        }
    }
    sendPing() {
        if (!this.test.ws || this.test.ws.readyState !== WebSocket.OPEN) {
            this.handleConnectionError();
            return;
        }
        try {
            this.test.sendTime = Date.now();
            this.test.ws.send(this.ptcDataBuf);
        }
        catch (error) {
            console.error("Failed to send ping:", error);
            this.handleConnectionError();
        }
    }
    getPingResult() {
        return {
            region: this.test.region,
            ping: this.test.ping || 0,
        };
    }
}
class PingManager {
    constructor() {
        this.currentServer = null;
        this.pingTest = null;
    }
    startPingTest() {
        const currentUrl = window.location.href;
        const isSpecialUrl = /\/#\w+/.test(currentUrl);
        const teamSelectElement = document.getElementById("team-server-select");
        const mainSelectElement = document.getElementById("server-select-main");
        const region = isSpecialUrl && teamSelectElement
            ? teamSelectElement.value
            : mainSelectElement
                ? mainSelectElement.value
                : null;
        if (!region || region === this.currentServer)
            return;
        this.currentServer = region;
        this.resetPing();
        const servers = [
            { region: "NA", url: "usr.mathsiscoolfun.com:8001" },
            { region: "EU", url: "eur.mathsiscoolfun.com:8001" },
            { region: "Asia", url: "asr.mathsiscoolfun.com:8001" },
            { region: "SA", url: "sa.mathsiscoolfun.com:8001" },
        ];
        const selectedServer = servers.find((server) => region.toUpperCase() === server.region.toUpperCase());
        if (selectedServer) {
            this.pingTest = new PingTest(selectedServer);
            this.pingTest.startPingTest();
        }
    }
    resetPing() {
        var _a;
        if ((_a = this.pingTest) === null || _a === void 0 ? void 0 : _a.test.ws) {
            this.pingTest.test.ws.close();
            this.pingTest.test.ws = null;
        }
        this.pingTest = null;
    }
    getPingResult() {
        var _a;
        return ((_a = this.pingTest) === null || _a === void 0 ? void 0 : _a.getPingResult()) || { region: "", ping: 0 };
    }
}


;// ./src/ClientHUD.ts

class KxsClientHUD {
    constructor(kxsClient) {
        this.healthAnimations = [];
        this.lastHealthValue = 100;
        this.kxsClient = kxsClient;
        this.frameCount = 0;
        this.fps = 0;
        this.kills = 0;
        this.isMenuVisible = true;
        this.pingManager = new PingManager();
        if (this.kxsClient.isPingVisible) {
            this.initCounter("ping", "Ping", "45ms");
        }
        if (this.kxsClient.isFpsVisible) {
            this.initCounter("fps", "FPS", "60");
        }
        if (this.kxsClient.isKillsVisible) {
            this.initCounter("kills", "Kills", "0");
        }
        this.setupWeaponBorderHandler();
        this.startUpdateLoop();
        this.escapeMenu();
        this.initFriendDetector();
        if (this.kxsClient.isKillFeedBlint) {
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', this.initKillFeed);
            }
            else {
                this.initKillFeed();
            }
        }
    }
    initFriendDetector() {
        // Initialize friends list
        let all_friends = this.kxsClient.all_friends.split(',') || [];
        console.log(all_friends, "Friends list initialized");
        if (all_friends.length >= 1) {
            // Create a cache for detected friends
            // Structure will be: { "friendName": timestamp }
            const friendsCache = {};
            // Cache duration in milliseconds (4 minutes = 240000 ms)
            const cacheDuration = 4 * 60 * 1000;
            // Select the element containing kill feeds
            const killfeedContents = document.querySelector('#ui-killfeed-contents');
            if (killfeedContents) {
                // Keep track of last seen content for each div
                const lastSeenContent = {
                    "ui-killfeed-0": "",
                    "ui-killfeed-1": "",
                    "ui-killfeed-2": "",
                    "ui-killfeed-3": "",
                    "ui-killfeed-4": "",
                    "ui-killfeed-5": ""
                };
                // Function to check if a friend is in the text with cache management
                const checkForFriends = (text, divId) => {
                    // If the text is identical to the last seen, ignore
                    // @ts-ignore
                    if (text === lastSeenContent[divId])
                        return;
                    // Update the last seen content
                    // @ts-ignore
                    lastSeenContent[divId] = text;
                    // Ignore empty messages
                    if (!text.trim())
                        return;
                    // Current timestamp
                    const currentTime = Date.now();
                    // Check if a friend is mentioned
                    for (let friend of all_friends) {
                        if (text.includes(friend)) {
                            // Check if the friend is in the cache and if the cache is still valid
                            // @ts-ignore
                            const lastSeen = friendsCache[friend];
                            if (!lastSeen || (currentTime - lastSeen > cacheDuration)) {
                                // Update the cache
                                // @ts-ignore
                                friendsCache[friend] = currentTime;
                                // Display notification
                                this.kxsClient.nm.showNotification(`[FriendDetector] ${friend} is in this game`, "info", 2300);
                            }
                            break;
                        }
                    }
                };
                // Function to check all kill feeds
                const checkAllKillfeeds = () => {
                    for (let i = 0; i <= 5; i++) {
                        const divId = `ui-killfeed-${i}`;
                        const killDiv = document.getElementById(divId);
                        if (killDiv) {
                            const textElement = killDiv.querySelector('.killfeed-text');
                            if (textElement && textElement.textContent) {
                                checkForFriends(textElement.textContent, divId);
                            }
                        }
                    }
                };
                // Observe style or text changes in the entire container
                const observer = new MutationObserver(() => {
                    checkAllKillfeeds();
                });
                // Start observing with a configuration that detects all changes
                observer.observe(killfeedContents, {
                    childList: true, // Observe changes to child elements
                    subtree: true, // Observe the entire tree
                    characterData: true, // Observe text changes
                    attributes: true // Observe attribute changes (like style/opacity)
                });
                // Check current content immediately
                checkAllKillfeeds();
                console.log("Friend detector initialized with 4-minute cache");
            }
            else {
                console.warn("Killfeed-contents element not found");
            }
        }
    }
    initKillFeed() {
        this.applyCustomStyles();
        this.setupObserver();
    }
    escapeMenu() {
        const customStyles = `
    .ui-game-menu-desktop {
        background: linear-gradient(135deg, rgba(25, 25, 35, 0.95) 0%, rgba(15, 15, 25, 0.98) 100%) !important;
        border: 1px solid rgba(255, 255, 255, 0.1) !important;
        border-radius: 12px !important;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3) !important;
        padding: 20px !important;
        backdrop-filter: blur(10px) !important;
        max-width: 350px !important;
        margin: auto !important;
        box-sizing: border-box !important;
    }

    .kxs-header {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        margin-bottom: 20px;
        padding: 10px;
        border-bottom: 2px solid rgba(255, 255, 255, 0.1);
    }

    .kxs-logo {
        width: 30px;
        height: 30px;
        margin-right: 10px;
        border-radius: 6px;
    }

    .kxs-title {
        font-size: 20px;
        font-weight: 700;
        color: #ffffff;
        text-transform: uppercase;
        text-shadow: 0 0 10px rgba(66, 135, 245, 0.5);
        font-family: 'Arial', sans-serif;
        letter-spacing: 2px;
    }

    .kxs-title span {
        color: #4287f5;
    }
        
    
    .btn-game-menu {
        background: linear-gradient(135deg, rgba(66, 135, 245, 0.1) 0%, rgba(66, 135, 245, 0.2) 100%) !important;
        border: 1px solid rgba(66, 135, 245, 0.3) !important;
        border-radius: 8px !important;
        color: #ffffff !important;
        transition: all 0.3s ease !important;
        margin: 5px 0 !important;
        padding: 12px !important;
        font-weight: 600 !important;
        width: 100% !important;
        text-align: center !important;
        display: block !important;
        box-sizing: border-box !important;
    }

    .btn-game-menu:hover {
        background: linear-gradient(135deg, rgba(66, 135, 245, 0.2) 0%, rgba(66, 135, 245, 0.3) 100%) !important;
        transform: translateY(-2px) !important;
        box-shadow: 0 4px 12px rgba(66, 135, 245, 0.2) !important;
    }

    .slider-container {
        background: rgba(66, 135, 245, 0.1) !important;
        border-radius: 8px !important;
        padding: 10px 15px !important;
        margin: 10px 0 !important;
        width: 100% !important;
        box-sizing: border-box !important;
    }

    .slider-text {
        color: #ffffff !important;
        font-size: 14px !important;
        margin-bottom: 8px !important;
        text-align: center !important;
    }

    .slider {
        -webkit-appearance: none !important;
        width: 100% !important;
        height: 6px !important;
        border-radius: 3px !important;
        background: rgba(66, 135, 245, 0.3) !important;
        outline: none !important;
        margin: 10px 0 !important;
    }

    .slider::-webkit-slider-thumb {
        -webkit-appearance: none !important;
        width: 16px !important;
        height: 16px !important;
        border-radius: 50% !important;
        background: #4287f5 !important;
        cursor: pointer !important;
        transition: all 0.3s ease !important;
    }

    .slider::-webkit-slider-thumb:hover {
        transform: scale(1.2) !important;
        box-shadow: 0 0 10px rgba(66, 135, 245, 0.5) !important;
    }

    .btns-game-double-row {
        display: flex !important;
        justify-content: center !important;
        gap: 10px !important;
        margin-bottom: 10px !important;
        width: 100% !important;
    }

    .btn-game-container {
        flex: 1 !important;
    }
    `;
        const addCustomStyles = () => {
            const styleElement = document.createElement('style');
            styleElement.textContent = customStyles;
            document.head.appendChild(styleElement);
        };
        const addKxsHeader = () => {
            const menuContainer = document.querySelector('#ui-game-menu');
            if (!menuContainer)
                return;
            const header = document.createElement('div');
            header.className = 'kxs-header';
            const title = document.createElement('span');
            title.className = 'kxs-title';
            title.innerHTML = '<span>Kxs</span> CLIENT';
            header.appendChild(title);
            menuContainer.insertBefore(header, menuContainer.firstChild);
        };
        if (document.querySelector('#ui-game-menu')) {
            addCustomStyles();
            addKxsHeader();
        }
    }
    handleMessage(element) {
        if (element instanceof HTMLElement && element.classList.contains('killfeed-div')) {
            const killfeedText = element.querySelector('.killfeed-text');
            if (killfeedText instanceof HTMLElement) {
                if (killfeedText.textContent && killfeedText.textContent.trim() !== '') {
                    if (!killfeedText.hasAttribute('data-glint')) {
                        killfeedText.setAttribute('data-glint', 'true');
                        element.style.opacity = '1';
                        setTimeout(() => {
                            element.style.opacity = '0';
                        }, 5000);
                    }
                }
                else {
                    element.style.opacity = '0';
                }
            }
        }
    }
    setupObserver() {
        const killfeedContents = document.getElementById('ui-killfeed-contents');
        if (killfeedContents) {
            const observer = new MutationObserver((mutations) => {
                mutations.forEach((mutation) => {
                    if (mutation.target instanceof HTMLElement &&
                        mutation.target.classList.contains('killfeed-text')) {
                        const parentDiv = mutation.target.closest('.killfeed-div');
                        if (parentDiv) {
                            this.handleMessage(parentDiv);
                        }
                    }
                    mutation.addedNodes.forEach((node) => {
                        if (node instanceof HTMLElement) {
                            this.handleMessage(node);
                        }
                    });
                });
            });
            observer.observe(killfeedContents, {
                childList: true,
                subtree: true,
                characterData: true,
                attributes: true,
                attributeFilter: ['style', 'class']
            });
            killfeedContents.querySelectorAll('.killfeed-div').forEach(this.handleMessage);
        }
    }
    applyCustomStyles() {
        const customStyles = document.createElement('style');
        if (this.kxsClient.isKillFeedBlint) {
            customStyles.innerHTML = `
        @import url('https://fonts.googleapis.com/css2?family=Oxanium:wght@600&display=swap');
  
        .killfeed-div {
            position: absolute !important;
            padding: 5px 10px !important;
            background: rgba(0, 0, 0, 0.7) !important;
            border-radius: 5px !important;
            transition: opacity 0.5s ease-out !important;
        }
  
        .killfeed-text {
            font-family: 'Oxanium', sans-serif !important;
            font-weight: bold !important;
            font-size: 16px !important;
            text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5) !important;
            background: linear-gradient(90deg, 
                rgb(255, 0, 0), 
                rgb(255, 127, 0), 
                rgb(255, 255, 0), 
                rgb(0, 255, 0), 
                rgb(0, 0, 255), 
                rgb(75, 0, 130), 
                rgb(148, 0, 211), 
                rgb(255, 0, 0));
            background-size: 200%;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            animation: glint 3s linear infinite;
        }
  
        @keyframes glint {
            0% {
                background-position: 200% 0;
            }
            100% {
                background-position: -200% 0;
            }
        }
  
        .killfeed-div .killfeed-text:empty {
            display: none !important;
        }
      `;
        }
        else {
            customStyles.innerHTML = `
        .killfeed-div {
            position: absolute;
            padding: 5px 10px;
            background: rgba(0, 0, 0, 0.7);
            border-radius: 5px;
            transition: opacity 0.5s ease-out;
        }
  
        .killfeed-text {
            font-family: inherit;
            font-weight: normal;
            font-size: inherit;
            color: inherit;
            text-shadow: none;
            background: none;
        }
  
        .killfeed-div .killfeed-text:empty {
            display: none;
        }
      `;
        }
        document.head.appendChild(customStyles);
    }
    handleResize() {
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        for (const name of ['fps', 'kills', 'ping']) {
            const counterContainer = document.getElementById(`${name}CounterContainer`);
            if (!counterContainer)
                continue;
            const counter = this.kxsClient.counters[name];
            if (!counter)
                continue;
            const rect = counterContainer.getBoundingClientRect();
            const savedPosition = this.getSavedPosition(name);
            let newPosition = this.calculateSafePosition(savedPosition, rect.width, rect.height, viewportWidth, viewportHeight);
            this.applyPosition(counterContainer, newPosition);
            this.savePosition(name, newPosition);
        }
    }
    calculateSafePosition(currentPosition, elementWidth, elementHeight, viewportWidth, viewportHeight) {
        let { left, top } = currentPosition;
        if (left + elementWidth > viewportWidth) {
            left = viewportWidth - elementWidth;
        }
        if (left < 0) {
            left = 0;
        }
        if (top + elementHeight > viewportHeight) {
            top = viewportHeight - elementHeight;
        }
        if (top < 0) {
            top = 0;
        }
        return { left, top };
    }
    getSavedPosition(name) {
        const savedPosition = localStorage.getItem(`${name}CounterPosition`);
        if (savedPosition) {
            try {
                return JSON.parse(savedPosition);
            }
            catch (_a) {
                return this.kxsClient.defaultPositions[name];
            }
        }
        return this.kxsClient.defaultPositions[name];
    }
    applyPosition(element, position) {
        element.style.left = `${position.left}px`;
        element.style.top = `${position.top}px`;
    }
    savePosition(name, position) {
        localStorage.setItem(`${name}CounterPosition`, JSON.stringify(position));
    }
    startUpdateLoop() {
        var _a;
        const now = performance.now();
        const delta = now - this.kxsClient.lastFrameTime;
        this.frameCount++;
        if (delta >= 1000) {
            this.fps = Math.round((this.frameCount * 1000) / delta);
            this.frameCount = 0;
            this.kxsClient.lastFrameTime = now;
            this.kills = this.kxsClient.getKills();
            if (this.kxsClient.isFpsVisible && this.kxsClient.counters.fps) {
                this.kxsClient.counters.fps.textContent = `FPS: ${this.fps}`;
            }
            if (this.kxsClient.isKillsVisible && this.kxsClient.counters.kills) {
                this.kxsClient.counters.kills.textContent = `Kills: ${this.kills}`;
            }
            if (this.kxsClient.isPingVisible &&
                this.kxsClient.counters.ping &&
                this.pingManager) {
                const result = this.pingManager.getPingResult();
                this.kxsClient.counters.ping.textContent = `PING: ${result.ping} ms`;
            }
        }
        this.pingManager.startPingTest();
        if (this.kxsClient.animationFrameCallback) {
            this.kxsClient.animationFrameCallback(() => this.startUpdateLoop());
        }
        this.updateUiElements();
        this.updateBoostBars();
        this.updateHealthBars();
        (_a = this.kxsClient.kill_leader) === null || _a === void 0 ? void 0 : _a.update(this.kills);
    }
    initCounter(name, label, initialText) {
        const counter = document.createElement("div");
        counter.id = `${name}Counter`;
        const counterContainer = document.createElement("div");
        counterContainer.id = `${name}CounterContainer`;
        Object.assign(counterContainer.style, {
            position: "absolute",
            left: `${this.kxsClient.defaultPositions[name].left}px`,
            top: `${this.kxsClient.defaultPositions[name].top}px`,
            zIndex: "10000",
        });
        Object.assign(counter.style, {
            color: "white",
            backgroundColor: "rgba(0, 0, 0, 0.2)",
            borderRadius: "5px",
            fontFamily: "Arial, sans-serif",
            padding: "5px 10px",
            pointerEvents: "auto",
            cursor: "move",
            width: `${this.kxsClient.defaultSizes[name].width}px`,
            height: `${this.kxsClient.defaultSizes[name].height}px`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            resize: "both",
            overflow: "hidden",
        });
        counter.textContent = `${label}: ${initialText}`;
        counterContainer.appendChild(counter);
        const uiTopLeft = document.getElementById("ui-top-left");
        if (uiTopLeft) {
            uiTopLeft.appendChild(counterContainer);
        }
        const adjustFontSize = () => {
            const { width, height } = counter.getBoundingClientRect();
            const size = Math.min(width, height) * 0.4;
            counter.style.fontSize = `${size}px`;
        };
        new ResizeObserver(adjustFontSize).observe(counter);
        counter.addEventListener("mousedown", (event) => {
            if (event.button === 1) {
                this.resetCounter(name, label, initialText);
                event.preventDefault();
            }
        });
        this.kxsClient.makeDraggable(counterContainer, `${name}CounterPosition`);
        this.kxsClient.counters[name] = counter;
    }
    resetCounter(name, label, initialText) {
        const counter = this.kxsClient.counters[name];
        const container = document.getElementById(`${name}CounterContainer`);
        if (!counter || !container)
            return;
        // Reset only this counter's position and size
        Object.assign(container.style, {
            left: `${this.kxsClient.defaultPositions[name].left}px`,
            top: `${this.kxsClient.defaultPositions[name].top}px`,
        });
        Object.assign(counter.style, {
            width: `${this.kxsClient.defaultSizes[name].width}px`,
            height: `${this.kxsClient.defaultSizes[name].height}px`,
            fontSize: "18px",
        });
        counter.textContent = `${label}: ${initialText}`;
        // Clear the saved position for this counter only
        localStorage.removeItem(`${name}CounterPosition`);
    }
    updateBoostBars() {
        const boostCounter = document.querySelector("#ui-boost-counter");
        if (boostCounter) {
            const boostBars = boostCounter.querySelectorAll(".ui-boost-base .ui-bar-inner");
            let totalBoost = 0;
            const weights = [25, 25, 40, 10];
            boostBars.forEach((bar, index) => {
                const width = parseFloat(bar.style.width);
                if (!isNaN(width)) {
                    totalBoost += width * (weights[index] / 100);
                }
            });
            const averageBoost = Math.round(totalBoost);
            let boostDisplay = boostCounter.querySelector(".boost-display");
            if (!boostDisplay) {
                boostDisplay = document.createElement("div");
                boostDisplay.classList.add("boost-display");
                Object.assign(boostDisplay.style, {
                    position: "absolute",
                    bottom: "75px",
                    right: "335px",
                    color: "#FF901A",
                    backgroundColor: "rgba(0, 0, 0, 0.4)",
                    padding: "5px 10px",
                    borderRadius: "5px",
                    fontFamily: "Arial, sans-serif",
                    fontSize: "14px",
                    zIndex: "10",
                    textAlign: "center",
                });
                boostCounter.appendChild(boostDisplay);
            }
            boostDisplay.textContent = `AD: ${averageBoost}%`;
        }
    }
    setupWeaponBorderHandler() {
        const weaponContainers = Array.from(document.getElementsByClassName("ui-weapon-switch"));
        weaponContainers.forEach((container) => {
            if (container.id === "ui-weapon-id-4") {
                container.style.border = "3px solid #2f4032";
            }
            else {
                container.style.border = "3px solid #FFFFFF";
            }
        });
        const weaponNames = Array.from(document.getElementsByClassName("ui-weapon-name"));
        const WEAPON_COLORS = {
            ORANGE: '#FFAE00',
            BLUE: '#007FFF',
            GREEN: '#0f690d',
            RED: '#FF0000',
            BLACK: '#000000',
            OLIVE: '#808000',
            ORANGE_RED: '#FF4500',
            PURPLE: '#800080',
            TEAL: '#008080',
            BROWN: '#A52A2A',
            PINK: '#FFC0CB',
            DEFAULT: '#FFFFFF'
        };
        const WEAPON_COLOR_MAPPING = {
            ORANGE: ['CZ-3A1', 'G18C', 'M9', 'M93R', 'MAC-10', 'MP5', 'P30L', 'DUAL P30L', 'UMP9', 'VECTOR', 'VSS', 'FLAMETHROWER'],
            BLUE: ['AK-47', 'OT-38', 'OTS-38', 'M39 EMR', 'DP-28', 'MOSIN-NAGANT', 'SCAR-H', 'SV-98', 'M1 GARAND', 'PKP PECHENEG', 'AN-94', 'BAR M1918', 'BLR 81', 'SVD-63', 'M134', 'WATER GUN', 'GROZA', 'GROZA-S'],
            GREEN: ['FAMAS', 'M416', 'M249', 'QBB-97', 'MK 12 SPR', 'M4A1-S', 'SCOUT ELITE', 'L86A2'],
            RED: ['M870', 'MP220', 'SAIGA-12', 'SPAS-12', 'USAS-12', 'SUPER 90', 'LASR GUN', 'M1100'],
            BLACK: ['DEAGLE 50', 'RAINBOW BLASTER'],
            OLIVE: ['AWM-S', 'MK 20 SSR'],
            ORANGE_RED: ['FLARE GUN'],
            PURPLE: ['MODEL 94', 'PEACEMAKER', 'VECTOR (.45 ACP)', 'M1911', 'M1A1', 'MK45G'],
            TEAL: ['M79'],
            BROWN: ['POTATO CANNON', 'SPUD GUN'],
            PINK: ['HEART CANNON'],
            DEFAULT: []
        };
        weaponNames.forEach((weaponNameElement) => {
            const weaponContainer = weaponNameElement.closest(".ui-weapon-switch");
            const observer = new MutationObserver(() => {
                var _a, _b, _c;
                const weaponName = ((_b = (_a = weaponNameElement.textContent) === null || _a === void 0 ? void 0 : _a.trim()) === null || _b === void 0 ? void 0 : _b.toUpperCase()) || '';
                const colorKey = (((_c = Object.entries(WEAPON_COLOR_MAPPING)
                    .find(([_, weapons]) => weapons.includes(weaponName))) === null || _c === void 0 ? void 0 : _c[0]) || 'DEFAULT');
                if (weaponContainer && weaponContainer.id !== "ui-weapon-id-4") {
                    weaponContainer.style.border = `3px solid ${WEAPON_COLORS[colorKey]}`;
                }
            });
            observer.observe(weaponNameElement, { childList: true, characterData: true, subtree: true });
        });
    }
    updateUiElements() {
        const currentUrl = window.location.href;
        const isSpecialUrl = /\/#\w+/.test(currentUrl);
        const playerOptions = document.getElementById("player-options");
        const teamMenuContents = document.getElementById("team-menu-contents");
        const startMenuContainer = document.querySelector("#start-menu .play-button-container");
        if (!playerOptions)
            return;
        if (isSpecialUrl &&
            teamMenuContents &&
            playerOptions.parentNode !== teamMenuContents) {
            teamMenuContents.appendChild(playerOptions);
        }
        else if (!isSpecialUrl &&
            startMenuContainer &&
            playerOptions.parentNode !== startMenuContainer) {
            const firstChild = startMenuContainer.firstChild;
            startMenuContainer.insertBefore(playerOptions, firstChild);
        }
        const teamMenu = document.getElementById("team-menu");
        if (teamMenu) {
            teamMenu.style.height = "355px";
        }
        const menuBlocks = document.querySelectorAll(".menu-block");
        menuBlocks.forEach((block) => {
            block.style.maxHeight = "355px";
        });
        //scalable?
    }
    updateMenuButtonText() {
        const hideButton = document.getElementById("hideMenuButton");
        hideButton.textContent = this.isMenuVisible
            ? "Hide Menu [P]"
            : "Show Menu [P]";
    }
    updateHealthBars() {
        const healthBars = document.querySelectorAll("#ui-health-container");
        healthBars.forEach((container) => {
            var _a, _b;
            const bar = container.querySelector("#ui-health-actual");
            if (bar) {
                const currentHealth = Math.round(parseFloat(bar.style.width));
                let percentageText = container.querySelector(".health-text");
                // Create or update percentage text
                if (!percentageText) {
                    percentageText = document.createElement("span");
                    percentageText.classList.add("health-text");
                    Object.assign(percentageText.style, {
                        width: "100%",
                        textAlign: "center",
                        marginTop: "5px",
                        color: "#333",
                        fontSize: "20px",
                        fontWeight: "bold",
                        position: "absolute",
                        zIndex: "10",
                    });
                    container.appendChild(percentageText);
                }
                // Check for health change
                if (currentHealth !== this.lastHealthValue) {
                    const healthChange = currentHealth - this.lastHealthValue;
                    if (healthChange !== 0) {
                        this.showHealthChangeAnimation(container, healthChange);
                    }
                    this.lastHealthValue = currentHealth;
                }
                if (this.kxsClient.isHealthWarningEnabled) {
                    (_a = this.kxsClient.healWarning) === null || _a === void 0 ? void 0 : _a.update(currentHealth);
                }
                else {
                    (_b = this.kxsClient.healWarning) === null || _b === void 0 ? void 0 : _b.hide();
                }
                percentageText.textContent = `${currentHealth}%`;
                // Update animations
                this.updateHealthAnimations();
            }
        });
    }
    showHealthChangeAnimation(container, change) {
        const animation = document.createElement("div");
        const isPositive = change > 0;
        Object.assign(animation.style, {
            position: "absolute",
            color: isPositive ? "#2ecc71" : "#e74c3c",
            fontSize: "24px",
            fontWeight: "bold",
            fontFamily: "Arial, sans-serif",
            textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
            pointerEvents: "none",
            zIndex: "100",
            opacity: "1",
            top: "50%",
            right: "-80px", // Position à droite de la barre de vie
            transform: "translateY(-50%)", // Centre verticalement
            whiteSpace: "nowrap", // Empêche le retour à la ligne
        });
        animation.textContent = `${isPositive ? "+" : ""}${change} HP`;
        container.appendChild(animation);
        this.healthAnimations.push({
            element: animation,
            startTime: performance.now(),
            duration: 1500, // Animation duration in milliseconds
            value: change,
        });
    }
    updateHealthAnimations() {
        const currentTime = performance.now();
        this.healthAnimations = this.healthAnimations.filter(animation => {
            const elapsed = currentTime - animation.startTime;
            const progress = Math.min(elapsed / animation.duration, 1);
            if (progress < 1) {
                // Update animation position and opacity
                // Maintenant l'animation se déplace horizontalement vers la droite
                const translateX = progress * 20; // Déplacement horizontal
                Object.assign(animation.element.style, {
                    transform: `translateY(-50%) translateX(${translateX}px)`,
                    opacity: String(1 - progress),
                });
                return true;
            }
            else {
                // Remove completed animation
                animation.element.remove();
                return false;
            }
        });
    }
}


;// ./src/intercept.ts
function intercept(link, targetUrl) {
    const open = XMLHttpRequest.prototype.open;
    XMLHttpRequest.prototype.open = function (method, url) {
        if (url.includes(link)) {
            arguments[1] = targetUrl;
        }
        open.apply(this, arguments);
    };
    const originalFetch = window.fetch;
    window.fetch = function (url, options) {
        if (url.includes(link)) {
            url = targetUrl;
        }
        return originalFetch.apply(this, arguments);
    };
}


;// ./src/HealthWarning.ts
class HealthWarning {
    constructor(kxsClient) {
        this.offsetX = 20; // Distance depuis le curseur
        this.offsetY = 20;
        this.warningElement = null;
        this.kxsClient = kxsClient;
        this.createWarningElement();
        this.initMouseTracking();
    }
    createWarningElement() {
        const warning = document.createElement("div");
        const uiTopLeft = document.getElementById("ui-top-left");
        warning.style.cssText = `
            position: fixed;
            background: rgba(0, 0, 0, 0.8);
            border: 2px solid #ff0000;
            border-radius: 5px;
            padding: 10px 15px;
            color: #ff0000;
            font-family: Arial, sans-serif;
            font-size: 14px;
            z-index: 9999;
            display: none;
            backdrop-filter: blur(5px);
            transition: transform 0.1s ease;
            pointer-events: none;
        `;
        const content = document.createElement("div");
        content.style.cssText = `
            display: flex;
            align-items: center;
            gap: 8px;
        `;
        const icon = document.createElement("div");
        icon.innerHTML = `
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
        `;
        const text = document.createElement("span");
        text.textContent = "LOW HP!";
        if (uiTopLeft) {
            content.appendChild(icon);
            content.appendChild(text);
            warning.appendChild(content);
            uiTopLeft.appendChild(warning);
        }
        this.warningElement = warning;
        this.addPulseAnimation();
    }
    initMouseTracking() {
        document.addEventListener("mousemove", (e) => {
            if (!this.warningElement || this.warningElement.style.display === "none")
                return;
            const x = e.clientX + this.offsetX;
            const y = e.clientY + this.offsetY;
            // Empêcher l'alerte de sortir de l'écran
            const rect = this.warningElement.getBoundingClientRect();
            const maxX = window.innerWidth - rect.width;
            const maxY = window.innerHeight - rect.height;
            const finalX = Math.min(Math.max(0, x), maxX);
            const finalY = Math.min(Math.max(0, y), maxY);
            this.warningElement.style.transform = `translate(${finalX}px, ${finalY}px)`;
        });
    }
    addPulseAnimation() {
        const keyframes = `
            @keyframes pulse {
                0% { opacity: 1; }
                50% { opacity: 0.5; }
                100% { opacity: 1; }
            }
        `;
        const style = document.createElement("style");
        style.textContent = keyframes;
        document.head.appendChild(style);
        if (this.warningElement) {
            this.warningElement.style.animation = "pulse 1.5s infinite";
        }
    }
    show(health) {
        if (!this.warningElement)
            return;
        this.warningElement.style.display = "block";
        const span = this.warningElement.querySelector("span");
        if (span) {
            span.textContent = `LOW HP: ${health}%`;
        }
    }
    hide() {
        if (!this.warningElement)
            return;
        this.warningElement.style.display = "none";
    }
    update(health) {
        if (health <= 30 && health > 0) {
            this.show(health);
        }
        else {
            this.hide();
        }
    }
}


;// ./src/KillLeaderTracking.ts
class KillLeaderTracker {
    constructor(kxsClient) {
        this.offsetX = 20;
        this.offsetY = 20;
        this.lastKnownKills = 0;
        this.wasKillLeader = false;
        this.MINIMUM_KILLS_FOR_LEADER = 3;
        this.kxsClient = kxsClient;
        this.warningElement = null;
        this.encouragementElement = null;
        this.killLeaderKillCount = 0;
        this.createEncouragementElement();
        this.initMouseTracking();
    }
    createEncouragementElement() {
        const encouragement = document.createElement("div");
        encouragement.style.cssText = `
            position: fixed;
            background: rgba(0, 255, 0, 0.1);
            border: 2px solid #00ff00;
            border-radius: 5px;
            padding: 10px 15px;
            color: #00ff00;
            font-family: Arial, sans-serif;
            font-size: 14px;
            z-index: 9999;
            display: none;
            backdrop-filter: blur(5px);
            transition: all 0.3s ease;
            pointer-events: none;
            box-shadow: 0 0 10px rgba(0, 255, 0, 0.3);
        `;
        const content = document.createElement("div");
        content.style.cssText = `
            display: flex;
            align-items: center;
            gap: 8px;
        `;
        const icon = document.createElement("div");
        icon.innerHTML = `
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
            </svg>
        `;
        const text = document.createElement("span");
        text.textContent = "Nice Kill!";
        content.appendChild(icon);
        content.appendChild(text);
        encouragement.appendChild(content);
        document.body.appendChild(encouragement);
        this.encouragementElement = encouragement;
        this.addEncouragementAnimation();
    }
    initMouseTracking() {
        document.addEventListener("mousemove", (e) => {
            this.updateElementPosition(this.warningElement, e);
            this.updateElementPosition(this.encouragementElement, e);
        });
    }
    updateElementPosition(element, e) {
        if (!element || element.style.display === "none")
            return;
        const x = e.clientX + this.offsetX;
        const y = e.clientY + this.offsetY;
        const rect = element.getBoundingClientRect();
        const maxX = window.innerWidth - rect.width;
        const maxY = window.innerHeight - rect.height;
        const finalX = Math.min(Math.max(0, x), maxX);
        const finalY = Math.min(Math.max(0, y), maxY);
        element.style.transform = `translate(${finalX}px, ${finalY}px)`;
    }
    addEncouragementAnimation() {
        const keyframes = `
            @keyframes encouragementPulse {
                0% { transform: scale(1); opacity: 1; }
                50% { transform: scale(1.1); opacity: 0.8; }
                100% { transform: scale(1); opacity: 1; }
            }
            @keyframes fadeInOut {
                0% { opacity: 0; transform: translateY(20px); }
                10% { opacity: 1; transform: translateY(0); }
                90% { opacity: 1; transform: translateY(0); }
                100% { opacity: 0; transform: translateY(-20px); }
            }
        `;
        const style = document.createElement("style");
        style.textContent = keyframes;
        document.head.appendChild(style);
        if (this.encouragementElement) {
            this.encouragementElement.style.animation = "fadeInOut 3s forwards";
        }
    }
    showEncouragement(killsToLeader, isDethrone = false, noKillLeader = false) {
        if (!this.encouragementElement)
            return;
        let message;
        if (isDethrone) {
            message = "Oh no! You've been dethroned!";
            this.encouragementElement.style.borderColor = "#ff0000";
            this.encouragementElement.style.color = "#ff0000";
            this.encouragementElement.style.background = "rgba(255, 0, 0, 0.1)";
        }
        else if (noKillLeader) {
            const killsNeeded = this.MINIMUM_KILLS_FOR_LEADER - this.lastKnownKills;
            message = `Nice Kill! Get ${killsNeeded} more kills to become the first Kill Leader!`;
        }
        else {
            message =
                killsToLeader <= 0
                    ? "You're the Kill Leader! 👑"
                    : `Nice Kill! ${killsToLeader} more to become Kill Leader!`;
        }
        const span = this.encouragementElement.querySelector("span");
        if (span)
            span.textContent = message;
        this.encouragementElement.style.display = "block";
        this.encouragementElement.style.animation = "fadeInOut 3s forwards";
        setTimeout(() => {
            if (this.encouragementElement) {
                this.encouragementElement.style.display = "none";
                // Reset colors
                this.encouragementElement.style.borderColor = "#00ff00";
                this.encouragementElement.style.color = "#00ff00";
                this.encouragementElement.style.background = "rgba(0, 255, 0, 0.1)";
            }
        }, 7000);
    }
    isKillLeader() {
        const killLeaderNameElement = document.querySelector("#ui-kill-leader-name");
        return this.kxsClient.getPlayerName() === (killLeaderNameElement === null || killLeaderNameElement === void 0 ? void 0 : killLeaderNameElement.textContent);
    }
    update(myKills) {
        if (!this.kxsClient.isKillLeaderTrackerEnabled)
            return;
        const killLeaderElement = document.querySelector("#ui-kill-leader-count");
        this.killLeaderKillCount = parseInt((killLeaderElement === null || killLeaderElement === void 0 ? void 0 : killLeaderElement.textContent) || "0", 10);
        if (myKills > this.lastKnownKills) {
            if (this.killLeaderKillCount === 0) {
                // Pas encore de kill leader, encourager le joueur à atteindre 3 kills
                this.showEncouragement(0, false, true);
            }
            else if (this.killLeaderKillCount < this.MINIMUM_KILLS_FOR_LEADER) {
                // Ne rien faire si le kill leader n'a pas atteint le minimum requis
                return;
            }
            else if (this.isKillLeader()) {
                this.showEncouragement(0);
                this.wasKillLeader = true;
            }
            else {
                const killsNeeded = this.killLeaderKillCount + 1 - myKills;
                this.showEncouragement(killsNeeded);
            }
        }
        else if (this.wasKillLeader && !this.isKillLeader()) {
            // Détroné
            this.showEncouragement(0, true);
            this.wasKillLeader = false;
        }
        this.lastKnownKills = myKills;
    }
}


;// ./src/GridSystem.ts
class GridSystem {
    constructor() {
        this.gridSize = 20; // Size of each grid cell
        this.snapThreshold = 15; // Distance in pixels to trigger snap
        this.gridVisible = false;
        this.magneticEdges = true;
        this.gridContainer = this.createGridOverlay();
        this.setupKeyBindings();
    }
    createGridOverlay() {
        const container = document.createElement("div");
        container.id = "grid-overlay";
        Object.assign(container.style, {
            position: "fixed",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
            pointerEvents: "none",
            zIndex: "9999",
            display: "none",
            opacity: "0.2",
        });
        // Create vertical lines
        for (let x = this.gridSize; x < window.innerWidth; x += this.gridSize) {
            const vLine = document.createElement("div");
            Object.assign(vLine.style, {
                position: "absolute",
                left: `${x}px`,
                top: "0",
                width: "1px",
                height: "100%",
                backgroundColor: "#4CAF50",
            });
            container.appendChild(vLine);
        }
        // Create horizontal lines
        for (let y = this.gridSize; y < window.innerHeight; y += this.gridSize) {
            const hLine = document.createElement("div");
            Object.assign(hLine.style, {
                position: "absolute",
                left: "0",
                top: `${y}px`,
                width: "100%",
                height: "1px",
                backgroundColor: "#4CAF50",
            });
            container.appendChild(hLine);
        }
        document.body.appendChild(container);
        return container;
    }
    setupKeyBindings() {
        document.addEventListener("keydown", (e) => {
            if (e.key === "g" && e.altKey) {
                this.toggleGrid();
            }
        });
    }
    toggleGrid() {
        this.gridVisible = !this.gridVisible;
        this.gridContainer.style.display = this.gridVisible ? "block" : "none";
    }
    snapToGrid(element, x, y) {
        const rect = element.getBoundingClientRect();
        const elementWidth = rect.width;
        const elementHeight = rect.height;
        // Snap to grid
        let snappedX = Math.round(x / this.gridSize) * this.gridSize;
        let snappedY = Math.round(y / this.gridSize) * this.gridSize;
        // Edge snapping
        if (this.magneticEdges) {
            const screenEdges = {
                left: 0,
                right: window.innerWidth - elementWidth,
                center: (window.innerWidth - elementWidth) / 2,
                top: 0,
                bottom: window.innerHeight - elementHeight,
                middle: (window.innerHeight - elementHeight) / 2,
            };
            // Snap to horizontal edges
            if (Math.abs(x - screenEdges.left) < this.snapThreshold) {
                snappedX = screenEdges.left;
            }
            else if (Math.abs(x - screenEdges.right) < this.snapThreshold) {
                snappedX = screenEdges.right;
            }
            else if (Math.abs(x - screenEdges.center) < this.snapThreshold) {
                snappedX = screenEdges.center;
            }
            // Snap to vertical edges
            if (Math.abs(y - screenEdges.top) < this.snapThreshold) {
                snappedY = screenEdges.top;
            }
            else if (Math.abs(y - screenEdges.bottom) < this.snapThreshold) {
                snappedY = screenEdges.bottom;
            }
            else if (Math.abs(y - screenEdges.middle) < this.snapThreshold) {
                snappedY = screenEdges.middle;
            }
        }
        return { x: snappedX, y: snappedY };
    }
    highlightNearestGridLine(x, y) {
        if (!this.gridVisible)
            return;
        // Remove existing highlights
        const highlights = document.querySelectorAll(".grid-highlight");
        highlights.forEach((h) => h.remove());
        // Create highlight for nearest vertical line
        const nearestX = Math.round(x / this.gridSize) * this.gridSize;
        if (Math.abs(x - nearestX) < this.snapThreshold) {
            const vHighlight = document.createElement("div");
            Object.assign(vHighlight.style, {
                position: "absolute",
                left: `${nearestX}px`,
                top: "0",
                width: "2px",
                height: "100%",
                backgroundColor: "#FFD700",
                zIndex: "10000",
                pointerEvents: "none",
            });
            vHighlight.classList.add("grid-highlight");
            this.gridContainer.appendChild(vHighlight);
        }
        // Create highlight for nearest horizontal line
        const nearestY = Math.round(y / this.gridSize) * this.gridSize;
        if (Math.abs(y - nearestY) < this.snapThreshold) {
            const hHighlight = document.createElement("div");
            Object.assign(hHighlight.style, {
                position: "absolute",
                left: "0",
                top: `${nearestY}px`,
                width: "100%",
                height: "2px",
                backgroundColor: "#FFD700",
                zIndex: "10000",
                pointerEvents: "none",
            });
            hHighlight.classList.add("grid-highlight");
            this.gridContainer.appendChild(hHighlight);
        }
    }
}


;// ./src/StatsParser.ts
class StatsParser {
    static cleanNumber(str) {
        return parseInt(str.replace(/[^\d.-]/g, "")) || 0;
    }
    /**
     * Extract the full duration string including the unit
     */
    static extractDuration(str) {
        const match = str.match(/(\d+\s*[smh])/i);
        return match ? match[1].trim() : "0s";
    }
    static parse(statsText, rankContent) {
        let stats = {
            username: "Player",
            kills: 0,
            damageDealt: 0,
            damageTaken: 0,
            duration: "",
            position: "#unknown",
        };
        // Handle developer format
        const devPattern = /Developer.*?Kills(\d+).*?Damage Dealt(\d+).*?Damage Taken(\d+).*?Survived(\d+\s*[smh])/i;
        const devMatch = statsText.match(devPattern);
        if (devMatch) {
            return {
                username: "Player",
                kills: this.cleanNumber(devMatch[1]),
                damageDealt: this.cleanNumber(devMatch[2]),
                damageTaken: this.cleanNumber(devMatch[3]),
                duration: devMatch[4].trim(), // Keep the full duration string with unit
                position: rankContent.replace("##", "#"),
            };
        }
        // Handle template format
        const templatePattern = /%username%.*?Kills%kills_number%.*?Dealt%number_dealt%.*?Taken%damage_taken%.*?Survived%duration%/;
        const templateMatch = statsText.match(templatePattern);
        if (templateMatch) {
            const parts = statsText.split(/Kills|Dealt|Taken|Survived/);
            if (parts.length >= 5) {
                return {
                    username: parts[0].trim(),
                    kills: this.cleanNumber(parts[1]),
                    damageDealt: this.cleanNumber(parts[2]),
                    damageTaken: this.cleanNumber(parts[3]),
                    duration: this.extractDuration(parts[4]), // Extract full duration with unit
                    position: rankContent.replace("##", "#"),
                };
            }
        }
        // Generic parsing as fallback
        const usernameMatch = statsText.match(/^([^0-9]+)/);
        if (usernameMatch) {
            stats.username = usernameMatch[1].trim();
        }
        const killsMatch = statsText.match(/Kills[^0-9]*(\d+)/i);
        if (killsMatch) {
            stats.kills = this.cleanNumber(killsMatch[1]);
        }
        const dealtMatch = statsText.match(/Dealt[^0-9]*(\d+)/i);
        if (dealtMatch) {
            stats.damageDealt = this.cleanNumber(dealtMatch[1]);
        }
        const takenMatch = statsText.match(/Taken[^0-9]*(\d+)/i);
        if (takenMatch) {
            stats.damageTaken = this.cleanNumber(takenMatch[1]);
        }
        // Extract survival time with unit
        const survivalMatch = statsText.match(/Survived[^0-9]*(\d+\s*[smh])/i);
        if (survivalMatch) {
            stats.duration = survivalMatch[1].trim();
        }
        stats.position = rankContent.replace("##", "#");
        return stats;
    }
}


;// ./src/UpdateChecker.ts
var UpdateChecker_awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const packageInfo = __webpack_require__(330);
const config = __webpack_require__(272);
class UpdateChecker {
    constructor(kxsClient) {
        this.remoteScriptUrl = config.base_url + "/download/latest-dev.js";
        this.kxsClient = kxsClient;
        if (this.kxsClient.isAutoUpdateEnabled) {
            this.checkForUpdate();
        }
    }
    downloadScript() {
        return UpdateChecker_awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                GM.xmlHttpRequest({
                    method: "GET",
                    url: this.remoteScriptUrl,
                    headers: {
                        "Cache-Control": "no-cache, no-store, must-revalidate",
                        "Pragma": "no-cache",
                        "Expires": "0"
                    },
                    nocache: true,
                    responseType: "blob",
                    onload: (response) => {
                        if (response.status === 200) {
                            const blob = new Blob([response.response], { type: 'application/javascript' });
                            const downloadUrl = window.URL.createObjectURL(blob);
                            const downloadLink = document.createElement('a');
                            downloadLink.href = downloadUrl;
                            downloadLink.download = 'KxsClient.user.js';
                            document.body.appendChild(downloadLink);
                            downloadLink.click();
                            document.body.removeChild(downloadLink);
                            window.URL.revokeObjectURL(downloadUrl);
                            resolve();
                        }
                        else {
                            reject(new Error("Error downloading script: " + response.statusText));
                        }
                    },
                    onerror: (error) => {
                        reject(new Error("Error during script download: " + error));
                    }
                });
            });
        });
    }
    getNewScriptVersion() {
        return UpdateChecker_awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                GM.xmlHttpRequest({
                    method: "GET",
                    url: this.remoteScriptUrl,
                    headers: {
                        "Cache-Control": "no-cache, no-store, must-revalidate",
                        "Pragma": "no-cache",
                        "Expires": "0"
                    },
                    nocache: true,
                    onload: (response) => {
                        if (response.status === 200) {
                            const scriptContent = response.responseText;
                            const versionMatch = scriptContent.match(/\/\/\s*@version\s+([\d.]+)/);
                            if (versionMatch && versionMatch[1]) {
                                resolve(versionMatch[1]);
                            }
                            else {
                                reject(new Error("Script version was not found in the file."));
                            }
                        }
                        else {
                            reject(new Error("Error retrieving remote script: " + response.statusText));
                        }
                    },
                    onerror: (error) => {
                        reject(new Error("Error during remote script request: " + error));
                    }
                });
            });
        });
    }
    checkForUpdate() {
        return UpdateChecker_awaiter(this, void 0, void 0, function* () {
            const localScriptVersion = yield this.getCurrentScriptVersion();
            const hostedScriptVersion = yield this.getNewScriptVersion();
            this.hostedScriptVersion = hostedScriptVersion;
            if (localScriptVersion !== hostedScriptVersion) {
                this.displayUpdateNotification();
            }
            else {
                this.kxsClient.nm.showNotification("Client is up to date", "success", 2300);
            }
        });
    }
    displayUpdateNotification() {
        const modal = document.createElement("div");
        modal.style.position = "fixed";
        modal.style.top = "50%";
        modal.style.left = "50%";
        modal.style.transform = "translate(-50%, -50%)";
        modal.style.backgroundColor = "rgb(250, 250, 250)";
        modal.style.borderRadius = "10px";
        modal.style.padding = "20px";
        modal.style.width = "400px";
        modal.style.boxShadow = "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)";
        modal.style.border = "1px solid rgb(229, 229, 229)";
        const header = document.createElement("div");
        header.style.display = "flex";
        header.style.alignItems = "center";
        header.style.marginBottom = "15px";
        const title = document.createElement("h3");
        title.textContent = "Download Update";
        title.style.margin = "0";
        title.style.fontSize = "16px";
        title.style.fontWeight = "600";
        header.appendChild(title);
        const closeButton = document.createElement("button");
        closeButton.innerHTML = "×";
        closeButton.style.marginLeft = "auto";
        closeButton.style.border = "none";
        closeButton.style.background = "none";
        closeButton.style.fontSize = "20px";
        closeButton.style.cursor = "pointer";
        closeButton.style.padding = "0 5px";
        closeButton.onclick = () => modal.remove();
        header.appendChild(closeButton);
        const content = document.createElement("div");
        content.innerHTML = `A new version of KxsClient is available!<br>
    Locale: ${this.getCurrentScriptVersion()} | On web: ${this.hostedScriptVersion}<br>
    Click the button below to update now.`;
        content.style.marginBottom = "20px";
        content.style.color = "rgb(75, 85, 99)";
        const updateButton = document.createElement("button");
        updateButton.textContent = "Update Now";
        updateButton.style.backgroundColor = "rgb(59, 130, 246)";
        updateButton.style.color = "white";
        updateButton.style.padding = "8px 16px";
        updateButton.style.borderRadius = "6px";
        updateButton.style.border = "none";
        updateButton.style.cursor = "pointer";
        updateButton.style.width = "100%";
        updateButton.onclick = () => UpdateChecker_awaiter(this, void 0, void 0, function* () {
            try {
                yield this.downloadScript();
                this.kxsClient.nm.showNotification("Download started", "success", 2300);
                modal.remove();
            }
            catch (error) {
                this.kxsClient.nm.showNotification("Download failed: " + error.message, "info", 5000);
            }
        });
        modal.appendChild(header);
        modal.appendChild(content);
        modal.appendChild(updateButton);
        document.body.appendChild(modal);
    }
    getCurrentScriptVersion() {
        return packageInfo.version;
    }
}


;// ./src/DiscordRichPresence.ts
const DiscordRichPresence_packageInfo = __webpack_require__(330);
class DiscordWebSocket {
    constructor(kxsClient, token) {
        this.ws = null;
        this.heartbeatInterval = 0;
        this.sequence = null;
        this.isAuthenticated = false;
        this.kxsClient = kxsClient;
    }
    connect() {
        if (this.kxsClient.discordToken === ""
            || this.kxsClient.discordToken === null
            || this.kxsClient.discordToken === undefined) {
            return;
        }
        this.ws = new WebSocket('wss://gateway.discord.gg/?v=9&encoding=json');
        this.ws.onopen = () => {
            console.log('WebSocket connection established');
        };
        this.ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            this.handleMessage(data);
        };
        this.ws.onerror = (error) => {
            this.kxsClient.nm.showNotification('WebSocket error: ' + error.type, 'error', 5000);
        };
        this.ws.onclose = () => {
            this.kxsClient.nm.showNotification('Disconnected from Discord gateway', 'info', 5000);
            clearInterval(this.heartbeatInterval);
            this.isAuthenticated = false;
        };
    }
    identify() {
        const payload = {
            op: 2,
            d: {
                token: this.kxsClient.discordToken,
                properties: {
                    $os: 'linux',
                    $browser: 'chrome',
                    $device: 'chrome'
                },
                presence: {
                    activities: [{
                            name: "KxsClient",
                            type: 0,
                            application_id: "1321193265533550602",
                            assets: {
                                large_image: "mp:app-assets/1321193265533550602/1322173537326338058.png?size=512",
                                large_text: "KxsClient v" + DiscordRichPresence_packageInfo.version,
                            }
                        }],
                    status: 'online',
                    afk: false
                }
            }
        };
        this.send(payload);
    }
    handleMessage(data) {
        switch (data.op) {
            case 10: // Hello
                const { heartbeat_interval } = data.d;
                this.startHeartbeat(heartbeat_interval);
                this.identify();
                this.kxsClient.nm.showNotification('Started Discord RPC', 'success', 3000);
                break;
            case 11: // Heartbeat ACK
                console.log('Heartbeat acknowledged');
                break;
            case 0: // Dispatch
                this.sequence = data.s;
                if (data.t === 'READY') {
                    this.isAuthenticated = true;
                    this.kxsClient.nm.showNotification('Connected to Discord gateway', 'success', 2500);
                }
                break;
        }
    }
    startHeartbeat(interval) {
        this.heartbeatInterval = setInterval(() => {
            this.send({
                op: 1,
                d: this.sequence
            });
        }, interval);
    }
    send(data) {
        var _a;
        if (((_a = this.ws) === null || _a === void 0 ? void 0 : _a.readyState) === WebSocket.OPEN) {
            this.ws.send(JSON.stringify(data));
        }
    }
    disconnect() {
        if (this.ws) {
            clearInterval(this.heartbeatInterval);
            this.ws.close();
        }
    }
}


;// ./src/NotificationManager.ts
class NotificationManager {
    constructor() {
        this.notifications = [];
        this.NOTIFICATION_HEIGHT = 65; // Height + margin
        this.NOTIFICATION_MARGIN = 10;
        this.addGlobalStyles();
    }
    static getInstance() {
        if (!NotificationManager.instance) {
            NotificationManager.instance = new NotificationManager();
        }
        return NotificationManager.instance;
    }
    addGlobalStyles() {
        const styleSheet = document.createElement("style");
        styleSheet.textContent = `
        @keyframes slideIn {
          0% { transform: translateX(-120%); opacity: 0; }
          50% { transform: translateX(10px); opacity: 0.8; }
          100% { transform: translateX(0); opacity: 1; }
        }
  
        @keyframes slideOut {
          0% { transform: translateX(0); opacity: 1; }
          50% { transform: translateX(10px); opacity: 0.8; }
          100% { transform: translateX(-120%); opacity: 0; }
        }
  
        @keyframes slideLeft {
          from { transform-origin: right; transform: scaleX(1); }
          to { transform-origin: right; transform: scaleX(0); }
        }
  
        @keyframes bounce {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
      `;
        document.head.appendChild(styleSheet);
    }
    updateNotificationPositions() {
        this.notifications.forEach((notification, index) => {
            const topPosition = 20 + (index * this.NOTIFICATION_HEIGHT);
            notification.style.top = `${topPosition}px`;
        });
    }
    removeNotification(notification) {
        const index = this.notifications.indexOf(notification);
        if (index > -1) {
            this.notifications.splice(index, 1);
            this.updateNotificationPositions();
        }
    }
    getIconConfig(type) {
        const configs = {
            success: {
                color: '#4CAF50',
                svg: `<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>`
            },
            error: {
                color: '#F44336',
                svg: `<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                  <path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"/>
                </svg>`
            },
            info: {
                color: '#FFD700',
                svg: `<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
                </svg>`
            }
        };
        return configs[type];
    }
    showNotification(message, type, duration = 5000) {
        const notification = document.createElement("div");
        // Base styles
        Object.assign(notification.style, {
            position: "fixed",
            top: "20px",
            left: "20px",
            padding: "12px 20px",
            backgroundColor: "#333333",
            color: "white",
            zIndex: "9999",
            minWidth: "200px",
            borderRadius: "4px",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            transform: "translateX(-120%)",
            opacity: "0",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"
        });
        // Create icon
        const icon = document.createElement("div");
        Object.assign(icon.style, {
            width: "20px",
            height: "20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            animation: "bounce 0.5s ease-in-out"
        });
        const iconConfig = this.getIconConfig(type);
        icon.style.color = iconConfig.color;
        icon.innerHTML = iconConfig.svg;
        // Create message
        const messageDiv = document.createElement("div");
        messageDiv.textContent = message;
        messageDiv.style.flex = "1";
        // Create progress bar
        const progressBar = document.createElement("div");
        Object.assign(progressBar.style, {
            height: "4px",
            backgroundColor: "#e6f3ff",
            width: "100%",
            position: "absolute",
            bottom: "0",
            left: "0",
            animation: `slideLeft ${duration}ms linear forwards`
        });
        // Assemble notification
        notification.appendChild(icon);
        notification.appendChild(messageDiv);
        notification.appendChild(progressBar);
        document.body.appendChild(notification);
        // Add to stack and update positions
        this.notifications.push(notification);
        this.updateNotificationPositions();
        // Entrance animation
        requestAnimationFrame(() => {
            notification.style.transition = "all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)";
            notification.style.animation = "slideIn 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards";
        });
        // Exit animation and cleanup
        setTimeout(() => {
            notification.style.animation = "slideOut 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards";
            setTimeout(() => {
                this.removeNotification(notification);
                notification.remove();
            }, 500);
        }, duration);
    }
}


;// ./src/ClientSecondaryMenu.ts

class KxsLegacyClientSecondaryMenu {
    constructor(kxsClient) {
        this.kxsClient = kxsClient;
        this.isClientMenuVisible = false;
        this.isDragging = false;
        this.dragOffset = { x: 0, y: 0 };
        this.sections = [];
        this.menu = document.createElement("div");
        this.boundShiftListener = this.handleShiftPress.bind(this);
        this.boundMouseDownListener = this.handleMouseDown.bind(this);
        this.boundMouseMoveListener = this.handleMouseMove.bind(this);
        this.boundMouseUpListener = this.handleMouseUp.bind(this);
        this.initMenu();
        this.addShiftListener();
        this.addDragListeners();
    }
    handleShiftPress(event) {
        if (event.key === "Shift" && event.location == 2) {
            this.clearMenu();
            this.toggleMenuVisibility();
            this.loadOption();
        }
    }
    handleMouseDown(e) {
        if (e.target instanceof HTMLElement && !e.target.matches("input, select, button")) {
            this.isDragging = true;
            const rect = this.menu.getBoundingClientRect();
            this.dragOffset = {
                x: e.clientX - rect.left,
                y: e.clientY - rect.top,
            };
            this.menu.style.cursor = "grabbing";
        }
    }
    handleMouseMove(e) {
        if (!this.isDragging)
            return;
        e.preventDefault();
        const newX = e.clientX - this.dragOffset.x;
        const newY = e.clientY - this.dragOffset.y;
        const maxX = window.innerWidth - this.menu.offsetWidth;
        const maxY = window.innerHeight - this.menu.offsetHeight;
        this.menu.style.left = `${Math.max(0, Math.min(newX, maxX))}px`;
        this.menu.style.top = `${Math.max(0, Math.min(newY, maxY))}px`;
    }
    handleMouseUp() {
        this.isDragging = false;
        this.menu.style.cursor = "move";
    }
    initMenu() {
        this.menu.id = "kxsMenuIG";
        this.applyMenuStyles();
        this.createHeader();
        document.body.appendChild(this.menu);
    }
    loadOption() {
        let HUD = this.addSection("HUD");
        this.addOption(HUD, {
            label: "Use Legacy Menu",
            value: this.kxsClient.isLegaySecondaryMenu,
            type: "toggle",
            onChange: (value) => {
                this.kxsClient.isLegaySecondaryMenu = !this.kxsClient.isLegaySecondaryMenu;
                this.kxsClient.updateLocalStorage();
                this.kxsClient.secondaryMenu = new KxsClientSecondaryMenu(this.kxsClient);
                this.destroy();
            },
        });
        this.addOption(HUD, {
            label: "Show Ping",
            value: this.kxsClient.isPingVisible,
            type: "toggle",
            onChange: (value) => {
                this.kxsClient.isPingVisible = !this.kxsClient.isPingVisible;
                this.kxsClient.updatePingVisibility();
                this.kxsClient.updateLocalStorage();
            },
        });
        this.addOption(HUD, {
            label: "Show FPS",
            value: this.kxsClient.isFpsVisible,
            type: "toggle",
            onChange: (value) => {
                this.kxsClient.isFpsVisible = !this.kxsClient.isFpsVisible;
                this.kxsClient.updateFpsVisibility();
                this.kxsClient.updateLocalStorage();
            },
        });
        this.addOption(HUD, {
            label: "Show Kills",
            value: this.kxsClient.isKillsVisible,
            type: "toggle",
            onChange: (value) => {
                this.kxsClient.isKillsVisible = !this.kxsClient.isKillsVisible;
                this.kxsClient.updateKillsVisibility();
                this.kxsClient.updateLocalStorage();
            },
        });
        this.addOption(HUD, {
            label: "Kill Feed Blint Text",
            value: this.kxsClient.isKillFeedBlint,
            type: "toggle",
            onChange: (value) => {
                this.kxsClient.isKillFeedBlint = !this.kxsClient.isKillFeedBlint;
                this.kxsClient.updateLocalStorage();
            },
        });
        let musicSection = this.addSection("Music");
        this.addOption(musicSection, {
            label: "Death sound",
            value: this.kxsClient.isDeathSoundEnabled,
            type: "toggle",
            onChange: (value) => {
                this.kxsClient.isDeathSoundEnabled = !this.kxsClient.isDeathSoundEnabled;
                this.kxsClient.updateLocalStorage();
            },
        });
        this.addOption(musicSection, {
            label: "Win sound",
            value: this.kxsClient.isWinSoundEnabled,
            type: "toggle",
            onChange: (value) => {
                this.kxsClient.isWinSoundEnabled = !this.kxsClient.isWinSoundEnabled;
                this.kxsClient.updateLocalStorage();
            },
        });
        let pluginsSection = this.addSection("Plugins");
        this.addOption(pluginsSection, {
            label: "Webhook URL",
            value: this.kxsClient.discordWebhookUrl || "",
            type: "input",
            onChange: (value) => {
                value = value.toString().trim();
                this.kxsClient.discordWebhookUrl = value;
                this.kxsClient.discordTracker.setWebhookUrl(value);
                this.kxsClient.updateLocalStorage();
            },
        });
        this.addOption(pluginsSection, {
            label: "Heal Warning",
            value: this.kxsClient.isHealthWarningEnabled,
            type: "toggle",
            onChange: (value) => {
                this.kxsClient.isHealthWarningEnabled = !this.kxsClient.isHealthWarningEnabled;
                this.kxsClient.updateLocalStorage();
            },
        });
        this.addOption(pluginsSection, {
            label: "Update Checker",
            value: this.kxsClient.isAutoUpdateEnabled,
            type: "toggle",
            onChange: (value) => {
                this.kxsClient.isAutoUpdateEnabled = !this.kxsClient.isAutoUpdateEnabled;
                this.kxsClient.updateLocalStorage();
            },
        });
        this.addOption(pluginsSection, {
            label: `Uncap FPS`,
            value: this.kxsClient.isFpsUncapped,
            type: "toggle",
            onChange: () => {
                this.kxsClient.isFpsUncapped = !this.kxsClient.isFpsUncapped;
                this.kxsClient.toggleFpsUncap();
                this.kxsClient.updateLocalStorage();
            },
        });
        this.addOption(pluginsSection, {
            label: `Winning Animation`,
            value: this.kxsClient.isWinningAnimationEnabled,
            type: "toggle",
            onChange: () => {
                this.kxsClient.isWinningAnimationEnabled = !this.kxsClient.isWinningAnimationEnabled;
                this.kxsClient.updateLocalStorage();
            },
        });
        this.addOption(pluginsSection, {
            label: `Rich Presence (Account token required)`,
            value: this.kxsClient.discordToken || "",
            type: "input",
            onChange: (value) => {
                value = value.toString().trim();
                this.kxsClient.discordToken = this.kxsClient.parseToken(value);
                this.kxsClient.discordRPC.disconnect();
                this.kxsClient.discordRPC.connect();
                this.kxsClient.updateLocalStorage();
            },
        });
        this.addOption(pluginsSection, {
            label: `Kill Leader Tracking`,
            value: this.kxsClient.isKillLeaderTrackerEnabled,
            type: "toggle",
            onChange: (value) => {
                this.kxsClient.isKillLeaderTrackerEnabled = !this.kxsClient.isKillLeaderTrackerEnabled;
                this.kxsClient.updateLocalStorage();
            },
        });
        this.addOption(pluginsSection, {
            label: `Friends Detector (separe with ',')`,
            value: this.kxsClient.all_friends,
            type: "input",
            onChange: (value) => {
                this.kxsClient.all_friends = value;
                this.kxsClient.updateLocalStorage();
            },
        });
    }
    clearMenu() {
        this.sections.forEach((section) => {
            if (section.element) {
                section.element.remove();
            }
        });
        this.sections = [];
    }
    applyMenuStyles() {
        Object.assign(this.menu.style, {
            backgroundColor: "rgba(30, 30, 30, 0.95)",
            padding: "15px",
            borderRadius: "10px",
            boxShadow: "0 4px 15px rgba(0, 0, 0, 0.7)",
            zIndex: "10001",
            width: "300px",
            fontFamily: "Arial, sans-serif",
            color: "#fff",
            maxHeight: "500px",
            overflowY: "auto",
            position: "fixed",
            top: "15%",
            left: "10%",
            cursor: "move",
            display: "none",
        });
    }
    createHeader() {
        const title = document.createElement("h2");
        title.textContent = "KxsClient alpha";
        Object.assign(title.style, {
            margin: "0 0 10px",
            textAlign: "center",
            fontSize: "18px",
            color: "#FFAE00",
        });
        const subtitle = document.createElement("p");
        subtitle.textContent = "reset with tab";
        Object.assign(subtitle.style, {
            margin: "0 0 10px",
            textAlign: "center",
            fontSize: "12px",
            color: "#ccc",
        });
        this.menu.appendChild(title);
        this.menu.appendChild(subtitle);
    }
    addSection(title) {
        const section = {
            title,
            options: [],
        };
        const sectionElement = document.createElement("div");
        sectionElement.className = "menu-section";
        const sectionTitle = document.createElement("h3");
        sectionTitle.textContent = title;
        Object.assign(sectionTitle.style, {
            margin: "15px 0 10px",
            fontSize: "16px",
            color: "#4CAF50",
        });
        sectionElement.appendChild(sectionTitle);
        this.menu.appendChild(sectionElement);
        // Stocker la référence à l'élément DOM
        section.element = sectionElement;
        this.sections.push(section);
        return section;
    }
    addOption(section, option) {
        section.options.push(option);
        const optionDiv = document.createElement("div");
        Object.assign(optionDiv.style, {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "8px",
            padding: "4px",
            borderRadius: "4px",
            backgroundColor: "rgba(255, 255, 255, 0.1)",
        });
        const label = document.createElement("span");
        label.textContent = option.label;
        label.style.color = "#fff";
        const valueElement = option.type === "toggle"
            ? this.createToggleElement(option)
            : this.createInputElement(option);
        optionDiv.appendChild(label);
        optionDiv.appendChild(valueElement);
        // Utiliser la référence stockée à l'élément de section
        if (section.element) {
            section.element.appendChild(optionDiv);
        }
    }
    createToggleElement(option) {
        const toggle = document.createElement("div");
        toggle.style.cursor = "pointer";
        toggle.style.color = option.value ? "#4CAF50" : "#ff4444";
        toggle.textContent = String(option.value);
        toggle.addEventListener("click", () => {
            var _a;
            const newValue = !option.value;
            option.value = newValue;
            toggle.textContent = String(newValue);
            toggle.style.color = newValue ? "#4CAF50" : "#ff4444";
            (_a = option.onChange) === null || _a === void 0 ? void 0 : _a.call(option, newValue);
        });
        return toggle;
    }
    createInputElement(option) {
        const input = document.createElement("input");
        input.type = "text";
        input.value = String(option.value);
        Object.assign(input.style, {
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            border: "none",
            borderRadius: "3px",
            color: "#FFAE00",
            padding: "2px 5px",
            width: "60px",
            textAlign: "right",
        });
        input.addEventListener("change", () => {
            var _a;
            option.value = input.value;
            (_a = option.onChange) === null || _a === void 0 ? void 0 : _a.call(option, input.value);
        });
        return input;
    }
    addShiftListener() {
        window.addEventListener("keydown", this.boundShiftListener);
    }
    addDragListeners() {
        this.menu.addEventListener("mousedown", this.boundMouseDownListener);
        window.addEventListener("mousemove", this.boundMouseMoveListener);
        window.addEventListener("mouseup", this.boundMouseUpListener);
    }
    toggleMenuVisibility() {
        this.isClientMenuVisible = !this.isClientMenuVisible;
        this.kxsClient.nm.showNotification(this.isClientMenuVisible ? "Opening menu..." : "Closing menu...", "info", 1400);
        this.menu.style.display = this.isClientMenuVisible ? "block" : "none";
    }
    destroy() {
        // Remove event listeners
        window.removeEventListener("keydown", this.boundShiftListener);
        this.menu.removeEventListener("mousedown", this.boundMouseDownListener);
        window.removeEventListener("mousemove", this.boundMouseMoveListener);
        window.removeEventListener("mouseup", this.boundMouseUpListener);
        // Remove all section elements and clear sections array
        this.sections.forEach(section => {
            if (section.element) {
                // Remove all option elements within the section
                const optionElements = section.element.querySelectorAll("div");
                optionElements.forEach(element => {
                    // Remove event listeners from toggle and input elements
                    const interactive = element.querySelector("div, input");
                    if (interactive) {
                        interactive.replaceWith(interactive.cloneNode(true));
                    }
                    element.remove();
                });
                section.element.remove();
            }
        });
        this.sections = [];
        // Remove the menu from DOM
        this.menu.remove();
        // Reset instance variables
        this.isClientMenuVisible = false;
        this.isDragging = false;
        this.dragOffset = { x: 0, y: 0 };
        this.menu = null;
        // Clear references
        this.kxsClient = null;
        this.boundShiftListener = null;
        this.boundMouseDownListener = null;
        this.boundMouseMoveListener = null;
        this.boundMouseUpListener = null;
    }
}


;// ./src/ClientSecondaryMenuRework.ts

class KxsClientSecondaryMenu {
    constructor(kxsClient) {
        this.shiftListener = (event) => {
            if (event.key === "Shift" && event.location == 2) {
                this.clearMenu();
                this.toggleMenuVisibility();
                this.loadOption();
            }
        };
        this.mouseMoveListener = (e) => {
            if (this.isDragging) {
                const x = e.clientX - this.dragOffset.x;
                const y = e.clientY - this.dragOffset.y;
                this.menu.style.transform = 'none';
                this.menu.style.left = `${x}px`;
                this.menu.style.top = `${y}px`;
            }
        };
        this.mouseUpListener = () => {
            this.isDragging = false;
            this.menu.style.cursor = "grab";
        };
        this.kxsClient = kxsClient;
        this.isClientMenuVisible = false;
        this.isDragging = false;
        this.dragOffset = { x: 0, y: 0 };
        this.sections = [];
        this.activeCategory = "ALL";
        this.menu = document.createElement("div");
        this.initMenu();
        this.addShiftListener();
        this.addDragListeners();
    }
    initMenu() {
        this.menu.id = "kxsMenuIG";
        this.applyMenuStyles();
        this.createHeader();
        this.createGridContainer();
        document.body.appendChild(this.menu);
    }
    applyMenuStyles() {
        Object.assign(this.menu.style, {
            backgroundColor: "rgba(17, 24, 39, 0.95)",
            padding: "20px",
            borderRadius: "12px",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.8)",
            zIndex: "10001",
            width: "800px",
            fontFamily: "'Segoe UI', Arial, sans-serif",
            color: "#fff",
            maxHeight: "80vh",
            overflowY: "auto",
            position: "fixed",
            top: "10%",
            left: "50%",
            transform: "translateX(-50%)",
            display: "none",
        });
    }
    createHeader() {
        const header = document.createElement("div");
        header.style.marginBottom = "20px";
        header.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
            <div style="display: flex; align-items: center; gap: 10px;">
                <img src="https://kxs.rip/assets/KysClientLogo.png" 
                    alt="Logo" style="width: 24px; height: 24px;">
                <span style="font-size: 20px; font-weight: bold;">KXS CLIENT</span>
            </div>
            <div style="display: flex; gap: 10px;">
              <button style="
                padding: 6px;
                background: none;
                border: none;
                color: white;
                cursor: pointer;
                font-size: 18px;
              ">×</button>
            </div>
          </div>
          <div style="display: flex; gap: 10px; margin-bottom: 15px;">
            ${["ALL", "HUD", "SERVER", "MECHANIC"].map(cat => `
              <button class="category-btn" data-category="${cat}" style="
                padding: 6px 16px;
                background: ${this.activeCategory === cat ? '#3B82F6' : 'rgba(55, 65, 81, 0.8)'};
                border: none;
                border-radius: 6px;
                color: white;
                cursor: pointer;
                font-size: 14px;
                transition: background 0.2s;
              ">${cat}</button>
            `).join('')}
          </div>
        `;
        header.querySelectorAll('.category-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const category = e.target.dataset.category;
                if (category) {
                    this.setActiveCategory(category);
                }
            });
        });
        const closeButton = header.querySelector('button');
        closeButton === null || closeButton === void 0 ? void 0 : closeButton.addEventListener('click', () => {
            this.toggleMenuVisibility();
        });
        this.menu.appendChild(header);
    }
    clearMenu() {
        const gridContainer = document.getElementById('kxsMenuGrid');
        if (gridContainer) {
            gridContainer.innerHTML = '';
        }
    }
    loadOption() {
        let HUD = this.addSection("HUD", 'HUD');
        let MECHANIC = this.addSection("MECHANIC", 'MECHANIC');
        let SERVER = this.addSection("SERVER", 'SERVER');
        this.addOption(HUD, {
            label: "Show Ping",
            value: this.kxsClient.isPingVisible,
            category: "HUD",
            icon: '<svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><defs><style>.a{fill:none;stroke:#000000;stroke-linecap:round;stroke-linejoin:round;}</style></defs><path class="a" d="M34.6282,24.0793a14.7043,14.7043,0,0,0-22.673,1.7255"></path><path class="a" d="M43.5,20.5846a23.8078,23.8078,0,0,0-39,0"></path><path class="a" d="M43.5,20.5845,22.0169,29.0483a5.5583,5.5583,0,1,0,6.2116,8.7785l.0153.0206Z"></path></g></svg>',
            type: "toggle",
            onChange: (value) => {
                this.kxsClient.isPingVisible = !this.kxsClient.isPingVisible;
                this.kxsClient.updatePingVisibility();
                this.kxsClient.updateLocalStorage();
            },
        });
        this.addOption(HUD, {
            label: "Show FPS",
            value: this.kxsClient.isFpsVisible,
            category: "HUD",
            type: "toggle",
            icon: '<svg fill="#000000" viewBox="0 0 24 24" id="60fps" data-name="Flat Line" xmlns="http://www.w3.org/2000/svg" class="icon flat-line"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><rect id="primary" x="10.5" y="8.5" width="14" height="7" rx="1" transform="translate(5.5 29.5) rotate(-90)" style="fill: none; stroke: #000000; stroke-linecap: round; stroke-linejoin: round; stroke-width: 2;"></rect><path id="primary-2" data-name="primary" d="M3,12H9a1,1,0,0,1,1,1v5a1,1,0,0,1-1,1H4a1,1,0,0,1-1-1V6A1,1,0,0,1,4,5h6" style="fill: none; stroke: #000000; stroke-linecap: round; stroke-linejoin: round; stroke-width: 2;"></path></g></svg>',
            onChange: (value) => {
                this.kxsClient.isFpsVisible = !this.kxsClient.isFpsVisible;
                this.kxsClient.updateFpsVisibility();
                this.kxsClient.updateLocalStorage();
            },
        });
        this.addOption(HUD, {
            label: "Show Kills",
            value: this.kxsClient.isKillsVisible,
            type: "toggle",
            category: "HUD",
            icon: '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M14.7245 11.2754L16 12.4999L10.0129 17.8218C8.05054 19.5661 5.60528 20.6743 3 20.9999L3.79443 19.5435C4.6198 18.0303 5.03249 17.2737 5.50651 16.5582C5.92771 15.9224 6.38492 15.3113 6.87592 14.7278C7.42848 14.071 8.0378 13.4615 9.25644 12.2426L12 9.49822M11.5 8.99787L17.4497 3.04989C18.0698 2.42996 19.0281 2.3017 19.7894 2.73674C20.9027 3.37291 21.1064 4.89355 20.1997 5.80024L19.8415 6.15847C19.6228 6.3771 19.3263 6.49992 19.0171 6.49992H18L16 8.49992V8.67444C16 9.16362 16 9.40821 15.9447 9.63839C15.8957 9.84246 15.8149 10.0375 15.7053 10.2165C15.5816 10.4183 15.4086 10.5913 15.0627 10.9372L14.2501 11.7498L11.5 8.99787Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>',
            onChange: (value) => {
                this.kxsClient.isKillsVisible = !this.kxsClient.isKillsVisible;
                this.kxsClient.updateKillsVisibility();
                this.kxsClient.updateLocalStorage();
            },
        });
        this.addOption(HUD, {
            label: "Use Legacy Menu",
            value: this.kxsClient.isLegaySecondaryMenu,
            type: "toggle",
            category: 'HUD',
            icon: '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M4 12H20M4 8H20M4 16H12" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>',
            onChange: (value) => {
                this.kxsClient.isLegaySecondaryMenu = !this.kxsClient.isLegaySecondaryMenu;
                this.kxsClient.updateLocalStorage();
                this.kxsClient.secondaryMenu = new KxsLegacyClientSecondaryMenu(this.kxsClient);
                this.destroy();
            },
        });
        this.addOption(MECHANIC, {
            label: "Death sound",
            value: this.kxsClient.isDeathSoundEnabled,
            type: "toggle",
            icon: '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M19 21C19 21.5523 18.5523 22 18 22H14H10H6C5.44771 22 5 21.5523 5 21V18.75C5 17.7835 4.2165 17 3.25 17C2.55964 17 2 16.4404 2 15.75V11C2 5.47715 6.47715 1 12 1C17.5228 1 22 5.47715 22 11V15.75C22 16.4404 21.4404 17 20.75 17C19.7835 17 19 17.7835 19 18.75V21ZM17 20V18.75C17 16.9358 18.2883 15.4225 20 15.075V11C20 6.58172 16.4183 3 12 3C7.58172 3 4 6.58172 4 11V15.075C5.71168 15.4225 7 16.9358 7 18.75V20H9V18C9 17.4477 9.44771 17 10 17C10.5523 17 11 17.4477 11 18V20H13V18C13 17.4477 13.4477 17 14 17C14.5523 17 15 17.4477 15 18V20H17ZM11 12.5C11 13.8807 8.63228 15 7.25248 15C5.98469 15 5.99206 14.055 6.00161 12.8306V12.8305C6.00245 12.7224 6.00331 12.6121 6.00331 12.5C6.00331 11.1193 7.12186 10 8.50166 10C9.88145 10 11 11.1193 11 12.5ZM17.9984 12.8306C17.9975 12.7224 17.9967 12.6121 17.9967 12.5C17.9967 11.1193 16.8781 10 15.4983 10C14.1185 10 13 11.1193 13 12.5C13 13.8807 15.3677 15 16.7475 15C18.0153 15 18.0079 14.055 17.9984 12.8306Z" fill="#000000"></path> </g></svg>',
            category: "MECHANIC",
            onChange: (value) => {
                this.kxsClient.isDeathSoundEnabled = !this.kxsClient.isDeathSoundEnabled;
                this.kxsClient.updateLocalStorage();
            },
        });
        this.addOption(HUD, {
            label: "Win sound",
            value: this.kxsClient.isWinSoundEnabled,
            type: "toggle",
            icon: '<svg fill="#000000" version="1.1" id="Trophy_x5F_cup" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 256 256" enable-background="new 0 0 256 256" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M190.878,111.272c31.017-11.186,53.254-40.907,53.254-75.733l-0.19-8.509h-48.955V5H64.222v22.03H15.266l-0.19,8.509 c0,34.825,22.237,64.546,53.254,75.733c7.306,18.421,22.798,31.822,41.878,37.728v20c-0.859,15.668-14.112,29-30,29v18h-16v35H195 v-35h-16v-18c-15.888,0-29.141-13.332-30-29v-20C168.08,143.094,183.572,129.692,190.878,111.272z M195,44h30.563 c-0.06,0.427-0.103,1.017-0.171,1.441c-3.02,18.856-14.543,34.681-30.406,44.007C195.026,88.509,195,44,195,44z M33.816,45.441 c-0.068-0.424-0.111-1.014-0.171-1.441h30.563c0,0-0.026,44.509,0.013,45.448C48.359,80.122,36.837,64.297,33.816,45.441z M129.604,86.777l-20.255,13.52l6.599-23.442L96.831,61.77l24.334-0.967l8.44-22.844l8.44,22.844l24.334,0.967L143.26,76.856 l6.599,23.442L129.604,86.777z"></path> </g></svg>',
            category: "HUD",
            onChange: (value) => {
                this.kxsClient.isWinSoundEnabled = !this.kxsClient.isWinSoundEnabled;
                this.kxsClient.updateLocalStorage();
            },
        });
        this.addOption(SERVER, {
            label: "Webhook URL",
            value: this.kxsClient.discordWebhookUrl || "",
            icon: '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M12.52 3.046a3 3 0 0 0-2.13 5.486 1 1 0 0 1 .306 1.38l-3.922 6.163a2 2 0 1 1-1.688-1.073l3.44-5.405a5 5 0 1 1 8.398-2.728 1 1 0 1 1-1.97-.348 3 3 0 0 0-2.433-3.475zM10 6a2 2 0 1 1 3.774.925l3.44 5.405a5 5 0 1 1-1.427 8.5 1 1 0 0 1 1.285-1.532 3 3 0 1 0 .317-4.83 1 1 0 0 1-1.38-.307l-3.923-6.163A2 2 0 0 1 10 6zm-5.428 6.9a1 1 0 0 1-.598 1.281A3 3 0 1 0 8.001 17a1 1 0 0 1 1-1h8.266a2 2 0 1 1 0 2H9.9a5 5 0 1 1-6.61-5.698 1 1 0 0 1 1.282.597Z" fill="#000000"></path> </g></svg>',
            category: "SERVER",
            type: "input",
            onChange: (value) => {
                value = value.toString().trim();
                this.kxsClient.discordWebhookUrl = value;
                this.kxsClient.discordTracker.setWebhookUrl(value);
                this.kxsClient.updateLocalStorage();
            },
        });
        this.addOption(MECHANIC, {
            label: "Heal Warning",
            value: this.kxsClient.isHealthWarningEnabled,
            type: "toggle",
            category: "MECHANIC",
            icon: '<svg viewBox="0 0 512 512" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>health</title> <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <g id="add" fill="#000000" transform="translate(42.666667, 64.000000)"> <path d="M365.491733,234.665926 C339.947827,276.368766 302.121072,321.347032 252.011468,369.600724 L237.061717,383.7547 C234.512147,386.129148 231.933605,388.511322 229.32609,390.901222 L213.333333,405.333333 C205.163121,398.070922 197.253659,390.878044 189.604949,383.7547 L174.655198,369.600724 C124.545595,321.347032 86.7188401,276.368766 61.174934,234.665926 L112.222458,234.666026 C134.857516,266.728129 165.548935,301.609704 204.481843,339.08546 L213.333333,347.498667 L214.816772,346.115558 C257.264819,305.964102 290.400085,268.724113 314.444476,234.665648 L365.491733,234.665926 Z M149.333333,58.9638831 L213.333333,186.944 L245.333333,122.963883 L269.184,170.666667 L426.666667,170.666667 L426.666667,213.333333 L247.850667,213.333333 L213.333333,282.36945 L149.333333,154.368 L119.851392,213.333333 L3.55271368e-14,213.333333 L3.55271368e-14,170.666667 L93.4613333,170.666667 L149.333333,58.9638831 Z M290.133333,0 C353.756537,0 405.333333,51.5775732 405.333333,115.2 C405.333333,126.248908 404.101625,137.626272 401.63821,149.33209 L357.793994,149.332408 C360.62486,138.880112 362.217829,128.905378 362.584434,119.422244 L362.666667,115.2 C362.666667,75.1414099 330.192075,42.6666667 290.133333,42.6666667 C273.651922,42.6666667 258.124715,48.1376509 245.521279,58.0219169 L241.829932,61.1185374 L213.366947,86.6338354 L184.888885,61.1353673 C171.661383,49.2918281 154.669113,42.6666667 136.533333,42.6666667 C96.4742795,42.6666667 64,75.1409461 64,115.2 C64,125.932203 65.6184007,137.316846 68.8727259,149.332605 L25.028457,149.33209 C22.5650412,137.626272 21.3333333,126.248908 21.3333333,115.2 C21.3333333,51.5767968 72.9101302,0 136.533333,0 C166.046194,0 192.966972,11.098031 213.350016,29.348444 C233.716605,11.091061 260.629741,0 290.133333,0 Z" id="Combined-Shape"> </path> </g> </g> </g></svg>',
            onChange: (value) => {
                this.kxsClient.isHealthWarningEnabled = !this.kxsClient.isHealthWarningEnabled;
                this.kxsClient.updateLocalStorage();
            },
        });
        this.addOption(SERVER, {
            label: "Update Checker",
            value: this.kxsClient.isAutoUpdateEnabled,
            type: "toggle",
            icon: '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M18.4721 16.7023C17.3398 18.2608 15.6831 19.3584 13.8064 19.7934C11.9297 20.2284 9.95909 19.9716 8.25656 19.0701C6.55404 18.1687 5.23397 16.6832 4.53889 14.8865C3.84381 13.0898 3.82039 11.1027 4.47295 9.29011C5.12551 7.47756 6.41021 5.96135 8.09103 5.02005C9.77184 4.07875 11.7359 3.77558 13.6223 4.16623C15.5087 4.55689 17.1908 5.61514 18.3596 7.14656C19.5283 8.67797 20.1052 10.5797 19.9842 12.5023M19.9842 12.5023L21.4842 11.0023M19.9842 12.5023L18.4842 11.0023" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M12 8V12L15 15" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>',
            category: "SERVER",
            onChange: (value) => {
                this.kxsClient.isAutoUpdateEnabled = !this.kxsClient.isAutoUpdateEnabled;
                this.kxsClient.updateLocalStorage();
            },
        });
        this.addOption(MECHANIC, {
            label: `Uncap FPS`,
            value: this.kxsClient.isFpsUncapped,
            type: "toggle",
            icon: '<svg viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools --> <title>ic_fluent_fps_960_24_filled</title> <desc>Created with Sketch.</desc> <g id="🔍-Product-Icons" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <g id="ic_fluent_fps_960_24_filled" fill="#000000" fill-rule="nonzero"> <path d="M11.75,15 C12.9926407,15 14,16.0073593 14,17.25 C14,18.440864 13.0748384,19.4156449 11.9040488,19.4948092 L11.75,19.5 L11,19.5 L11,21.25 C11,21.6296958 10.7178461,21.943491 10.3517706,21.9931534 L10.25,22 C9.87030423,22 9.55650904,21.7178461 9.50684662,21.3517706 L9.5,21.25 L9.5,15.75 C9.5,15.3703042 9.78215388,15.056509 10.1482294,15.0068466 L10.25,15 L11.75,15 Z M18,15 C19.1045695,15 20,15.8954305 20,17 C20,17.4142136 19.6642136,17.75 19.25,17.75 C18.8703042,17.75 18.556509,17.4678461 18.5068466,17.1017706 L18.5,17 C18.5,16.7545401 18.3231248,16.5503916 18.0898756,16.5080557 L18,16.5 L17.375,16.5 C17.029822,16.5 16.75,16.779822 16.75,17.125 C16.75,17.4387982 16.9812579,17.6985831 17.2826421,17.7432234 L17.375,17.75 L17.875,17.75 C19.0486051,17.75 20,18.7013949 20,19.875 C20,20.9975788 19.1295366,21.91685 18.0267588,21.9946645 L17.875,22 L17.25,22 C16.1454305,22 15.25,21.1045695 15.25,20 C15.25,19.5857864 15.5857864,19.25 16,19.25 C16.3796958,19.25 16.693491,19.5321539 16.7431534,19.8982294 L16.75,20 C16.75,20.2454599 16.9268752,20.4496084 17.1601244,20.4919443 L17.25,20.5 L17.875,20.5 C18.220178,20.5 18.5,20.220178 18.5,19.875 C18.5,19.5612018 18.2687421,19.3014169 17.9673579,19.2567766 L17.875,19.25 L17.375,19.25 C16.2013949,19.25 15.25,18.2986051 15.25,17.125 C15.25,16.0024212 16.1204634,15.08315 17.2232412,15.0053355 L17.375,15 L18,15 Z M7.75,15 C8.16421356,15 8.5,15.3357864 8.5,15.75 C8.5,16.1296958 8.21784612,16.443491 7.85177056,16.4931534 L7.75,16.5 L5.5,16.4990964 L5.5,18.0020964 L7.25,18.002809 C7.66421356,18.002809 8,18.3385954 8,18.752809 C8,19.1325047 7.71784612,19.4462999 7.35177056,19.4959623 L7.25,19.502809 L5.5,19.5020964 L5.5,21.2312276 C5.5,21.6109234 5.21784612,21.9247186 4.85177056,21.974381 L4.75,21.9812276 C4.37030423,21.9812276 4.05650904,21.6990738 4.00684662,21.3329982 L4,21.2312276 L4,15.75 C4,15.3703042 4.28215388,15.056509 4.64822944,15.0068466 L4.75,15 L7.75,15 Z M11.75,16.5 L11,16.5 L11,18 L11.75,18 C12.1642136,18 12.5,17.6642136 12.5,17.25 C12.5,16.8703042 12.2178461,16.556509 11.8517706,16.5068466 L11.75,16.5 Z M5,3 C6.65685425,3 8,4.34314575 8,6 L7.99820112,6.1048763 L8,6.15469026 L8,10 C8,11.5976809 6.75108004,12.9036609 5.17627279,12.9949073 L5,13 L4.7513884,13 C3.23183855,13 2,11.7681615 2,10.2486116 C2,9.69632685 2.44771525,9.2486116 3,9.2486116 C3.51283584,9.2486116 3.93550716,9.63465179 3.99327227,10.1319905 L4,10.2486116 C4,10.6290103 4.28267621,10.9433864 4.64942945,10.9931407 L4.7513884,11 L5,11 C5.51283584,11 5.93550716,10.6139598 5.99327227,10.1166211 L6,10 L5.99991107,8.82932572 C5.68715728,8.93985718 5.35060219,9 5,9 C3.34314575,9 2,7.65685425 2,6 C2,4.34314575 3.34314575,3 5,3 Z M12.2512044,3 C13.7707542,3 15.0025928,4.23183855 15.0025928,5.7513884 C15.0025928,6.30367315 14.5548775,6.7513884 14.0025928,6.7513884 C13.489757,6.7513884 13.0670856,6.36534821 13.0093205,5.86800953 L13.0025928,5.7513884 C13.0025928,5.37098974 12.7199166,5.05661365 12.3531633,5.00685929 L12.2512044,5 L12.0025928,5 C11.489757,5 11.0670856,5.38604019 11.0093205,5.88337887 L11.0025928,6 L11.0026817,7.17067428 C11.3154355,7.06014282 11.6519906,7 12.0025928,7 C13.659447,7 15.0025928,8.34314575 15.0025928,10 C15.0025928,11.6568542 13.659447,13 12.0025928,13 C10.3457385,13 9.0025928,11.6568542 9.0025928,10 L9.00441213,9.89453033 L9.0025928,9.84530974 L9.0025928,6 C9.0025928,4.40231912 10.2515128,3.09633912 11.82632,3.00509269 L12.0025928,3 L12.2512044,3 Z M19,3 C20.5976809,3 21.9036609,4.24891996 21.9949073,5.82372721 L22,6 L22,10 C22,11.6568542 20.6568542,13 19,13 C17.4023191,13 16.0963391,11.75108 16.0050927,10.1762728 L16,10 L16,6 C16,4.34314575 17.3431458,3 19,3 Z M12.0025928,9 C11.450308,9 11.0025928,9.44771525 11.0025928,10 C11.0025928,10.5522847 11.450308,11 12.0025928,11 C12.5548775,11 13.0025928,10.5522847 13.0025928,10 C13.0025928,9.44771525 12.5548775,9 12.0025928,9 Z M19,5 C18.4871642,5 18.0644928,5.38604019 18.0067277,5.88337887 L18,6 L18,10 C18,10.5522847 18.4477153,11 19,11 C19.5128358,11 19.9355072,10.6139598 19.9932723,10.1166211 L20,10 L20,6 C20,5.44771525 19.5522847,5 19,5 Z M5,5 C4.44771525,5 4,5.44771525 4,6 C4,6.55228475 4.44771525,7 5,7 C5.55228475,7 6,6.55228475 6,6 C6,5.44771525 5.55228475,5 5,5 Z" id="🎨Color"> </path> </g> </g> </g></svg>',
            category: 'MECHANIC',
            onChange: () => {
                this.kxsClient.isFpsUncapped = !this.kxsClient.isFpsUncapped;
                this.kxsClient.toggleFpsUncap();
                this.kxsClient.updateLocalStorage();
            },
        });
        this.addOption(HUD, {
            label: `Winning Animation`,
            value: this.kxsClient.isWinningAnimationEnabled,
            icon: '<svg fill="#000000" height="200px" width="200px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 448.881 448.881" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path d="M189.82,138.531c-8.92,0-16.611,6.307-18.353,15.055l-11.019,55.306c-3.569,20.398-7.394,40.53-9.946,59.652h-0.513 c-2.543-19.122-5.35-37.474-9.176-57.615l-11.85-62.35c-1.112-5.832-6.206-10.048-12.139-10.048H95.819 c-5.854,0-10.909,4.114-12.099,9.853l-12.497,60.507c-4.332,21.159-8.414,41.805-11.213,60.413h-0.513 c-2.8-17.332-6.369-39.511-10.196-59.901l-10.024-54.643c-1.726-9.403-9.922-16.23-19.479-16.23c-6.05,0-11.774,2.77-15.529,7.52 c-3.755,4.751-5.133,10.965-3.733,16.851l32.747,137.944c1.322,5.568,6.299,9.503,12.022,9.503h22.878 c5.792,0,10.809-4.028,12.061-9.689l14.176-64.241c4.083-17.334,6.883-33.648,9.946-53.019h0.507 c2.037,19.627,4.845,35.685,8.157,53.019l12.574,63.96c1.136,5.794,6.222,9.97,12.125,9.97h22.325 c5.638,0,10.561-3.811,11.968-9.269l35.919-139.158c1.446-5.607,0.225-11.564-3.321-16.136 C201.072,141.207,195.612,138.531,189.82,138.531z"></path> <path d="M253.516,138.531c-10.763,0-19.495,8.734-19.495,19.503v132.821c0,10.763,8.732,19.495,19.495,19.495 c10.771,0,19.503-8.732,19.503-19.495V158.034C273.019,147.265,264.287,138.531,253.516,138.531z"></path> <path d="M431.034,138.531c-9.861,0-17.847,7.995-17.847,17.847v32.373c0,25.748,0.761,48.945,3.313,71.637h-0.763 c-7.652-19.379-17.847-40.786-28.041-58.891l-32.14-56.704c-2.193-3.865-6.299-6.26-10.747-6.26h-25.818 c-6.827,0-12.357,5.529-12.357,12.357v141.615c0,9.86,7.987,17.847,17.847,17.847c9.853,0,17.84-7.987,17.84-17.847v-33.905 c0-28.042-0.514-52.258-1.532-74.941l0.769-0.256c8.406,20.141,19.627,42.318,29.823,60.671l33.174,59.909 c2.177,3.927,6.321,6.369,10.809,6.369h21.159c6.828,0,12.357-5.53,12.357-12.357V156.378 C448.881,146.526,440.894,138.531,431.034,138.531z"></path> </g> </g></svg>',
            category: "HUD",
            type: "toggle",
            onChange: () => {
                this.kxsClient.isWinningAnimationEnabled = !this.kxsClient.isWinningAnimationEnabled;
                this.kxsClient.updateLocalStorage();
            },
        });
        this.addOption(HUD, {
            label: "Kill Feed Blint Text",
            value: this.kxsClient.isKillFeedBlint,
            icon: `<svg fill="#000000" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title></title> <g data-name="Layer 2" id="Layer_2"> <path d="M18,11a1,1,0,0,1-1,1,5,5,0,0,0-5,5,1,1,0,0,1-2,0,5,5,0,0,0-5-5,1,1,0,0,1,0-2,5,5,0,0,0,5-5,1,1,0,0,1,2,0,5,5,0,0,0,5,5A1,1,0,0,1,18,11Z"></path> <path d="M19,24a1,1,0,0,1-1,1,2,2,0,0,0-2,2,1,1,0,0,1-2,0,2,2,0,0,0-2-2,1,1,0,0,1,0-2,2,2,0,0,0,2-2,1,1,0,0,1,2,0,2,2,0,0,0,2,2A1,1,0,0,1,19,24Z"></path> <path d="M28,17a1,1,0,0,1-1,1,4,4,0,0,0-4,4,1,1,0,0,1-2,0,4,4,0,0,0-4-4,1,1,0,0,1,0-2,4,4,0,0,0,4-4,1,1,0,0,1,2,0,4,4,0,0,0,4,4A1,1,0,0,1,28,17Z"></path> </g> </g></svg>`,
            category: "HUD",
            type: "toggle",
            onChange: () => {
                this.kxsClient.isKillFeedBlint = !this.kxsClient.isKillFeedBlint;
                this.kxsClient.updateLocalStorage();
            },
        });
        this.addOption(SERVER, {
            label: `Rich Presence (Account token required)`,
            value: this.kxsClient.discordToken || "",
            icon: '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M18.59 5.88997C17.36 5.31997 16.05 4.89997 14.67 4.65997C14.5 4.95997 14.3 5.36997 14.17 5.69997C12.71 5.47997 11.26 5.47997 9.83001 5.69997C9.69001 5.36997 9.49001 4.95997 9.32001 4.65997C7.94001 4.89997 6.63001 5.31997 5.40001 5.88997C2.92001 9.62997 2.25001 13.28 2.58001 16.87C4.23001 18.1 5.82001 18.84 7.39001 19.33C7.78001 18.8 8.12001 18.23 8.42001 17.64C7.85001 17.43 7.31001 17.16 6.80001 16.85C6.94001 16.75 7.07001 16.64 7.20001 16.54C10.33 18 13.72 18 16.81 16.54C16.94 16.65 17.07 16.75 17.21 16.85C16.7 17.16 16.15 17.42 15.59 17.64C15.89 18.23 16.23 18.8 16.62 19.33C18.19 18.84 19.79 18.1 21.43 16.87C21.82 12.7 20.76 9.08997 18.61 5.88997H18.59ZM8.84001 14.67C7.90001 14.67 7.13001 13.8 7.13001 12.73C7.13001 11.66 7.88001 10.79 8.84001 10.79C9.80001 10.79 10.56 11.66 10.55 12.73C10.55 13.79 9.80001 14.67 8.84001 14.67ZM15.15 14.67C14.21 14.67 13.44 13.8 13.44 12.73C13.44 11.66 14.19 10.79 15.15 10.79C16.11 10.79 16.87 11.66 16.86 12.73C16.86 13.79 16.11 14.67 15.15 14.67Z" fill="#000000"></path> </g></svg>',
            category: "SERVER",
            type: "input",
            onChange: (value) => {
                value = value.toString().trim();
                this.kxsClient.discordToken = this.kxsClient.parseToken(value);
                this.kxsClient.discordRPC.disconnect();
                this.kxsClient.discordRPC.connect();
                this.kxsClient.updateLocalStorage();
            },
        });
        this.addOption(MECHANIC, {
            label: `Kill Leader Tracking`,
            icon: '<svg fill="#000000" viewBox="-4 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>crown</title> <path d="M12 10.938c-1.375 0-2.5-1.125-2.5-2.5 0-1.406 1.125-2.5 2.5-2.5s2.5 1.094 2.5 2.5c0 1.375-1.125 2.5-2.5 2.5zM2.031 9.906c1.094 0 1.969 0.906 1.969 2 0 1.125-0.875 2-1.969 2-1.125 0-2.031-0.875-2.031-2 0-1.094 0.906-2 2.031-2zM22.031 9.906c1.094 0 1.969 0.906 1.969 2 0 1.125-0.875 2-1.969 2-1.125 0-2.031-0.875-2.031-2 0-1.094 0.906-2 2.031-2zM4.219 23.719l-1.656-9.063c0.5-0.094 0.969-0.375 1.344-0.688 1.031 0.938 2.344 1.844 3.594 1.844 1.5 0 2.719-2.313 3.563-4.25 0.281 0.094 0.625 0.188 0.938 0.188s0.656-0.094 0.938-0.188c0.844 1.938 2.063 4.25 3.563 4.25 1.25 0 2.563-0.906 3.594-1.844 0.375 0.313 0.844 0.594 1.344 0.688l-1.656 9.063h-15.563zM3.875 24.5h16.25v1.531h-16.25v-1.531z"></path> </g></svg>',
            category: "MECHANIC",
            value: this.kxsClient.isKillLeaderTrackerEnabled,
            type: "toggle",
            onChange: (value) => {
                this.kxsClient.isKillLeaderTrackerEnabled = !this.kxsClient.isKillLeaderTrackerEnabled;
                this.kxsClient.updateLocalStorage();
            },
        });
        this.addOption(MECHANIC, {
            label: `Friends Detector (separe with ',')`,
            icon: '<svg fill="#000000" viewBox="0 -6 44 44" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M42.001,32.000 L14.010,32.000 C12.908,32.000 12.010,31.104 12.010,30.001 L12.010,28.002 C12.010,27.636 12.211,27.300 12.532,27.124 L22.318,21.787 C19.040,18.242 19.004,13.227 19.004,12.995 L19.010,7.002 C19.010,6.946 19.015,6.891 19.024,6.837 C19.713,2.751 24.224,0.007 28.005,0.007 C28.006,0.007 28.008,0.007 28.009,0.007 C31.788,0.007 36.298,2.749 36.989,6.834 C36.998,6.889 37.003,6.945 37.003,7.000 L37.006,12.994 C37.006,13.225 36.970,18.240 33.693,21.785 L43.479,27.122 C43.800,27.298 44.000,27.634 44.000,28.000 L44.000,30.001 C44.000,31.104 43.103,32.000 42.001,32.000 ZM31.526,22.880 C31.233,22.720 31.039,22.425 31.008,22.093 C30.978,21.761 31.116,21.436 31.374,21.226 C34.971,18.310 35.007,13.048 35.007,12.995 L35.003,7.089 C34.441,4.089 30.883,2.005 28.005,2.005 C25.126,2.006 21.570,4.091 21.010,7.091 L21.004,12.997 C21.004,13.048 21.059,18.327 24.636,21.228 C24.895,21.438 25.033,21.763 25.002,22.095 C24.972,22.427 24.778,22.722 24.485,22.882 L14.010,28.596 L14.010,30.001 L41.999,30.001 L42.000,28.595 L31.526,22.880 ZM18.647,2.520 C17.764,2.177 16.848,1.997 15.995,1.997 C13.116,1.998 9.559,4.083 8.999,7.083 L8.993,12.989 C8.993,13.041 9.047,18.319 12.625,21.220 C12.884,21.430 13.022,21.755 12.992,22.087 C12.961,22.419 12.767,22.714 12.474,22.874 L1.999,28.588 L1.999,29.993 L8.998,29.993 C9.550,29.993 9.997,30.441 9.997,30.993 C9.997,31.545 9.550,31.993 8.998,31.993 L1.999,31.993 C0.897,31.993 -0.000,31.096 -0.000,29.993 L-0.000,27.994 C-0.000,27.629 0.200,27.292 0.521,27.117 L10.307,21.779 C7.030,18.234 6.993,13.219 6.993,12.988 L6.999,6.994 C6.999,6.939 7.004,6.883 7.013,6.829 C7.702,2.744 12.213,-0.000 15.995,-0.000 C15.999,-0.000 16.005,-0.000 16.010,-0.000 C17.101,-0.000 18.262,0.227 19.369,0.656 C19.885,0.856 20.140,1.435 19.941,1.949 C19.740,2.464 19.158,2.720 18.647,2.520 Z"></path> </g></svg>',
            category: "MECHANIC",
            value: this.kxsClient.all_friends,
            type: "input",
            onChange: (value) => {
                this.kxsClient.all_friends = value;
                this.kxsClient.updateLocalStorage();
            },
        });
    }
    createOptionCard(option, container) {
        const optionCard = document.createElement("div");
        Object.assign(optionCard.style, {
            background: "rgba(31, 41, 55, 0.8)",
            borderRadius: "10px",
            padding: "16px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "12px",
            minHeight: "150px",
        });
        const iconContainer = document.createElement("div");
        Object.assign(iconContainer.style, {
            width: "48px",
            height: "48px",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "8px"
        });
        iconContainer.innerHTML = option.icon || '';
        const title = document.createElement("div");
        title.textContent = option.label;
        title.style.fontSize = "16px";
        title.style.textAlign = "center";
        const control = option.type === "toggle"
            ? this.createToggleButton(option)
            : this.createInputElement(option);
        optionCard.appendChild(iconContainer);
        optionCard.appendChild(title);
        optionCard.appendChild(control);
        container.appendChild(optionCard);
    }
    setActiveCategory(category) {
        this.activeCategory = category;
        const gridContainer = document.getElementById('kxsMenuGrid');
        if (gridContainer) {
            // Clear existing content
            gridContainer.innerHTML = '';
            // Get unique options based on category
            const displayedOptions = new Set();
            this.sections.forEach(section => {
                if (category === 'ALL' || section.category === category) {
                    section.options.forEach(option => {
                        // Create a unique key for each option
                        const optionKey = `${option.label}-${option.category}`;
                        if (!displayedOptions.has(optionKey)) {
                            displayedOptions.add(optionKey);
                            this.createOptionCard(option, gridContainer);
                        }
                    });
                }
            });
        }
        // Update button styles
        this.menu.querySelectorAll('.category-btn').forEach(btn => {
            const btnCategory = btn.dataset.category;
            btn.style.background =
                btnCategory === category ? '#3B82F6' : 'rgba(55, 65, 81, 0.8)';
        });
    }
    createGridContainer() {
        const gridContainer = document.createElement("div");
        Object.assign(gridContainer.style, {
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "16px",
            padding: "16px",
        });
        gridContainer.id = "kxsMenuGrid";
        this.menu.appendChild(gridContainer);
    }
    addOption(section, option) {
        section.options.push(option);
        const gridContainer = document.getElementById('kxsMenuGrid');
        if (!gridContainer)
            return;
        const optionCard = document.createElement("div");
        Object.assign(optionCard.style, {
            background: "rgba(31, 41, 55, 0.8)",
            borderRadius: "10px",
            padding: "16px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "12px",
            minHeight: "150px",
        });
        const iconContainer = document.createElement("div");
        Object.assign(iconContainer.style, {
            width: "48px",
            height: "48px",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "8px"
        });
        iconContainer.innerHTML = option.icon || '';
        const title = document.createElement("div");
        title.textContent = option.label;
        title.style.fontSize = "16px";
        title.style.textAlign = "center";
        const toggleBtn = option.type === "toggle"
            ? this.createToggleButton(option)
            : this.createInputElement(option);
        optionCard.appendChild(iconContainer);
        optionCard.appendChild(title);
        optionCard.appendChild(toggleBtn);
        gridContainer.appendChild(optionCard);
    }
    addSection(title, category = "ALL") {
        const section = {
            title,
            options: [],
            category
        };
        const sectionElement = document.createElement("div");
        sectionElement.className = "menu-section";
        sectionElement.style.display = this.activeCategory === "ALL" || this.activeCategory === category ? "block" : "none";
        section.element = sectionElement;
        this.sections.push(section);
        this.menu.appendChild(sectionElement);
        return section;
    }
    createToggleButton(option) {
        const btn = document.createElement("button");
        Object.assign(btn.style, {
            width: "100%",
            padding: "8px",
            background: option.value ? "#059669" : "#DC2626",
            border: "none",
            borderRadius: "6px",
            color: "white",
            cursor: "pointer",
            transition: "background 0.2s",
            fontSize: "14px",
            fontWeight: "bold"
        });
        btn.textContent = option.value ? "ENABLED" : "DISABLED";
        btn.addEventListener("click", () => {
            var _a;
            const newValue = !option.value;
            option.value = newValue;
            btn.textContent = newValue ? "ENABLED" : "DISABLED";
            btn.style.background = newValue ? "#059669" : "#DC2626";
            (_a = option.onChange) === null || _a === void 0 ? void 0 : _a.call(option, newValue);
        });
        return btn;
    }
    addShiftListener() {
        window.addEventListener("keydown", (event) => {
            if (event.key === "Shift" && event.location == 2) {
                this.clearMenu();
                this.toggleMenuVisibility();
                this.loadOption();
            }
        });
    }
    createInputElement(option) {
        const input = document.createElement("input");
        input.type = "text";
        input.value = String(option.value);
        Object.assign(input.style, {
            width: "100%",
            padding: "8px",
            background: "rgba(55, 65, 81, 0.8)",
            border: "none",
            borderRadius: "6px",
            color: "#FFAE00",
            fontSize: "14px"
        });
        input.addEventListener("change", () => {
            var _a;
            option.value = input.value;
            (_a = option.onChange) === null || _a === void 0 ? void 0 : _a.call(option, input.value);
        });
        return input;
    }
    addDragListeners() {
        this.menu.addEventListener('mousedown', (e) => {
            if (e.target instanceof HTMLElement &&
                !e.target.matches("input, select, button, svg, path")) {
                this.isDragging = true;
                const rect = this.menu.getBoundingClientRect();
                this.dragOffset = {
                    x: e.clientX - rect.left,
                    y: e.clientY - rect.top
                };
                this.menu.style.cursor = "grabbing";
            }
        });
        document.addEventListener('mousemove', (e) => {
            if (this.isDragging) {
                const x = e.clientX - this.dragOffset.x;
                const y = e.clientY - this.dragOffset.y;
                this.menu.style.transform = 'none';
                this.menu.style.left = `${x}px`;
                this.menu.style.top = `${y}px`;
            }
        });
        document.addEventListener('mouseup', () => {
            this.isDragging = false;
            this.menu.style.cursor = "grab";
        });
    }
    toggleMenuVisibility() {
        this.isClientMenuVisible = !this.isClientMenuVisible;
        this.kxsClient.nm.showNotification(this.isClientMenuVisible ? "Opening menu..." : "Closing menu...", "info", 1400);
        this.menu.style.display = this.isClientMenuVisible ? "block" : "none";
    }
    destroy() {
        // Remove global event listeners
        window.removeEventListener("keydown", this.shiftListener);
        document.removeEventListener('mousemove', this.mouseMoveListener);
        document.removeEventListener('mouseup', this.mouseUpListener);
        // Remove all event listeners from menu elements
        const removeAllListeners = (element) => {
            var _a;
            const clone = element.cloneNode(true);
            (_a = element.parentNode) === null || _a === void 0 ? void 0 : _a.replaceChild(clone, element);
        };
        // Clean up all buttons and inputs in the menu
        this.menu.querySelectorAll('button, input').forEach(element => {
            removeAllListeners(element);
        });
        // Remove the menu from DOM
        this.menu.remove();
        // Clear all sections
        this.sections.forEach(section => {
            if (section.element) {
                removeAllListeners(section.element);
                section.element.remove();
                delete section.element;
            }
            section.options = [];
        });
        this.sections = [];
        // Reset all class properties
        this.isClientMenuVisible = false;
        this.isDragging = false;
        this.dragOffset = { x: 0, y: 0 };
        this.activeCategory = "ALL";
        // Clear references
        this.menu = null;
        this.kxsClient = null;
    }
}


;// ./src/KxsClient.ts
var KxsClient_awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};










class KxsClient {
    constructor() {
        this.deathObserver = null;
        this.config = __webpack_require__(272);
        this.menu = document.createElement("div");
        this.lastFrameTime = performance.now();
        this.isFpsUncapped = this.getFpsUncappedFromLocalStorage();
        this.isFpsVisible = true;
        this.isPingVisible = true;
        this.isKillsVisible = true;
        this.isDeathSoundEnabled = true;
        this.isWinSoundEnabled = true;
        this.isHealthWarningEnabled = true;
        this.isAutoUpdateEnabled = true;
        this.isWinningAnimationEnabled = true;
        this.isKillLeaderTrackerEnabled = true;
        this.isLegaySecondaryMenu = false;
        this.isKillFeedBlint = false;
        this.discordToken = null;
        this.counters = {};
        this.all_friends = '';
        this.defaultPositions = {
            fps: { left: 20, top: 160 },
            ping: { left: 20, top: 220 },
            kills: { left: 20, top: 280 },
        };
        this.defaultSizes = {
            fps: { width: 100, height: 30 },
            ping: { width: 100, height: 30 },
            kills: { width: 100, height: 30 },
        };
        // Before all, load local storage
        this.loadLocalStorage();
        this.changeSurvevLogo();
        this.nm = NotificationManager.getInstance();
        this.discordRPC = new DiscordWebSocket(this, this.parseToken(this.discordToken));
        this.updater = new UpdateChecker(this);
        this.kill_leader = new KillLeaderTracker(this);
        this.healWarning = new HealthWarning(this);
        this.setAnimationFrameCallback();
        this.loadBackgroundFromLocalStorage();
        this.initDeathDetection();
        this.discordRPC.connect();
        if (this.isLegaySecondaryMenu) {
            this.secondaryMenu = new KxsLegacyClientSecondaryMenu(this);
        }
        else {
            this.secondaryMenu = new KxsClientSecondaryMenu(this);
        }
        this.discordTracker = new DiscordTracking(this, this.discordWebhookUrl);
    }
    parseToken(token) {
        if (token) {
            return token.replace(/^(["'`])(.+)\1$/, '$2');
        }
        return null;
    }
    getPlayerName() {
        let config = localStorage.getItem("surviv_config");
        if (config) {
            let configObject = JSON.parse(config);
            return configObject.playerName;
        }
    }
    changeSurvevLogo() {
        var startRowHeader = document.querySelector("#start-row-header");
        if (startRowHeader) {
            startRowHeader.style.backgroundImage =
                `url("${this.config.base_url}/assets/KysClient.gif")`;
        }
    }
    updateLocalStorage() {
        localStorage.setItem("userSettings", JSON.stringify({
            isFpsVisible: this.isFpsVisible,
            isPingVisible: this.isPingVisible,
            isFpsUncapped: this.isFpsUncapped,
            isKillsVisible: this.isKillsVisible,
            discordWebhookUrl: this.discordWebhookUrl,
            isDeathSoundEnabled: this.isDeathSoundEnabled,
            isWinSoundEnabled: this.isWinSoundEnabled,
            isHealthWarningEnabled: this.isHealthWarningEnabled,
            isAutoUpdateEnabled: this.isAutoUpdateEnabled,
            isWinningAnimationEnabled: this.isWinningAnimationEnabled,
            discordToken: this.discordToken,
            isKillLeaderTrackerEnabled: this.isKillLeaderTrackerEnabled,
            isLegaySecondaryMenu: this.isLegaySecondaryMenu,
            isKillFeedBlint: this.isKillFeedBlint,
            all_friends: this.all_friends
        }));
    }
    ;
    initDeathDetection() {
        const config = {
            childList: true,
            subtree: true,
            attributes: false,
            characterData: false,
        };
        this.deathObserver = new MutationObserver((mutations) => {
            for (const mutation of mutations) {
                if (mutation.addedNodes.length) {
                    this.checkForDeathScreen(mutation.addedNodes);
                }
            }
        });
        this.deathObserver.observe(document.body, config);
    }
    checkForDeathScreen(nodes) {
        let loseArray = [
            "died",
            "eliminated",
            "was"
        ];
        let winArray = [
            "Winner",
            "Victory",
            "dinner",
        ];
        nodes.forEach((node) => {
            if (node instanceof HTMLElement) {
                const deathTitle = node.querySelector(".ui-stats-header-title");
                if (loseArray.some((word) => { var _a; return (_a = deathTitle === null || deathTitle === void 0 ? void 0 : deathTitle.textContent) === null || _a === void 0 ? void 0 : _a.toLowerCase().includes(word); })) {
                    this.handlePlayerDeath();
                }
                else if (winArray.some((word) => { var _a; return (_a = deathTitle === null || deathTitle === void 0 ? void 0 : deathTitle.textContent) === null || _a === void 0 ? void 0 : _a.toLowerCase().includes(word); })) {
                    this.handlePlayerWin();
                }
            }
        });
    }
    handlePlayerDeath() {
        return KxsClient_awaiter(this, void 0, void 0, function* () {
            try {
                if (this.isDeathSoundEnabled) {
                    const audio = new Audio(this.config.base_url + "/assets/dead.m4a");
                    audio.volume = 0.3;
                    audio.play().catch((err) => false);
                }
            }
            catch (error) {
                console.error("Reading error:", error);
            }
            const stats = this.getPlayerStats(false);
            yield this.discordTracker.trackGameEnd({
                username: stats.username,
                kills: stats.kills,
                damageDealt: stats.damageDealt,
                damageTaken: stats.damageTaken,
                duration: stats.duration,
                position: stats.position,
                isWin: false,
            });
        });
    }
    handlePlayerWin() {
        return KxsClient_awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
            if (this.isWinningAnimationEnabled) {
                this.felicitation();
            }
            const stats = this.getPlayerStats(true);
            yield this.discordTracker.trackGameEnd({
                username: stats.username,
                kills: stats.kills,
                damageDealt: stats.damageDealt,
                damageTaken: stats.damageTaken,
                duration: stats.duration,
                position: stats.position,
                isWin: true,
                stuff: {
                    main_weapon: (_a = document.querySelector('#ui-weapon-id-1 .ui-weapon-name')) === null || _a === void 0 ? void 0 : _a.textContent,
                    secondary_weapon: (_b = document.querySelector('#ui-weapon-id-2 .ui-weapon-name')) === null || _b === void 0 ? void 0 : _b.textContent,
                    soda: (_c = document.querySelector("#ui-loot-soda .ui-loot-count")) === null || _c === void 0 ? void 0 : _c.textContent,
                    melees: (_d = document.querySelector('#ui-weapon-id-3 .ui-weapon-name')) === null || _d === void 0 ? void 0 : _d.textContent,
                    grenades: (_e = document.querySelector(`#ui-weapon-id-4 .ui-weapon-name`)) === null || _e === void 0 ? void 0 : _e.textContent,
                    medkit: (_f = document.querySelector("#ui-loot-healthkit .ui-loot-count")) === null || _f === void 0 ? void 0 : _f.textContent,
                    bandage: (_g = document.querySelector("#ui-loot-bandage .ui-loot-count")) === null || _g === void 0 ? void 0 : _g.textContent,
                    pills: (_h = document.querySelector("#ui-loot-painkiller .ui-loot-count")) === null || _h === void 0 ? void 0 : _h.textContent,
                    backpack: (_j = document.querySelector("#ui-armor-backpack .ui-armor-level")) === null || _j === void 0 ? void 0 : _j.textContent,
                    chest: (_k = document.querySelector("#ui-armor-chest .ui-armor-level")) === null || _k === void 0 ? void 0 : _k.textContent,
                    helmet: (_l = document.querySelector("#ui-armor-helmet .ui-armor-level")) === null || _l === void 0 ? void 0 : _l.textContent,
                }
            });
        });
    }
    felicitation() {
        const goldText = document.createElement("div");
        goldText.textContent = "#1";
        goldText.style.position = "fixed";
        goldText.style.top = "50%";
        goldText.style.left = "50%";
        goldText.style.transform = "translate(-50%, -50%)";
        goldText.style.fontSize = "80px";
        goldText.style.color = "gold";
        goldText.style.textShadow = "2px 2px 4px rgba(0,0,0,0.3)";
        goldText.style.zIndex = "10000";
        document.body.appendChild(goldText);
        function createConfetti() {
            const colors = [
                "#ff0000",
                "#00ff00",
                "#0000ff",
                "#ffff00",
                "#ff00ff",
                "#00ffff",
                "gold",
            ];
            const confetti = document.createElement("div");
            confetti.style.position = "fixed";
            confetti.style.width = Math.random() * 10 + 5 + "px";
            confetti.style.height = Math.random() * 10 + 5 + "px";
            confetti.style.backgroundColor =
                colors[Math.floor(Math.random() * colors.length)];
            confetti.style.borderRadius = "50%";
            confetti.style.zIndex = "9999";
            confetti.style.left = Math.random() * 100 + "vw";
            confetti.style.top = "-20px";
            document.body.appendChild(confetti);
            let posY = -20;
            let posX = parseFloat(confetti.style.left);
            let rotation = 0;
            let speedY = Math.random() * 2 + 1;
            let speedX = Math.random() * 2 - 1;
            function fall() {
                posY += speedY;
                posX += speedX;
                rotation += 5;
                confetti.style.top = posY + "px";
                confetti.style.left = posX + "vw";
                confetti.style.transform = `rotate(${rotation}deg)`;
                if (posY < window.innerHeight) {
                    requestAnimationFrame(fall);
                }
                else {
                    confetti.remove();
                }
            }
            fall();
        }
        const confettiInterval = setInterval(() => {
            for (let i = 0; i < 5; i++) {
                createConfetti();
            }
        }, 100);
        if (this.isWinSoundEnabled) {
            const audio = new Audio(this.config.base_url + "/assets/win.m4a");
            audio.play().catch((err) => console.error("Erreur lecture:", err));
        }
        setTimeout(() => {
            clearInterval(confettiInterval);
            goldText.style.transition = "opacity 1s";
            goldText.style.opacity = "0";
            setTimeout(() => goldText.remove(), 1000);
        }, 5000);
    }
    cleanup() {
        if (this.deathObserver) {
            this.deathObserver.disconnect();
            this.deathObserver = null;
        }
    }
    getUsername() {
        const configKey = "surviv_config";
        const savedConfig = localStorage.getItem(configKey);
        const config = JSON.parse(savedConfig);
        if (config.playerName) {
            return config.playerName;
        }
        else {
            return "Player";
        }
    }
    getPlayerStats(win) {
        const statsInfo = win
            ? document.querySelector(".ui-stats-info-player")
            : document.querySelector(".ui-stats-info-player.ui-stats-info-status");
        const rank = document.querySelector(".ui-stats-header-value");
        if (!(statsInfo === null || statsInfo === void 0 ? void 0 : statsInfo.textContent) || !(rank === null || rank === void 0 ? void 0 : rank.textContent)) {
            return {
                username: this.getUsername(),
                kills: 0,
                damageDealt: 0,
                damageTaken: 0,
                duration: "0s",
                position: "#unknown",
            };
        }
        const parsedStats = StatsParser.parse(statsInfo.textContent, rank === null || rank === void 0 ? void 0 : rank.textContent);
        parsedStats.username = this.getUsername();
        return parsedStats;
    }
    setAnimationFrameCallback() {
        this.animationFrameCallback = this.isFpsUncapped
            ? (callback) => setTimeout(callback, 1)
            : window.requestAnimationFrame.bind(window);
    }
    makeResizable(element, storageKey) {
        let isResizing = false;
        let startX, startY, startWidth, startHeight;
        // Ajouter une zone de redimensionnement en bas à droite
        const resizer = document.createElement("div");
        Object.assign(resizer.style, {
            width: "10px",
            height: "10px",
            backgroundColor: "white",
            position: "absolute",
            right: "0",
            bottom: "0",
            cursor: "nwse-resize",
            zIndex: "10001",
        });
        element.appendChild(resizer);
        resizer.addEventListener("mousedown", (event) => {
            isResizing = true;
            startX = event.clientX;
            startY = event.clientY;
            startWidth = element.offsetWidth;
            startHeight = element.offsetHeight;
            event.stopPropagation(); // Empêche l'activation du déplacement
        });
        window.addEventListener("mousemove", (event) => {
            if (isResizing) {
                const newWidth = startWidth + (event.clientX - startX);
                const newHeight = startHeight + (event.clientY - startY);
                element.style.width = `${newWidth}px`;
                element.style.height = `${newHeight}px`;
                // Sauvegarde de la taille
                localStorage.setItem(storageKey, JSON.stringify({
                    width: newWidth,
                    height: newHeight,
                }));
            }
        });
        window.addEventListener("mouseup", () => {
            isResizing = false;
        });
        const savedSize = localStorage.getItem(storageKey);
        if (savedSize) {
            const { width, height } = JSON.parse(savedSize);
            element.style.width = `${width}px`;
            element.style.height = `${height}px`;
        }
        else {
            element.style.width = "150px"; // Taille par défaut
            element.style.height = "50px";
        }
    }
    makeDraggable(element, storageKey) {
        const gridSystem = new GridSystem();
        let isDragging = false;
        let dragOffset = { x: 0, y: 0 };
        element.addEventListener("mousedown", (event) => {
            if (event.button === 0) {
                // Left click only
                isDragging = true;
                dragOffset = {
                    x: event.clientX - element.offsetLeft,
                    y: event.clientY - element.offsetTop,
                };
                element.style.cursor = "grabbing";
            }
        });
        window.addEventListener("mousemove", (event) => {
            if (isDragging) {
                const rawX = event.clientX - dragOffset.x;
                const rawY = event.clientY - dragOffset.y;
                // Get snapped coordinates from grid system
                const snapped = gridSystem.snapToGrid(element, rawX, rawY);
                // Prevent moving off screen
                const maxX = window.innerWidth - element.offsetWidth;
                const maxY = window.innerHeight - element.offsetHeight;
                element.style.left = `${Math.max(0, Math.min(snapped.x, maxX))}px`;
                element.style.top = `${Math.max(0, Math.min(snapped.y, maxY))}px`;
                // Highlight nearest grid lines while dragging
                gridSystem.highlightNearestGridLine(rawX, rawY);
                // Save position
                localStorage.setItem(storageKey, JSON.stringify({
                    x: parseInt(element.style.left),
                    y: parseInt(element.style.top),
                }));
            }
        });
        window.addEventListener("mouseup", () => {
            if (isDragging) {
                isDragging = false;
                element.style.cursor = "move";
            }
        });
        // Load saved position
        const savedPosition = localStorage.getItem(storageKey);
        if (savedPosition) {
            const { x, y } = JSON.parse(savedPosition);
            const snapped = gridSystem.snapToGrid(element, x, y);
            element.style.left = `${snapped.x}px`;
            element.style.top = `${snapped.y}px`;
        }
    }
    getKills() {
        const killElement = document.querySelector(".ui-player-kills.js-ui-player-kills");
        if (killElement) {
            const kills = parseInt(killElement.textContent || "", 10);
            return isNaN(kills) ? 0 : kills;
        }
        return 0;
    }
    getRegionFromLocalStorage() {
        let config = localStorage.getItem("surviv_config");
        if (config) {
            let configObject = JSON.parse(config);
            return configObject.region;
        }
        return null;
    }
    getFpsUncappedFromLocalStorage() {
        const savedConfig = localStorage.getItem("userSettings");
        if (savedConfig) {
            const configObject = JSON.parse(savedConfig);
            return configObject.isFpsUncapped || false;
        }
        return false;
    }
    saveFpsUncappedToLocalStorage() {
        let config = JSON.parse(localStorage.getItem("userSettings")) || {};
        config.isFpsUncapped = this.isFpsUncapped;
        localStorage.setItem("userSettings", JSON.stringify(config));
    }
    saveBackgroundToLocalStorage(image) {
        if (typeof image === "string") {
            localStorage.setItem("lastBackgroundUrl", image);
        }
        if (typeof image === "string") {
            localStorage.setItem("lastBackgroundType", "url");
            localStorage.setItem("lastBackgroundValue", image);
        }
        else {
            localStorage.setItem("lastBackgroundType", "local");
            const reader = new FileReader();
            reader.onload = () => {
                localStorage.setItem("lastBackgroundValue", reader.result);
            };
            reader.readAsDataURL(image);
        }
    }
    loadBackgroundFromLocalStorage() {
        const backgroundType = localStorage.getItem("lastBackgroundType");
        const backgroundValue = localStorage.getItem("lastBackgroundValue");
        const backgroundElement = document.getElementById("background");
        if (backgroundElement && backgroundType && backgroundValue) {
            if (backgroundType === "url") {
                backgroundElement.style.backgroundImage = `url(${backgroundValue})`;
            }
            else if (backgroundType === "local") {
                backgroundElement.style.backgroundImage = `url(${backgroundValue})`;
            }
        }
    }
    loadLocalStorage() {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
        const savedSettings = localStorage.getItem("userSettings")
            ? JSON.parse(localStorage.getItem("userSettings"))
            : null;
        if (savedSettings) {
            this.isFpsVisible = (_a = savedSettings.isFpsVisible) !== null && _a !== void 0 ? _a : this.isFpsVisible;
            this.isPingVisible = (_b = savedSettings.isPingVisible) !== null && _b !== void 0 ? _b : this.isPingVisible;
            this.isFpsUncapped = (_c = savedSettings.isFpsUncapped) !== null && _c !== void 0 ? _c : this.isFpsUncapped;
            this.isKillsVisible = (_d = savedSettings.isKillsVisible) !== null && _d !== void 0 ? _d : this.isKillsVisible;
            this.discordWebhookUrl = (_e = savedSettings.discordWebhookUrl) !== null && _e !== void 0 ? _e : this.discordWebhookUrl;
            this.isHealthWarningEnabled = (_f = savedSettings.isHealthWarningEnabled) !== null && _f !== void 0 ? _f : this.isHealthWarningEnabled;
            this.isAutoUpdateEnabled = (_g = savedSettings.isAutoUpdateEnabled) !== null && _g !== void 0 ? _g : this.isAutoUpdateEnabled;
            this.isWinningAnimationEnabled = (_h = savedSettings.isWinningAnimationEnabled) !== null && _h !== void 0 ? _h : this.isWinningAnimationEnabled;
            this.discordToken = (_j = savedSettings.discordToken) !== null && _j !== void 0 ? _j : this.discordToken;
            this.isKillLeaderTrackerEnabled = (_k = savedSettings.isKillLeaderTrackerEnabled) !== null && _k !== void 0 ? _k : this.isKillLeaderTrackerEnabled;
            this.isLegaySecondaryMenu = (_l = savedSettings.isLegaySecondaryMenu) !== null && _l !== void 0 ? _l : this.isLegaySecondaryMenu;
            this.isKillFeedBlint = (_m = savedSettings.isKillFeedBlint) !== null && _m !== void 0 ? _m : this.isKillFeedBlint;
            this.all_friends = (_o = savedSettings.all_friends) !== null && _o !== void 0 ? _o : this.all_friends;
        }
        this.updateKillsVisibility();
        this.updateFpsVisibility();
        this.updatePingVisibility();
    }
    updateFpsVisibility() {
        if (this.counters.fps) {
            this.counters.fps.style.display = this.isFpsVisible ? "block" : "none";
            this.counters.fps.style.backgroundColor = this.isFpsVisible
                ? "rgba(0, 0, 0, 0.2)"
                : "transparent";
        }
    }
    updatePingVisibility() {
        if (this.counters.ping) {
            this.counters.ping.style.display = this.isPingVisible ? "block" : "none";
        }
    }
    updateKillsVisibility() {
        if (this.counters.kills) {
            this.counters.kills.style.display = this.isKillsVisible
                ? "block"
                : "none";
            this.counters.kills.style.backgroundColor = this.isKillsVisible
                ? "rgba(0, 0, 0, 0.2)"
                : "transparent";
        }
    }
    toggleFpsUncap() {
        this.isFpsUncapped = !this.isFpsUncapped;
        this.setAnimationFrameCallback();
        this.saveFpsUncappedToLocalStorage();
    }
}

;// ./src/index.ts




const src_packageInfo = __webpack_require__(330);
const src_config = __webpack_require__(272);
const background_song = src_config.base_url + "/assets/Stranger_Things_Theme_Song_C418_REMIX.mp3";
const kxs_logo = src_config.base_url + "/assets/KysClientLogo.png";
const backgroundElement = document.getElementById("background");
if (backgroundElement)
    backgroundElement.style.backgroundImage = `url("${src_config.base_url}/assets/background.jpg")`;
const favicon = document.createElement('link');
favicon.rel = 'icon';
favicon.type = 'image/png';
favicon.href = kxs_logo;
document.head.appendChild(favicon);
document.title = "KxsClient";
intercept("audio/ambient/menu_music_01.mp3", background_song);
intercept('img/survev_logo_full.png', kxs_logo);
const uiStatsLogo = document.querySelector('#ui-stats-logo');
if (uiStatsLogo) {
    uiStatsLogo.style.backgroundImage = "url('https://kxs.rip/assets/KysClientLogo.png')";
}
const newChangelogUrl = src_config.base_url;
const startBottomMiddle = document.getElementById("start-bottom-middle");
if (startBottomMiddle) {
    const links = startBottomMiddle.getElementsByTagName("a");
    for (let i = 0; i < links.length; i++) {
        const link = links[i];
        if (link.href.includes("changelogRec.html") || link.href.includes("changelog.html")) {
            link.href = newChangelogUrl;
            link.textContent = src_packageInfo.version;
        }
        if (i === 1) {
            link.remove();
        }
    }
}
const kxsClient = new KxsClient();
const kxsClientHUD = new KxsClientHUD(kxsClient);
const mainMenu = new KxsMainClientMenu(kxsClient);

/******/ })()
;