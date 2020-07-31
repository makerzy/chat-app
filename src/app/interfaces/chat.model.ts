export interface Message {
  authorId: string;
  recieverId?: string;
  content: string;
  conversationId: string; //the id of the conversation the message belogs to
  createdAt: Date;
  id: string; //message ID
  isSent: boolean;
  isSelected?: boolean;
}

export interface Conversation {
  createdAt: Date;
  id: string; //id for conversation
  memberIds?: string[];
  messages?: Message[];
  name?: string;
}
export interface User {
  type: string;
  userId: string;
  registered: boolean;
  username: string;
  connected: boolean;
  name: string;
  dob: string;
  conversations: Conversation[];
  savedMessages?: SavedMessage[];
}

export interface SavedMessage {
  id: string;
  topic: string;
  content: string;
}
