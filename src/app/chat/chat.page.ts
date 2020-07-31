import { Component, OnInit, ViewChild } from "@angular/core";
import { UserService } from "src/app/services/user.service";
import { Message, User, Conversation } from "src/app/interfaces/chat.model";
import { ConversationService } from "src/app/services/conversation.service";
import { Observable } from "rxjs";
import { ModalService } from "src/app/services/modal.service";
import { PopoverService } from "../services/popover.service";

import { MenuController } from "@ionic/angular";
import { NavService } from "../services/nav.service";
import { SavedMessagesComponent } from "../components/saved-messages/saved-messages.component";

@Component({
  selector: "app-chat",
  templateUrl: "./chat.page.html",
  styleUrls: ["./chat.page.scss"],
})
export class ChatPage implements OnInit {
  conversation: Conversation;
  userId: string;
  users: User[];
  currentUser: User;
  messages$: Observable<Message[]>;
  reciever: User;
  selectedMessages: Message[] = [];
  _message: string;
  replyMessage: Message;
  displayParams: string[] = ["name", "type"];
  placeholder: string = "Search user by name or dob";
  select: boolean = false;
  privateMsg: boolean = false;

  constructor(
    private userService: UserService,
    private conversationService: ConversationService,
    private modalService: ModalService,
    private popoverService: PopoverService,
    private mneuController: MenuController,
    private navService: NavService
  ) {
    this.currentUser = this.userService.getCurrentUser();
    this.users = this.userService.getAllUsers();
  }

  async ngOnInit() {
    this.retrieveUserSelection();
  }

  closeMenu() {
    this.mneuController.close(); //Add this method to your button click function
    console.log("clicked");
  }

  sendPrivate() {
    if (this.privateMsg === true) {
      this.privateMsg = false;
    } else this.privateMsg = true;
    this.closeMenu();
  }

  openPopOver() {
    this.popoverService.presentPopover("click", SavedMessagesComponent);
    this.closeMenu();
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
    this.closeMenu();
    console.log("SelectedMsgs: ", this.selectedMessages);
  }

  async searchUsers() {
    await this.modalService
      .presentModal(this.users, this.displayParams, this.placeholder, "none")
      .then((user) => {
        if (user) {
          this.reciever = user;
          this.conversation = this.conversationService.createNewConversation([
            this.currentUser.userId,
            this.reciever.userId,
          ]);
        }
      });
    this.mneuController.close();
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

  retrieveMessageString(message: string) {
    if (this.privateMsg) {
      this.conversationService.addPrivateMessage(this.conversation.id, message);
      this.reciever.conversations.forEach(({ messages }) =>
        console.log(messages)
      );
    } else
      this.conversationService.createMessage(message, this.conversation.id);
  }

  retrieveReplyMessages(message: Message) {
    this.replyMessage = message;
    console.log(this.replyMessage);
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

    console.log("Chattt: ", this.selectedMessages);
  }
}