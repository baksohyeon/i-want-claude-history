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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConversationController = void 0;
const conversation_service_1 = require("../service/conversation.service");
class ConversationController {
    constructor() {
        this.conversationService = new conversation_service_1.ConversationService("");
    }
    fetchConversations(chatUrl) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("hello??");
            const lastActiveOrg = this.conversationService.getLastActiveOrgCookie();
            if (!lastActiveOrg) {
                throw new Error("lastActiveOrg 쿠키를 찾을 수 없습니다.");
            }
            const conversationId = chatUrl.split("/").pop();
            if (!conversationId) {
                throw new Error("대화 ID를 추출할 수 없습니다.");
            }
            const apiUrl = `https://claude.ai/api/organizations/${lastActiveOrg}/chat_conversations/${conversationId}`;
            this.conversationService = new conversation_service_1.ConversationService(apiUrl);
            console.log(apiUrl);
            return yield this.conversationService.fetchConversations();
        });
    }
    generateMarkdownFile(conversation, fileName) {
        this.conversationService.generateMarkdownFile(conversation, fileName);
    }
}
exports.ConversationController = ConversationController;
