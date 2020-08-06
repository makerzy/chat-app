import {
  Component,
  OnChanges,
  Input,
  OnInit,
  Output,
  EventEmitter,
  ChangeDetectorRef,
} from "@angular/core";
import { UserService } from "../../services/user.service";
import { User, Message, Conversation } from "src/app/interfaces/chat.model";
import { Observable } from "rxjs";
import { ConversationService } from "src/app/services/conversation.service";
import { MomentService } from "src/app/services/moment.service";

@Component({
  selector: "app-message",
  templateUrl: "./message.component.html",
  styleUrls: ["./message.component.scss"],
})
export class MessageComponent implements OnChanges, OnInit {
  @Input() conversationId: string;
  messages$: Observable<Message[]>;
  showReply: boolean = false;
  user: User;
  @Input() reciever: User;
  @Input() select;
  selectedMessages: Message[] = [];
  @Input() replyMessageTime: string;
  @Input() replyMessage: Message;
  @Input() replyMessageAuthor: string;
  @Input() replyMessageContent: string;
  @Output() sendSelectedMessages: EventEmitter<Message[]> = new EventEmitter();
  activeConversation: Conversation;
  constructor(
    private userService: UserService,
    private conversationService: ConversationService,
    private moment: MomentService
  ) {}

  ngOnInit() {}

  ngOnChanges() {
    this.user = this.userService.getCurrentUser();
    this.messages$ = this.conversationService.getMessagesFormConversation(
      this.conversationId
    );
    this.isSent();
  }

  ionViewDidLeave() {
    console.log(this.activeConversation);
  }

  isSent() {
    this.activeConversation = this.reciever.conversations.find(
      ({ id }) => id === this.conversationId
    );
    if (this.reciever.connected) {
      this.activeConversation.messages.forEach((msg) => (msg.isSent = true));
    }
  }

  setTime(date) {
    return this.moment.formatTimeDate(date);
  }

  scrollToRepliedMessage(id: string) {
    const element: HTMLElement = document.getElementById(id);
    element.scrollIntoView({ behavior: "smooth" });
    element.setAttribute("style", "background: #ddd; color:#000");
    setTimeout(() => element.removeAttribute("style"), 3000);
  }

  scrollToLastMessage() {
    const lastMessage = this.conversationService.getLastMessageFormConversation(
      this.conversationId
    );
    if (this.replyMessageContent) {
      this.showReply = true;
    }

    if (lastMessage) {
      const element: HTMLElement = document.getElementById(lastMessage.id);
      element.scrollIntoView({ behavior: "auto" });
    }
  }

  getSelected(msg: Message) {
    if (msg.isSelected) {
      msg.isSelected = false;
    } else msg.isSelected = true;
    this.selectedMessages = [...this.selectedMessages, msg];
    console.log(this.selectedMessages);
    this.sendSelectedMessages.emit(this.selectedMessages);
  }

  messageActions(message: Message) {
    if (!message.isSelected) {
      message.isSelected = true;
      this.selectedMessages.push(message);
    } else if (message.isSelected) {
      message.isSelected = false;
      this.selectedMessages = this.selectedMessages.filter(
        ({ id }) => id !== message.id
      );
    }
    this.selectedMessages = this.selectedMessages.filter(
      (message) => message.isSelected
    );
    this.sendSelectedMessages.emit(this.selectedMessages);
    console.log(this.selectedMessages);
  }
}
