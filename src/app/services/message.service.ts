import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { v1 as uuid } from "uuid";
import { Message, User } from "src/app/interfaces/chat.model";
import { UserService } from "./user.service";
import { MomentService } from "./moment.service";

@Injectable({
  providedIn: "root",
})
export class MessageService {
  user: User;
  constructor(private userService: UserService, private moment: MomentService) {
    this.user = this.userService.getCurrentUser();
  }
  messages: Message[] = [
    {
      authorId: `Samuel-${uuid()}`,
      content: "hello from Sam",
      conversationId: uuid(),
      createdAt: this.moment.getMoment(),
      id: uuid(),
      isDelivered: false,
    },
    {
      authorId: `Joel-${uuid()}`,
      content: "hello from Joel",
      conversationId: uuid(),
      createdAt: this.moment.getMoment(),
      id: uuid(),
      isDelivered: false,
    },
    {
      authorId: `Daniel-${uuid()}`,
      content: "Hi from Dan",
      conversationId: uuid(),
      createdAt: this.moment.getMoment(),
      id: uuid(),
      isDelivered: false,
    },
    {
      authorId: `Matt-${uuid()}`,
      content: "hello from Matt",
      conversationId: uuid(),
      createdAt: this.moment.getMoment(),
      id: uuid(),
      isDelivered: false,
    },
    {
      authorId: `Steve-${uuid()}`,
      content: "hello from Steve",
      conversationId: uuid(),
      createdAt: this.moment.getMoment(),
      id: uuid(),
      isDelivered: false,
    },
    {
      authorId: `Kevin-${uuid()}`,
      content: "hello from Kevin",
      conversationId: uuid(),
      createdAt: this.moment.getMoment(),
      id: uuid(),
      isDelivered: false,
    },
  ];

  currentConversationId: string;

  messages$: BehaviorSubject<Message[]> = new BehaviorSubject<Message[]>([]);

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
      isDelivered: false,
      createdAt: this.moment.getMoment(),
    };
    this.addMessage(newMessage);
    return newMessage;
  }
}
