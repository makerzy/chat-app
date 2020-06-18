import { Component } from "@angular/core";
import { UserService } from "../services/user.service";
import { MessageService } from "../services/message.service";
import { Message, User, Conversation } from "../interfaces/chat.model";
import { ConversationService } from "../services/conversation.service";
import { Observable } from "rxjs";

@Component({
  selector: "app-chat",
  templateUrl: "./chat.page.html",
  styleUrls: ["./chat.page.scss"],
})
export class ChatPage {
  conversation: Conversation;
  userId: string;
  users: User[];
  currentUser: User;
  messages$: Observable<Message[]>;
  reciever: User;

  constructor(
    private userService: UserService,
    private msgService: MessageService,
    private conversationService: ConversationService
  ) {
    this.currentUser = this.userService.getCurrentUser();
  }

  async retrieveUserSelection(selectedUser: User) {
    this.reciever = selectedUser;
    const conversationUsers: string[] = [
      selectedUser.userId,
      this.currentUser.userId,
    ];

    const findConversation = await this.conversationService.getConversationByUserIds(
      conversationUsers
    );

    console.log("FIND CONVERSATION: ", findConversation);

    if (findConversation) return (this.conversation = findConversation);

    const createdConversation = this.conversationService.createNewConversation(
      conversationUsers
    );

    this.conversation = createdConversation;
    this.messages$ = await this.msgService.getMessagesByConversationId(
      this.conversation.id
    );

    return this.conversation;
  }

  retrieveMessageString(message: string) {
    const newMessage = this.conversationService.createMessage(
      message,
      this.conversation.id
    );
    this.conversation.messages.push(newMessage);
  }
}
