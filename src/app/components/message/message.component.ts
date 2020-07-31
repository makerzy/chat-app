import {
  Component,
  OnChanges,
  Input,
  OnInit,
  ViewChild,
  Output,
  EventEmitter,
  ElementRef,
  Directive,
} from "@angular/core";
import { UserService } from "../../services/user.service";
import { User, Message } from "src/app/interfaces/chat.model";
import { Observable } from "rxjs";
import { ConversationService } from "src/app/services/conversation.service";
import { MomentService } from "src/app/services/moment.service";

@Component({
  selector: "app-message",
  templateUrl: "./message.component.html",
  styleUrls: ["./message.component.scss"],
})
@Directive({
  selector: "[myScrollVanish]",
})
export class MessageComponent implements OnChanges, OnInit {
  @Input() conversationId: string;
  messages$: Observable<Message[]>;
  @ViewChild("content", { static: false }) myContent: ElementRef;
  user: User;
  @Input() select;
  selectedMessages: Message[] = [];
  scrollBottom: boolean = false;
  @Input() replyMessage: Message;
  @Output() sendSelectedMessages: EventEmitter<Message[]> = new EventEmitter();
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
  }

  setTime(date) {
    return this.moment.formatTimeDate(date);
  }
  /* 
  scrollTo() {
    let element;
    this.messages$.subscribe((msgs) =>
      msgs.find((msg) => (element = msg.id === this.replyMessage.id))
    );
    var rect = element.getBoundingClientRect();
    console.log(rect.top, rect.right, rect.bottom, rect.left);
  } */

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
