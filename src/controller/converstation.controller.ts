import { ConversationService } from "../service/conversation.service";
import { Conversation } from "../model/conversation.interface";
import Anthropic from "@anthropic-ai/sdk";
import { Request, Response } from "express";
import fs from "fs";

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
    this.conversationService = new ConversationService(chatUrl);
    const anthropic = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    });

    if (anthropic) {
      console.log(`anthropic is initiallized`);
      console.table(anthropic);
    }

    // try {
    //   console.debug("line 41");
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

    const conversationId = chatUrl.split("/").pop();
    if (!conversationId) {
      throw new Error("대화 ID를 추출할 수 없습니다.");
    }

    console.log(chatUrl);
    const conversations = await this.conversationService.fetchConversations(
      anthropic
    );
    console.log({ conversations });
    return conversations;
    // return "test";
  }

  generateMarkdownFile(conversation: Conversation, fileName: string): void {
    this.conversationService.generateMarkdownFile(conversation, fileName);
  }
}
