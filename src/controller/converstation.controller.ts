import { ConversationService } from "../service/conversation.service";
import { Conversation } from "../model/conversation.interface";

export class ConversationController {
  private conversationService: ConversationService;

  constructor() {
    this.conversationService = new ConversationService("");
  }

  async fetchConversations(chatUrl: string): Promise<Conversation> {
    console.log("hello??");

    const conversationId = chatUrl.split("/").pop();
    if (!conversationId) {
      throw new Error("대화 ID를 추출할 수 없습니다.");
    }

    this.conversationService = new ConversationService(chatUrl);
    console.log(chatUrl);
    const conversations = await this.conversationService.fetchConversations();
    console.log({ conversations });
    return conversations;
  }

  generateMarkdownFile(conversation: Conversation, fileName: string): void {
    this.conversationService.generateMarkdownFile(conversation, fileName);
  }
}
