import { ConversationService } from "../service/conversation.service";
import { Conversation } from "../model/conversation.interface";
import Anthropic from "@anthropic-ai/sdk";
import { Request, Response } from "express";
require("dotenv").config();

export class ConversationController {
  private conversationService: ConversationService;

  constructor() {
    this.conversationService = new ConversationService("");
  }

  async fetchConversations(
    chatUrl: string,
    request: Request,
    response: Response
  ): Promise<any> {
    console.log({ key: process.env.ANTHROPIC_API_KEY });
    const anthropic = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    });

    // BadRequestError: 400 {"type":"error","error":{"type":"invalid_request_error","message":"Your credit balance is too low to access the Claude API. Please go to Plans & Billing to upgrade or purchase credits."}}
    try {
      const msg = await anthropic.messages
        .stream({
          model: "claude-3-opus-20240229",
          max_tokens: 1024,
          system: "task",
          messages: [{ role: "user", content: "task" }],
        })
        .on("finalMessage", (message) => {
          console.log(message);
        });

      return "msg";
    } catch (e) {
      console.log(e);
    }

    // try {
    //   if ("content" in response && Array.isArray(response["content"])) {
    //     // 각 TextBlock에서 텍스트 추출
    //     const formattedOutput: string = response["content"]
    //       .filter((textBlock: any) => "text" in textBlock)
    //       .map((textBlock: any) => textBlock["text"])
    //       .join("\n");
    //     // 포맷된 출력을 텍스트 파일에 작성

    //     fs.writeFileSync("output.txt", formattedOutput);
    //     console.log("Output has been successfully saved to 'output.txt'.");
    //   } else {
    //     console.log(
    //       "Response content is not in the expected list format:",
    //       response
    //     );
    //   }
    // } catch (e: any) {
    //   console.log("An error occurred:", e.message);
    // }

    // const conversationId = chatUrl.split("/").pop();
    // if (!conversationId) {
    //   throw new Error("대화 ID를 추출할 수 없습니다.");
    // }
    // console.log(msg);

    // this.conversationService = new ConversationService(chatUrl);
    // console.log(chatUrl);
    // const conversations = await this.conversationService.fetchConversations();
    // console.log({ conversations });
    // return conversations;
    return "test";
  }

  generateMarkdownFile(conversation: Conversation, fileName: string): void {
    this.conversationService.generateMarkdownFile(conversation, fileName);
  }
}
