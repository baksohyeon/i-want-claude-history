interface Attachment {
  // Attachment 타입 정의 (필요한 경우 추가)
}

interface File {
  // File 타입 정의 (필요한 경우 추가)
}

export interface ChatMessage {
  uuid: string;
  text: string;
  sender: "human" | "assistant";
  index: number;
  created_at: string;
  updated_at: string;
  attachments: Attachment[];
  files: File[];
  parent_message_uuid?: string;
}

export interface Conversation {
  uuid: string;
  name: string;
  summary: string;
  created_at: string;
  updated_at: string;
  current_leaf_message_uuid: string;
  chat_messages: ChatMessage[];
}
