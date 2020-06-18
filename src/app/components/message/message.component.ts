import { Component, OnChanges, Input, OnInit } from "@angular/core";
import { MessageService } from "../../services/message.service";
import { UserService } from "../../services/user.service";
import { User, Message } from "src/app/interfaces/chat.model";
import { Observable } from "rxjs";

@Component({
  selector: "app-message",
  templateUrl: "./message.component.html",
  styleUrls: ["./message.component.scss"],
})
export class MessageComponent implements OnChanges, OnInit {
  @Input() conversationId: string;
  messages$: Observable<Message[]>;

  user: User;

  constructor(
    private msgService: MessageService,
    private userService: UserService
  ) {}

  ngOnInit() {}

  async ngOnChanges() {
    this.user = this.userService.getCurrentUser();

    this.getConversations();
  }

  async getConversations() {
    if (this.conversationId && !this.messages$) {
      this.messages$ = await this.msgService.getMessagesByConversationId(
        this.conversationId
      );
      console.log("Messages: ", this.messages$);
    }
  }
}
