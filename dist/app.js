"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const converstation_controller_1 = require("./controller/converstation.controller");
const app = (0, express_1.default)();
const port = 3000;
app.use(express_1.default.static(path_1.default.join(__dirname, "../src/public")));
app.use((0, cookie_parser_1.default)());
const conversationController = new converstation_controller_1.ConversationController();
app.get("/api/conversations", (req, res) => {
    conversationController.fetchConversations(req.query.chatUrl);
});
app.listen(port, () => {
    console.log({ route: path_1.default.join(__dirname, "../public") });
    console.log(`서버가 http://localhost:${port} 에서 실행 중입니다.`);
});
