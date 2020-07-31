import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { Observable } from "rxjs";
import { Conversation, Message, User } from "src/app/interfaces/chat.model";
import { ConversationService } from "src/app/services/conversation.service";
import { UserService } from "src/app/services/user.service";

@Component({
  selector: "app-conversation-list",
  templateUrl: "./conversation-list.component.html",
  styleUrls: ["./conversation-list.component.scss"],
})
export class ConversationListComponent implements OnInit {
  conversations$: Conversation[];
  contentToDisplay: Message;
  user: User;
  messages$: Observable<Message[]>;
  users: User[];
  _user: string;
  @Output() sendUsers: EventEmitter<string[]> = new EventEmitter();
  @Output() sendConversationId: EventEmitter<string> = new EventEmitter();
  constructor(
    private conversationService: ConversationService,
    private userService: UserService
  ) {}

  async ngOnInit() {
    this._user = this.userService.getCurrentUser().userId;
    this.users = this.userService.getAllUsers();
  }
  getConversation(userId: string) {
    const users = [userId, this._user];
    this.sendUsers.emit(users);
  }

  getConverstionFromUsers(conversationId) {
    this.sendConversationId.emit(conversationId);
  }
}
