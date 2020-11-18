import { Injectable } from "@angular/core";

import {
  Conversation,
  Message,
  User,
  SavedMessage,
  MessageType,
} from "../interfaces/chat.model";
import { v1 as uuid } from "uuid";
import { of, BehaviorSubject, Observable } from "rxjs";
import { UserService } from "./user.service";
// import { Clipboard } from "@ionic-native/clipboard/ngx";
import { Plugins } from "@capacitor/core";
import { MomentService } from "./moment.service";

const { Clipboard } = Plugins;
@Injectable({
  providedIn: "root",
})
export class ConversationService {
  user: User;
  messages: any[] = [];
  conversations: Conversation[] = [
    /*  */
  ];
  constructor(private userService: UserService, private moment: MomentService) {
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
      return -a.createdAt.localeCompare(b.createdAt);
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
      createdAt: this.moment.getMoment(),
      id: uuid(),
      messages: [],
      memberIds: [...users],
      unreadMessages: [],
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

  getCurrentConversation(conversationId: string) {
    const conversations = this.getCurrentConversationValue() || [];
    return conversations.find(
      (conversation) => conversation.id === conversationId
    );
  }

  getRecieverIdByConversationId(conversationId: string) {
    const activeConversation = this.getCurrentConversation(conversationId);
    return activeConversation.memberIds.find((id) => id !== this.user.userId);
  }

  getCurrentReciever(conversationId: string) {
    const recieverId = this.getRecieverIdByConversationId(conversationId);
    return this.userService.getUserByUserId(recieverId);
  }
  async createMessage(
    text: string,
    conversationId: string,
    image?: string,
    video?: string
  ) {
    const reciver = this.getRecieverIdByConversationId(conversationId);
    const newMessage: Message = {
      id: uuid(),
      authorId: this.user.userId,
      recieverId: reciver,
      content: text,
      image,
      video,
      conversationId,
      isDelivered: false,
      type: MessageType.public,
      createdAt: this.moment.getMoment(),
    };
    console.log("New Msg: ", newMessage);
    return newMessage;
  }

  addMessages(message: Message, _id: string) {
    const activeConversation = this.getCurrentConversation(_id);
    activeConversation.messages.push(message);
    const reciever = this.getCurrentReciever(_id);
    activeConversation.unreadMessages = [
      ...activeConversation.messages.filter((message) => !message.isDelivered),
    ];
    if (reciever.connected) {
      activeConversation.messages.forEach(
        (message) => (message.isDelivered = true)
      );
      activeConversation.unreadMessages = [];
    }
    console.log("Unread: ", activeConversation);
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
