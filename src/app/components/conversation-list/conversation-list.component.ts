import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { Conversation } from "src/app/interfaces/chat.model";
import { ConversationService } from "src/app/services/conversation.service";

@Component({
  selector: "app-conversation-list",
  templateUrl: "./conversation-list.component.html",
  styleUrls: ["./conversation-list.component.scss"],
})
export class ConversationListComponent implements OnInit {
  conversations: Observable<Conversation[]>;
  contentToDisplay: any[];
  sender: string;
  messages: any[];
  constructor(private conversationService: ConversationService) {}

  ngOnInit() {
    this.getConversations();
  }
  getConversations() {
    this.conversations = this.conversationService.getAllConversations();
    this.conversations.subscribe((msg) => (this.messages = [...msg]));
    this.contentToDisplay = this.messages.filter(({ message }) => message);
  }
}
