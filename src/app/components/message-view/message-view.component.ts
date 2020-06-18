import {
  Component,
  OnChanges,
  Input,
  ViewChild,
  ElementRef,
} from "@angular/core";
import { Message, User, Conversation } from "src/app/interfaces/chat.model";
import { v4 as uuid } from "uuid";

@Component({
  selector: "app-message-view",
  templateUrl: "./message-view.component.html",
  styleUrls: ["./message-view.component.scss"],
})
export class MessageViewComponent implements OnChanges {
  @Input() reciever: User;
  @Input() conversation: Conversation;
  conversationId: string;
  constructor() {}
  @ViewChild("scroller") private scrollContainer: ElementRef;
  ngOnChanges() {
    this.getConversationId();
  }

  scrollToBottom() {
    try {
      this.scrollContainer.nativeElement.scrollTop = this.scrollContainer.nativeElement.scrollHeight;
    } catch (error) {
      console.log(error);
    }
  }

  getConversationId() {
    if (this.conversation) this.conversationId = this.conversation.id;
    console.log("Conversation: ", this.conversation);
  }
}
