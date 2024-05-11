import fs from "fs";
import { ChatMessage, Conversation } from "../model/conversation.interface";
import Anthropic from "@anthropic-ai/sdk";

export class ConversationService {
  private readonly apiUrl: string;

  constructor(apiUrl: string) {
    // this.apiUrl = apiUrl;
    this.apiUrl = "https://api.anthropic.com/v1/messages";
  }

  async fetchConversations(anthropic: Anthropic): Promise<Conversation> {
    try {
      console.log({ url: this.apiUrl });
      const response = await fetch(this.apiUrl, {
        method: "POST",
        headers: {
          "x-api-key": anthropic.apiKey ?? "",
          "anthropic-version": "2023-06-01",
          "content-type": "application/json",
        },
        body: JSON.stringify({
          max_tokens: 100,
          model: "claude-3-opus-20240229",
          system: "You are a helpful assistant.",
          messages: [
            { role: "user", content: "What is the weather in Seoul?" },
          ],
        }),
      });
      const data = (await response.json()) as Conversation;
      return data;
    } catch (error) {
      throw new Error("대화 조회에 실패했습니다. \n" + error);
    }
  }

  generateMarkdownFile(conversation: Conversation, fileName: string): void {
    let markdownText = `# ${conversation.name}\n\n`;

    conversation.chat_messages.forEach(
      (message: ChatMessage, index: number) => {
        markdownText += `## 메시지 ${index + 1}\n\n`;
        markdownText +=
          message.sender === "human"
            ? `> ${message.text}\n\n`
            : `${message.text}\n\n`;
      }
    );

    fs.writeFileSync(fileName, markdownText);
  }
}
