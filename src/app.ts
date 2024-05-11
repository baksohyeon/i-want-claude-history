import path from "path";
import express from "express";
import cookieParser from "cookie-parser";
import { ConversationController } from "./controller/converstation.controller";

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, "../src/public")));
app.use(cookieParser());
app.use(express.json());
const conversationController = new ConversationController();

app.get("/api/conversations", (req: express.Request, res: express.Response) => {
  conversationController.fetchConversations(
    req.query.chatUrl as string,
    req,
    res
  );
  console.log("ok");
});

app.listen(port, () => {
  console.log(`서버가 http://localhost:${port} 에서 실행 중입니다.`);
});
