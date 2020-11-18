import { Component, OnChanges, OnInit, ViewChild } from "@angular/core";
import { UserService } from "src/app/services/user.service";
import {
  Message,
  User,
  Conversation,
  MessageType,
  messageInput,
} from "src/app/interfaces/chat.model";
import { ConversationService } from "src/app/services/conversation.service";
import { Observable } from "rxjs";
import { NavService } from "../../services/nav.service";
import { MessageComponent } from "src/app/components/message/message.component";
import { MomentService } from "src/app/services/moment.service";
import { PopoverComponent } from "src/app/components/popover/popover.component";
import { PopoverService } from "src/app/services/popover.service";
import { MenuComponent } from "src/app/components/menu/menu.component";

@Component({
  selector: "app-chat",
  templateUrl: "./chat.page.html",
  styleUrls: ["./chat.page.scss"],
  providers: [PopoverComponent],
})
export class ChatPage implements OnInit, OnChanges {
  conversation: Conversation;
  userId: string;
  users: User[];
  currentUser: User;
  messages$: Observable<Message[]>;
  reciever: User;
  selectedMessages: Message[] = [];
  _message: string;
  replyMessage: Message;
  replyMessageContent: string;
  replyMessageTime: string;
  replyMessageAuthor: string;
  displayParams: string[] = ["name", "type"];
  placeholder: string = "Search user by name or dob";
  select: boolean = false;
  privateMsg: boolean = false;

  @ViewChild(MessageComponent) MsgComponent;

  constructor(
    private userService: UserService,
    private conversationService: ConversationService,
    private popoverServie: PopoverService,
    private navService: NavService,
    private moment: MomentService
  ) {
    this.currentUser = this.userService.getCurrentUser();
    this.users = this.userService.getAllUsers();
  }

  async ngOnInit() {
    this.retrieveUserSelection();
  }
  ngOnChanges() {}
  ionViewDidEnter() {
    this.isActive();
  }

  ionViewDidLeave() {
    this.currentUser.connected = false;
  }

  isActive() {
    if (this.currentUser) {
      this.currentUser.connected = true;
    }
  }

  sendPrivate() {
    if (this.privateMsg === true) {
      this.privateMsg = false;
    } else this.privateMsg = true;
    console.log("Send Private");
  }

  async openActions(event) {
    await this.popoverServie.presentPopover(event, MenuComponent);
    const action = await this.popoverServie.getPopoverResult();
    console.log("action: ", action);
    if (action.data === "select") return this.handleSelect();
    if (action.data === "privateMessage") return this.sendPrivate();
  }

  retrieveMessageLength(msg: any[]) {
    this.selectedMessages = msg;
    this.selectedMessages.forEach((_msg) => (_msg.isSelected = false));
    this.selectedMessages = [];
    this.select = false;
  }

  handleSelect() {
    if (this.select) {
      this.select = false;
    } else {
      this.select = true;
      this.selectedMessages.forEach((_msg) => (_msg.isSelected = false));
    }
  }

  async retrieveUserSelection() {
    const user = this.navService.get("user");
    if (user) {
      this.reciever = user;
      this.conversation = await this.conversationService.getConversationByUserIds(
        [this.reciever.userId, this.currentUser.userId]
      );
    } else {
      this.navService.setRoot("home");
      return;
    }
    if (this.reciever) {
      const conversationUsers: string[] = [
        this.reciever.userId,
        this.currentUser.userId,
      ];
      const findConversation = await this.conversationService.getConversationByUserIds(
        [...conversationUsers]
      );

      console.log("FIND CONVERSATION: ", findConversation);

      if (findConversation) return (this.conversation = findConversation);

      const createdConversation = this.conversationService.createNewConversation(
        conversationUsers
      );

      this.conversation = createdConversation;
      this.messages$ = this.conversationService.getMessagesFormConversation(
        this.conversation.id
      );

      return this.conversation;
    }
  }

  async retrieveMessageString(messageInput: messageInput) {
    let { text, imgUrl } = messageInput;

    console.log("text: ", text, "img: ", imgUrl);
    const newMessage = await this.conversationService.createMessage(
      text,
      this.conversation.id,
      imgUrl
    );

    if (this.privateMsg) {
      newMessage.type = MessageType.private;
    }
    this.conversationService.addMessages(newMessage, this.conversation.id);

    if (this.replyMessage) {
      newMessage.repliedMessage = this.replyMessage.content;
      newMessage.replyMessageId = this.replyMessage.id;
    }
    this.replyMessage = null;
    this.select = false;
    this.selectedMessages.forEach((msg) => (msg.isSelected = false));
    while (this.selectedMessages.length > 0) {
      this.selectedMessages.pop();
    }

    //Calling ChildComponent function from ParentComponent
    // SetTimeout to delay till the message is displayed
    setTimeout(() => this.MsgComponent.scrollToLastMessage(), 50);
  }

  retrieveReplyFromPopover(replyMsg: Message) {
    this.replyMessage = replyMsg;
    this.assignReply(this.replyMessage);
    console.log("Reply: ", replyMsg);
  }

  retrieveReplyMessages(message: Message) {
    this.replyMessage = message;
    console.log(this.replyMessage);
    if (this.replyMessage) {
      this.assignReply(this.replyMessage);
      console.log("ReplyContent: ", this.replyMessageContent);
    }
  }
  assignReply(message: Message) {
    if (message) {
      this.replyMessageContent = message.content;
      this.replyMessageAuthor = message.authorId;
      this.replyMessageTime = this.moment.formatTimeDate(message.createdAt);
    }
  }

  retrieveConversationId(conversationId: string) {
    const newConversation = this.conversationService.getConversationByConversationId(
      conversationId
    );
    console.log(newConversation);
  }

  async retrieveUsers(users: string[]) {
    this.conversation = await this.conversationService.getConversationByUserIds(
      users
    );
  }

  retrieveSelectedMessages(messages: Message[]) {
    console.log(messages);
    this.selectedMessages = messages;
  }
}
