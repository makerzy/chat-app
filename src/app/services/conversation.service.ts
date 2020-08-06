import { Injectable } from "@angular/core";
import {
  Conversation,
  Message,
  User,
  SavedMessage,
} from "../interfaces/chat.model";
import { v1 as uuid } from "uuid";
import { of, BehaviorSubject, Observable } from "rxjs";
import { UserService } from "./user.service";
// import { Clipboard } from "@ionic-native/clipboard/ngx";
import { Plugins } from "@capacitor/core";
import { MomentService } from "./moment.service";
import { AlertService } from "./alert.service";

const { Clipboard } = Plugins;
@Injectable({
  providedIn: "root",
})
export class ConversationService {
  user: User;
  messages: any[] = [];
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
  conversations$: BehaviorSubject<Conversation[]> = new BehaviorSubject<
    Conversation[]
  >([]);

  getConversationObservable(): Observable<Conversation[]> {
    return this.conversations$;
  }

  getCurrentConversationValue() {
    return this.conversations$.value;
  }

  changeLocalConversation(conversation: Conversation[]) {
    return this.conversations$.next(conversation);
  }

  getAllConversations() {
    const _conversations = [...this.conversations];

    this.changeLocalConversation(_conversations);

    return this.getCurrentConversationValue();
  }

  async getConversationByUserIds(users: string[]) {
    const _conversations = this.getCurrentConversationValue() || [];
    const findConversations = _conversations.filter(({ memberIds }) =>
      memberIds.includes(users[0])
    );
    const filteredConversations = findConversations.filter(({ memberIds }) =>
      memberIds.includes(users[1])
    );

    return filteredConversations[0];
  }

  replyMessage(message: Message) {
    return message;
  }
  deleteMessages(messages: Message[], conversationId: string) {
    const _conversations = this.getCurrentConversationValue() || [];
    let filteredConversation = _conversations.find(
      ({ id }) => id === conversationId
    );

    let msgs = filteredConversation.messages;
    messages.forEach(({ isSelected, id }) => {
      isSelected = false;
      const messages = filteredConversation.messages.filter(
        (_msg) => _msg.id === id
      );

      messages.forEach((msg) => {
        let index = msgs.indexOf(msg);
        msgs.splice(index, 1);
      });
    });
  }

  sortMessages(messages: Message[]) {
    messages = messages.sort((a, b) => {
      let dateA = new Date(a.createdAt).getTime();
      let dateB = new Date(b.createdAt).getTime();
      return dateA > dateB ? 1 : -1;
    });
  }

  saveMessage(topic: string, content: string) {
    const newReuseable: SavedMessage = {
      id: uuid(),
      topic,
      content,
    };
    console.log(newReuseable);
    this.user.savedMessages.push(newReuseable);
  }

  getSavedMessages() {
    return [...this.user.savedMessages];
  }

  addPrivateMessage(_id: string, message: string) {
    const _conversations = this.getCurrentConversationValue() || [];
    let activeConversation: Conversation = _conversations.find(
      ({ id }) => id === _id
    );
    const newMessage: Message = {
      id: uuid(),
      authorId: this.user.userId,
      recieverId: this.user.userId,
      content: message,
      conversationId: activeConversation.id,
      isSent: false,
      createdAt: new Date(),
    };
    this.addMessages(newMessage, _id);
    const recieverId = activeConversation.memberIds
      .find((id) => id !== this.user.userId)
      .split("-")[0];
    console.log(recieverId);
    const reciever = this.userService.getUserByUserId(recieverId);
    let recieverMsg = reciever.conversations.find(
      ({ id }) => id === activeConversation.id
    ).messages;
    recieverMsg = recieverMsg.filter(({ id }) => id !== newMessage.id);
    console.log(recieverMsg);
  }

  copyMessages(messages: Message[]) {
    this.sortMessages(messages);

    messages.forEach(({ content }) => {
      this.messages.push({ content });
    });
    return this.messages;
  }

  deleteFavorite(_id: string) {
    this.user.savedMessages = this.user.savedMessages.filter(
      ({ id }) => id !== _id
    );

    console.log(this.user.savedMessages);
    return this.user.savedMessages;
  }

  createNewConversation(users: string[]) {
    const newConversation: Conversation = {
      createdAt: new Date(),
      id: uuid(),
      messages: [],
      memberIds: [...users],
    };
    this.addConversation(newConversation);
    return newConversation;
  }

  addConversation(conversation: Conversation) {
    const currentConversations = this.getCurrentConversationValue() || [];
    let member_1 = conversation.memberIds[0].split("-")[0];
    let member_2 = conversation.memberIds[1].split("-")[0];
    this.userService.getUserByUserId(member_1).conversations.push(conversation);
    this.userService.getUserByUserId(member_2).conversations.push(conversation);

    currentConversations.push(conversation);
  }

  async createMessage(messageString: string, conversationId: string) {
    const conversations = this.getCurrentConversationValue() || [];
    const currentConversation = conversations.find(
      (conversation) => conversation.id === conversationId
    );
    let index = currentConversation.memberIds.indexOf(
      currentConversation.memberIds.find(
        (userId) => userId !== this.user.userId
      )
    );
    const reciver = [...currentConversation.memberIds].splice(index, 1)[0];
    const newMessage: Message = {
      id: uuid(),
      authorId: this.user.userId,
      recieverId: reciver,
      content: messageString,
      conversationId,
      isSent: false,
      createdAt: new Date(),
    };
    this.addMessages(newMessage, conversationId);
    return newMessage;
  }

  addMessages(message: Message, _id: string) {
    const currentConversations = this.getCurrentConversationValue() || [];
    const activeConversation = currentConversations.find(
      ({ id }) => id === _id
    );
    activeConversation.messages.push(message);
  }

  getMessagesFormConversation(_id: string) {
    const currentConversation = this.getCurrentConversationValue() || [];
    const conversation = currentConversation.find(({ id }) => id === _id);
    return of(conversation.messages);
  }
  getLastMessageFormConversation(_id: string) {
    const currentConversation = this.getCurrentConversationValue() || [];
    const conversation = currentConversation.find(({ id }) => id === _id);
    return conversation.messages[conversation.messages.length - 1];
  }

  getConversationByConversationId(_id: string) {
    const currentConversation = this.getCurrentConversationValue() || [];
    if (_id === this.currentConversationId && currentConversation.length > 0)
      return this.getCurrentConversationValue();
    console.log("CurrentConversation: ", currentConversation, "Id", _id);
    this.currentConversationId = _id;
    const conversation = this.conversations.filter(({ id }) => {
      _id === id;
    });
    console.log(conversation);
    this.changeLocalConversation(conversation);

    return this.getCurrentConversationValue();
  }
}
