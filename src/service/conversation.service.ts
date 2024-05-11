import fs from "fs";
import { ChatMessage, Conversation } from "../model/conversation.interface";

export class ConversationService {
  private readonly apiUrl: string;

  constructor(apiUrl: string) {
    this.apiUrl = apiUrl;
  }

  async fetchConversations(): Promise<Conversation> {
    console.log({ url: this.apiUrl });
    const response = await fetch(this.apiUrl, { method: "GET" });
    const data = (await response.json()) as Conversation;

    return data;
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
