import { Injectable } from "@angular/core";
import { Conversation, Message, User } from "../interfaces/chat.model";
import { v1 as uuid } from "uuid";
import { of, BehaviorSubject, Observable } from "rxjs";
import { UserService } from "./user.service";

@Injectable({
  providedIn: "root",
})
export class ConversationService {
  user: User;
  conversations: Conversation[] = [
    {
      createdAt: new Date(),
      id: uuid(),
      messages: [
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
      ],
      name: "",
      memberIds: [`Matt-${uuid()}`, `Daniel-${uuid()}`],
    },
    {
      createdAt: new Date(),
      id: uuid(),
      messages: [
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
      ],
      name: "",
      memberIds: [`Joel-${uuid()}`, `Samuel-${uuid()}`],
    },
    {
      createdAt: new Date(),
      id: uuid(),
      messages: [
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
      ],
      name: "",
      memberIds: [`Kevin-${uuid()}`, `Steve-${uuid()}`],
    },
  ];
  constructor(private userService: UserService) {
    this.user = userService.getCurrentUser();
  }
  currentConversationId: string;
  conversation$: BehaviorSubject<Conversation[]> = new BehaviorSubject<
    Conversation[]
  >([]);

  getConversationObservable(): Observable<Conversation[]> {
    return this.conversation$;
  }

  getCurrentConversationValue() {
    console.log(this.conversation$.value);
    return this.conversation$.value;
  }

  changeLocalConversation(conversation: Conversation[]) {
    this.conversation$.next(conversation);
  }

  async getConversationByConversationId(_id: string) {
    const currentMessages = this.getCurrentConversationValue() || [];
    if (_id === this.currentConversationId && currentMessages.length > 0)
      return this.getConversationObservable();

    this.currentConversationId = _id;
    const conversation = this.conversations.filter(({ id }) => {
      _id === id;
    });

    this.changeLocalConversation(conversation);

    return this.getConversationObservable();
  }

  getAllConversations() {
    const _conversations = [...this.conversations];
    return of(_conversations);
  }

  async getConversationByUserIds(users: string[]) {
    const findConversations = this.conversations.filter(({ memberIds }) =>
      memberIds.includes(users[0])
    );
    const filteredConversations = findConversations.filter(({ memberIds }) =>
      memberIds.includes(users[1])
    );
    return filteredConversations[0];
  }

  createNewConversation(users: string[]) {
    const newConversation: Conversation = {
      createdAt: new Date(),
      id: uuid(),
      messages: [],
      memberIds: [...users],
    };
    console.log(newConversation);
    this.addConversation(newConversation);
    return newConversation;
  }

  addConversation(conversation: Conversation) {
    const currentConversation = this.getCurrentConversationValue() || [];
    this.conversations.push(conversation);
    this.changeLocalConversation(currentConversation);
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
    this.addMessages(newMessage, conversationId);
    return newMessage;
  }

  addMessages(message: Message, _id: string) {
    const activeConversation = this.conversations.find(({ id }) => id === _id);
    activeConversation.messages.push(message);
  }
  /* getMessageByConversationId(id:string){
  
} */
  /*   getMessageObservable(): Observable<Message[]> {
      return this.messages$;
    }

    getCurrentMessagesValue() {
      return this.messages$.value;
    }

    changeLocalMessages(messages: Message[]) {
      this.messages$.next(messages);
    }

    addMessage(message: Message) {
      const currentMessages = this.getCurrentMessagesValue() || [];
      currentMessages.push(message);
      this.changeLocalMessages(currentMessages);
    } */
}
