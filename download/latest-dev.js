// ==UserScript==
// @name         Kxs Client - Survev.io Client
// @namespace    https://github.com/Kisakay/KxsClient
// @version      1.0.0
// @description  A client to enhance the survev.io in-game experience with many features, as well as future features.
// @author       SoyAlguien
// @license      AGPL-3.0
// @require      https://update.greasyfork.org/scripts/391611/743919/WSHook.js
// @run-at       document-end
// @match        *://survev.io/*
// @match        *://66.179.254.36/*
// @match        *://expandedwater.online/*
// @match        *://localhost:3000/*
// @match        *://surviv.wf/*
// @grant        none
// ==/UserScript==
;
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 330:
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"name":"kxsclient","version":"1.0.0","main":"index.js","scripts":{"test":"echo \\"Error: no test specified\\" && exit 1"},"keywords":[],"author":"","license":"ISC","description":"","devDependencies":{"ts-loader":"^9.5.1","typescript":"^5.7.2","webpack":"^5.97.1","webpack-cli":"^5.1.4"}}');

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
    constructor(webhookUrl) {
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
    toggleFpsUncap() {
        this.kxsClient.isFpsUncapped = !this.kxsClient.isFpsUncapped;
        this.kxsClient.setAnimationFrameCallback();
        this.kxsClient.saveFpsUncappedToLocalStorage();
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
        // this.menuManager.addToggleButton({
        //   id: "xray",
        //   text: `X-Ray`,
        //   initialState: this.kxsClient.isXrayEnable,
        //   onClick: () => {
        //     this.kxsClient.isXrayEnable = !this.kxsClient.isXrayEnable;
        //     window.open("https://www.youtube.com/watch?v=dQw4w9WgXcQ");
        //     this.kxsClient.updateLocalStorage();
        //   },
        // });
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
                this.kxsClient.isFpsUncapped = !this.kxsClient.isFpsUncapped;
                this.toggleFpsUncap();
                this.kxsClient.updateLocalStorage();
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


;// ./src/ClientSecondaryMenu.ts
class KxsClientSecondaryMenu {
    constructor(kxsClient) {
        this.kxsClient = kxsClient;
        this.isClientMenuVisible = false;
        this.isDragging = false;
        this.dragOffset = { x: 0, y: 0 };
        this.sections = [];
        this.menu = document.createElement("div");
        this.initMenu();
        this.addShiftListener();
        this.addDragListeners();
    }
    initMenu() {
        this.menu.id = "kxsMenuIG";
        this.applyMenuStyles();
        this.createHeader();
        document.body.appendChild(this.menu);
    }
    loadCounterPosition(counterName) {
        const counterPosition = localStorage.getItem(`${counterName}CounterPosition`);
        if (counterPosition) {
            return JSON.parse(counterPosition);
        }
        else {
            return {
                x: this.kxsClient.defaultPositions[counterName].left,
                y: this.kxsClient.defaultPositions[counterName].top,
            };
        }
    }
    loadOption() {
        let pingSection = this.addSection("Show Ping");
        this.addOption(pingSection, {
            label: "Enabled",
            value: this.kxsClient.isPingVisible,
            type: "toggle",
            onChange: (value) => {
                this.kxsClient.isPingVisible = !this.kxsClient.isPingVisible;
                this.kxsClient.updatePingVisibility();
                this.kxsClient.updateLocalStorage();
            },
        });
        let fpsSection = this.addSection("Show FPS");
        this.addOption(fpsSection, {
            label: "Enabled",
            value: this.kxsClient.isFpsVisible,
            type: "toggle",
            onChange: (value) => {
                this.kxsClient.isFpsVisible = !this.kxsClient.isFpsVisible;
                this.kxsClient.updateFpsVisibility();
                this.kxsClient.updateLocalStorage();
            },
        });
        let killSection = this.addSection("Show Kills");
        this.addOption(killSection, {
            label: "Enabled",
            value: this.kxsClient.isKillsVisible,
            type: "toggle",
            onChange: (value) => {
                this.kxsClient.isKillsVisible = !this.kxsClient.isKillsVisible;
                this.kxsClient.updateKillsVisibility();
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
        let discordSection = this.addSection("Discord Webhook");
        this.addOption(discordSection, {
            label: "Webhook URL",
            value: this.kxsClient.discordWebhookUrl || "",
            type: "input",
            onChange: (value) => {
                this.kxsClient.discordWebhookUrl = value;
                this.kxsClient.discordTracker.setWebhookUrl(value);
                this.kxsClient.updateLocalStorage();
            },
        });
        let pluginsSection = this.addSection("Plugins");
        this.addOption(pluginsSection, {
            label: "Heal Warning",
            value: this.kxsClient.isHealthWarningEnabled,
            type: "toggle",
            onChange: (value) => {
                this.kxsClient.isHealthWarningEnabled = !this.kxsClient.isHealthWarningEnabled;
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
        window.addEventListener("keydown", (event) => {
            if (event.key === "Shift") {
                this.clearMenu();
                this.toggleMenuVisibility();
                this.loadOption();
            }
        });
    }
    addDragListeners() {
        const handleMouseDown = (e) => {
            if (e.target instanceof HTMLElement &&
                !e.target.matches("input, select, button")) {
                this.isDragging = true;
                const rect = this.menu.getBoundingClientRect();
                this.dragOffset = {
                    x: e.clientX - rect.left,
                    y: e.clientY - rect.top,
                };
                this.menu.style.cursor = "grabbing";
            }
        };
        const handleMouseMove = (e) => {
            if (!this.isDragging)
                return;
            e.preventDefault();
            const newX = e.clientX - this.dragOffset.x;
            const newY = e.clientY - this.dragOffset.y;
            const maxX = window.innerWidth - this.menu.offsetWidth;
            const maxY = window.innerHeight - this.menu.offsetHeight;
            this.menu.style.left = `${Math.max(0, Math.min(newX, maxX))}px`;
            this.menu.style.top = `${Math.max(0, Math.min(newY, maxY))}px`;
        };
        const handleMouseUp = () => {
            this.isDragging = false;
            this.menu.style.cursor = "move";
        };
        this.menu.addEventListener("mousedown", handleMouseDown);
        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseup", handleMouseUp);
    }
    toggleMenuVisibility() {
        this.isClientMenuVisible = !this.isClientMenuVisible;
        this.menu.style.display = this.isClientMenuVisible ? "block" : "none";
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
                this.pingTest) {
                const result = this.pingTest.getPingResult();
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
        // Create a unique container for each counter
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
        document.body.appendChild(counterContainer);
        // Adjust font size based on container size
        const adjustFontSize = () => {
            const { width, height } = counter.getBoundingClientRect();
            const size = Math.min(width, height) * 0.4; // Reduced from 0.6 to 0.4 for better fit
            counter.style.fontSize = `${size}px`;
        };
        new ResizeObserver(adjustFontSize).observe(counter);
        // Middle click to reset INDIVIDUAL counter
        counter.addEventListener("mousedown", (event) => {
            if (event.button === 1) {
                // Middle click
                this.resetCounter(name, label, initialText);
                event.preventDefault(); // Prevent default middle-click behavior
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
        weaponNames.forEach((weaponNameElement) => {
            const weaponContainer = weaponNameElement.closest(".ui-weapon-switch");
            const observer = new MutationObserver(() => {
                var _a;
                const weaponName = (_a = weaponNameElement.textContent) === null || _a === void 0 ? void 0 : _a.trim();
                let border = "#FFFFFF";
                switch (weaponName.toUpperCase()) {
                    case "CZ-3A1":
                    case "G18C":
                    case "M9":
                    case "M93R":
                    case "MAC-10":
                    case "MP5":
                    case "P30L":
                    case "DUAL P30L":
                    case "UMP9":
                    case "VECTOR":
                    case "VSS":
                    case "FLAMETHROWER":
                        border = "#FFAE00";
                        break;
                    case "AK-47":
                    case "OT-38":
                    case "OTS-38":
                    case "M39 EMR":
                    case "DP-28":
                    case "MOSIN-NAGANT":
                    case "SCAR-H":
                    case "SV-98":
                    case "M1 GARAND":
                    case "PKP PECHENEG":
                    case "AN-94":
                    case "BAR M1918":
                    case "BLR 81":
                    case "SVD-63":
                    case "M134":
                    case "WATER GUN":
                    case "GROZA":
                    case "GROZA-S":
                        border = "#007FFF";
                        break;
                    case "FAMAS":
                    case "M416":
                    case "M249":
                    case "QBB-97":
                    case "MK 12 SPR":
                    case "M4A1-S":
                    case "SCOUT ELITE":
                    case "L86A2":
                        border = "#0f690d";
                        break;
                    case "M870":
                    case "MP220":
                    case "SAIGA-12":
                    case "SPAS-12":
                    case "USAS-12":
                    case "SUPER 90":
                    case "LASR GUN":
                    case "M1100":
                        border = "#FF0000";
                        break;
                    case "DEAGLE 50":
                    case "RAINBOW BLASTER":
                        border = "#000000";
                        break;
                    case "AWM-S":
                    case "MK 20 SSR":
                        border = "#808000";
                        break;
                    case "FLARE GUN":
                        border = "#FF4500";
                        break;
                    case "MODEL 94":
                    case "PEACEMAKER":
                    case "VECTOR (.45 ACP)":
                    case "M1911":
                    case "M1A1":
                        border = "#800080";
                        break;
                    case "M79":
                        border = "#008080";
                        break;
                    case "POTATO CANNON":
                    case "SPUD GUN":
                        border = "#A52A2A";
                        break;
                    case "HEART CANNON":
                        border = "#FFC0CB";
                        break;
                    default:
                        border = "#FFFFFF";
                        break;
                }
                if (weaponContainer && weaponContainer.id !== "ui-weapon-id-4") {
                    weaponContainer.style.border = `3px solid ${border}`;
                }
            });
            observer.observe(weaponNameElement, {
                childList: true,
                characterData: true,
                subtree: true,
            });
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
            console.log("Requête interceptée pour: " + url);
            arguments[1] = targetUrl;
        }
        open.apply(this, arguments);
    };
    const originalFetch = window.fetch;
    window.fetch = function (url, options) {
        if (url.includes(link)) {
            console.log("Requête interceptée pour: " + url);
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
        content.appendChild(icon);
        content.appendChild(text);
        warning.appendChild(content);
        document.body.appendChild(warning);
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
        this.kxsClient = kxsClient;
        this.warningElement = null;
        this.encouragementElement = null;
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
    showEncouragement(killsToLeader, isDethrone = false) {
        if (!this.encouragementElement)
            return;
        let message;
        if (isDethrone) {
            message = "Oh no! You've been dethroned!";
            this.encouragementElement.style.borderColor = "#ff0000";
            this.encouragementElement.style.color = "#ff0000";
            this.encouragementElement.style.background = "rgba(255, 0, 0, 0.1)";
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
    update(myKills) {
        const killLeaderElement = document.querySelector("#ui-kill-leader-count");
        if (killLeaderElement) {
            const leaderKills = parseInt(killLeaderElement.textContent || "0", 10);
            // Check if player was kill leader and is now dethroned
            if (this.wasKillLeader && myKills < leaderKills) {
                this.showEncouragement(0, true);
                this.wasKillLeader = false;
            }
            else if (myKills > this.lastKnownKills) {
                const killsToLeader = Math.max(0, leaderKills - myKills);
                this.showEncouragement(killsToLeader);
                this.wasKillLeader = killsToLeader <= 0;
            }
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
        this.menu = document.createElement("div");
        this.lastFrameTime = performance.now();
        this.isFpsUncapped = this.getFpsUncappedFromLocalStorage();
        this.isFpsVisible = true;
        this.isPingVisible = true;
        this.isKillsVisible = true;
        this.isXrayEnable = false;
        this.isDeathSoundEnabled = true;
        this.isWinSoundEnabled = true;
        this.isHealthWarningEnabled = true;
        this.counters = {};
        this.defaultPositions = {
            fps: { left: 20, top: 220 },
            ping: { left: 20, top: 280 },
            kills: { left: 20, top: 340 },
        };
        this.defaultSizes = {
            fps: { width: 100, height: 30 },
            ping: { width: 100, height: 30 },
            kills: { width: 100, height: 30 },
        };
        // Before all, load local storage
        this.loadLocalStorage();
        this.changeSurvevLogo();
        this.kill_leader = new KillLeaderTracker(this);
        this.healWarning = new HealthWarning(this);
        this.setAnimationFrameCallback();
        this.loadBackgroundFromLocalStorage();
        this.initDeathDetection();
        this.discordTracker = new DiscordTracking(this.discordWebhookUrl);
    }
    changeSurvevLogo() {
        var startRowHeader = document.querySelector("#start-row-header");
        if (startRowHeader) {
            startRowHeader.style.backgroundImage =
                'url("https://kisakay.github.io/KxsWebsite/assets/KysClient.gif")';
        }
    }
    updateLocalStorage() {
        localStorage.setItem("userSettings", JSON.stringify({
            isFpsVisible: this.isFpsVisible,
            isPingVisible: this.isPingVisible,
            isFpsUncapped: this.isFpsUncapped,
            isKillsVisible: this.isKillsVisible,
            isXrayEnable: this.isXrayEnable,
            discordWebhookUrl: this.discordWebhookUrl,
            isDeathSoundEnabled: this.isDeathSoundEnabled,
            isWinSoundEnabled: this.isWinSoundEnabled,
            isHealthWarningEnabled: this.isHealthWarningEnabled,
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
        nodes.forEach((node) => {
            var _a, _b;
            if (node instanceof HTMLElement) {
                const deathTitle = node.querySelector(".ui-stats-header-title");
                if ((_a = deathTitle === null || deathTitle === void 0 ? void 0 : deathTitle.textContent) === null || _a === void 0 ? void 0 : _a.includes("died")) {
                    this.handlePlayerDeath();
                }
                else if ((_b = deathTitle === null || deathTitle === void 0 ? void 0 : deathTitle.textContent) === null || _b === void 0 ? void 0 : _b.includes("Winner")) {
                    this.handlePlayerWin();
                }
            }
        });
    }
    handlePlayerDeath() {
        return KxsClient_awaiter(this, void 0, void 0, function* () {
            if (this.isDeathSoundEnabled) {
                const audio = new Audio("https://kisakay.github.io/KxsWebsite/assets/dead.m4a");
                audio.volume = 0.3;
                audio.play().catch((err) => false);
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
            this.felicitation();
            const stats = this.getPlayerStats(true);
            yield this.discordTracker.trackGameEnd({
                username: stats.username,
                kills: stats.kills,
                damageDealt: stats.damageDealt,
                damageTaken: stats.damageTaken,
                duration: stats.duration,
                position: stats.position,
                isWin: true,
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
            const audio = new Audio("https://kisakay.github.io/KxsWebsite/assets/win.m4a");
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
        var _a, _b, _c, _d, _e, _f, _g;
        const savedSettings = localStorage.getItem("userSettings")
            ? JSON.parse(localStorage.getItem("userSettings"))
            : null;
        if (savedSettings) {
            this.isFpsVisible = (_a = savedSettings.isFpsVisible) !== null && _a !== void 0 ? _a : this.isFpsVisible;
            this.isPingVisible = (_b = savedSettings.isPingVisible) !== null && _b !== void 0 ? _b : this.isPingVisible;
            this.isFpsUncapped = (_c = savedSettings.isFpsUncapped) !== null && _c !== void 0 ? _c : this.isFpsUncapped;
            this.isKillsVisible = (_d = savedSettings.isKillsVisible) !== null && _d !== void 0 ? _d : this.isKillsVisible;
            this.isXrayEnable = (_e = savedSettings.isXrayEnable) !== null && _e !== void 0 ? _e : this.isXrayEnable;
            this.discordWebhookUrl = (_f = savedSettings.discordWebhookUrl) !== null && _f !== void 0 ? _f : this.discordWebhookUrl;
            this.isHealthWarningEnabled = (_g = savedSettings.isHealthWarningEnabled) !== null && _g !== void 0 ? _g : this.isHealthWarningEnabled;
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
}

;// ./src/index.ts





const packageInfo = __webpack_require__(330);
const background_song = "https://kisakay.github.io/KxsWebsite/assets/Stranger_Things_Theme_Song_C418_REMIX.mp3";
const kxs_logo = "https://kisakay.github.io/KxsWebsite/assets/KysClientLogo.png";
const backgroundElement = document.getElementById("background");
if (backgroundElement)
    backgroundElement.style.backgroundImage = `url("https://kisakay.github.io/KxsWebsite/assets/background.jpg")`;
const favicon = document.createElement('link');
favicon.rel = 'icon';
favicon.type = 'image/png';
favicon.href = kxs_logo;
document.head.appendChild(favicon);
document.title = "KxsClient";
intercept("audio/ambient/menu_music_01.mp3", background_song);
intercept("img/icon_app.png", kxs_logo);
intercept("/favicon.ico", kxs_logo);
intercept("https://survev.io/changelog", "https://kisakay.github.io/KxsWebsite");
const newChangelogUrl = "https://kisakay.github.io/KxsWebsite";
const startBottomMiddle = document.getElementById("start-bottom-middle");
if (startBottomMiddle) {
    const links = startBottomMiddle.getElementsByTagName("a");
    for (let i = 0; i < links.length; i++) {
        const link = links[i];
        if (link.href.includes("changelogRec.html") || link.href.includes("changelog.html")) {
            link.href = newChangelogUrl;
            link.textContent = packageInfo.version;
        }
        if (i === 1) {
            link.remove();
        }
    }
}
const kxsClient = new KxsClient();
const kxsClientHUD = new KxsClientHUD(kxsClient);
const mainMenu = new KxsMainClientMenu(kxsClient);
const secondaryMenu = new KxsClientSecondaryMenu(kxsClient);

/******/ })()
;