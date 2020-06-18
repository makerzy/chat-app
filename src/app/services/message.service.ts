import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { v1 as uuid } from "uuid";
import { Message, User } from "src/app/interfaces/chat.model";
import { UserService } from "./user.service";

@Injectable({
  providedIn: "root",
})
export class MessageService {
  user: User;

  messages: Message[] = [
    {
      authorId: `Samuel-${uuid()}`,
      content: "hello from Sam",
      conversationId: uuid(),
      createdAt: new Date(),
      id: uuid(),
      isSent: false,
    },
    {
      authorId: `Joel-${uuid()}`,
      content: "hello from Joel",
      conversationId: uuid(),
      createdAt: new Date(),
      id: uuid(),
      isSent: false,
    },
    {
      authorId: `Daniel-${uuid()}`,
      content: "Hi from Dan",
      conversationId: uuid(),
      createdAt: new Date(),
      id: uuid(),
      isSent: false,
    },
    {
      authorId: `Matt-${uuid()}`,
      content: "hello from Matt",
      conversationId: uuid(),
      createdAt: new Date(),
      id: uuid(),
      isSent: false,
    },
    {
      authorId: `Steve-${uuid()}`,
      content: "hello from Steve",
      conversationId: uuid(),
      createdAt: new Date(),
      id: uuid(),
      isSent: false,
    },
    {
      authorId: `Kevin-${uuid()}`,
      content: "hello from Kevin",
      conversationId: uuid(),
      createdAt: new Date(),
      id: uuid(),
      isSent: false,
    },
  ];

  currentConversationId: string;

  messages$: BehaviorSubject<Message[]> = new BehaviorSubject<Message[]>([]);

  constructor(private userService: UserService) {
    this.user = this.userService.getCurrentUser();
  }

  getMessageObservable(): Observable<Message[]> {
    return this.messages$;
  }

  getCurrentMessagesValue() {
    return this.messages$.value;
  }

  changeLocalMessages(messages: Message[]) {
    this.messages$.next(messages);
  }

  async getMessagesByConversationId(id: string) {
    const currentMessages = this.getCurrentMessagesValue() || [];
    if (id === this.currentConversationId && currentMessages.length > 0)
      return this.getMessageObservable();

    this.currentConversationId = id;
    const messages = this.messages.filter(({ conversationId }) => {
      id === conversationId;
    });

    this.changeLocalMessages(messages);

    return this.getMessageObservable();
  }

  addMessage(message: Message) {
    const currentMessages = this.getCurrentMessagesValue() || [];
    currentMessages.push(message);
    this.changeLocalMessages(currentMessages);
  }

  createMessage(messageString: string, conversationId: string) {
    const newMessage: Message = {
      id: uuid(),
      authorId: this.user.userId,
      content: messageString,
      conversationId,
      isSent: false,
      createdAt: new Date(),
    };
    this.addMessage(newMessage);
    return newMessage;
  }
}
