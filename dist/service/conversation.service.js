"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConversationService = void 0;
const fs_1 = __importDefault(require("fs"));
class ConversationService {
    constructor(apiUrl) {
        this.apiUrl = apiUrl;
    }
    fetchConversations() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log({ url: this.apiUrl });
            const response = yield fetch(this.apiUrl, { method: "GET" });
            const data = (yield response.json());
            return data;
        });
    }
    generateMarkdownFile(conversation, fileName) {
        let markdownText = `# ${conversation.name}\n\n`;
        conversation.chat_messages.forEach((message, index) => {
            markdownText += `## 메시지 ${index + 1}\n\n`;
            markdownText +=
                message.sender === "human"
                    ? `> ${message.text}\n\n`
                    : `${message.text}\n\n`;
        });
        fs_1.default.writeFileSync(fileName, markdownText);
    }
    getLastActiveOrgCookie() {
        console.log({ cookies: document.cookie });
        const cookies = document.cookie.split("; ");
        for (const cookie of cookies) {
            const [name, value] = cookie.split("=");
            if (name === "lastActiveOrg") {
                return value;
            }
        }
        return null;
    }
}
exports.ConversationService = ConversationService;
