import fs from "fs";
import { ChatMessage, Conversation } from "../model/conversation.interface";
import Anthropic from "@anthropic-ai/sdk";

export class ConversationService {
  private readonly apiUrl: string;

  constructor(apiUrl: string) {
    // this.apiUrl = apiUrl;
    this.apiUrl = "https://api.anthropic.com/v1/messages";
  }

  async fetchConversations(anthropic: Anthropic): Promise<any> {
    try {
      console.log({ url: this.apiUrl });

      //   console.log({ anthropicMessages: anthropic.messages });

      const test = await fetch(
        "https://claude.ai/api/organizations/메시지_식별자_statsig_때_정해지는듯/chat_conversations",
        {
          headers: {
            accept: "*/*",
            "accept-language": "en,en-US;q=0.9,ko;q=0.8",
            "anthropic-client-sha": "unknown",
            "anthropic-client-version": "unknown",
            baggage:
              "sentry-environment=production,sentry-release=asdf,sentry-public_key=asdf,sentry-trace_id=asdf",
            "content-type": "application/json",
            priority: "u=1, i",
            "sec-ch-ua":
              '"Chromium";v="124", "Microsoft Edge";v="124", "Not-A.Brand";v="99"',
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": '"macOS"',
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "sentry-trace": "asdf",
            cookie:
              "__ssid=asdf; __stripe_mid=asdf; lastActiveOrg=마지막에-들어간-메시지-식별자-쿠키에-저장; intercom-device-id-lupk8zyo=asdf; _gcl_au=asdf; _fbp=asdf; CH-prefers-color-scheme=light; sessionKey=apikey와-동일; cf_clearance=asdf; activitySessionId=현재-활성화된-채팅방-식별자를-세션아이디로-활용함; __stripe_sid=asdf; __cf_bm=asdf; _rdt_uuid=asdf; intercom-session-lupk8zyo=asdf",
            Referer: "https://claude.ai/chats",
            "Referrer-Policy": "strict-origin-when-cross-origin",
          },
          body: '{"uuid":"asdfasdf","name":"","model":"claude-3-sonnet-20240229"}',
          method: "POST",
        }
      );

      return console.log(
        JSON.stringify(
          "test: \n headers:" +
            test.headers.forEach((header) => console.log(header)) +
            "\n body: " +
            test.body?.getReader().read() +
            "\n " +
            test.status +
            test.statusText,
          null,
          4
        )
      );

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
