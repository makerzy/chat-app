export interface Message {
  authorId: string;
  recieverId?: string;
  content: string;
  image?: string;
  video?: string;
  conversationId: string; //the id of the conversation the message belogs to
  createdAt: string;
  id: string; //message ID
  isDelivered: boolean;
  repliedMessage?: string;
  replyMessageId?: string;
  isSelected?: boolean;
  type?: MessageType;
}
export enum MessageType {
  "private",
  "public",
}

export interface messageInput {
  text: string;
  imgUrl: string;
  videoUrl?: string;
}
export interface MenuNavData {
  currentUser?: User;
  placeholder?: string;
  displayParams: string[];
  users?: User[];
  reciever?: User;
  select?: boolean;
  privateMsg?: boolean;
  conversation?: Conversation;
  selectedMessages?: Message[];
}

export interface Conversation {
  createdAt: string;
  id: string; //id for conversation
  memberIds?: string[];
  messages?: Message[];
  name?: string;
  unreadMessages?: Message[];
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
  profilePicture?: string;
}

export interface SavedMessage {
  id: string;
  topic: string;
  content: string;
}
