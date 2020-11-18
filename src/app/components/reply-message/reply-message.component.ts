import { Component, Input, OnInit } from "@angular/core";
import { Message } from "src/app/interfaces/chat.model";

@Component({
  selector: "app-reply-message",
  templateUrl: "./reply-message.component.html",
  styleUrls: ["./reply-message.component.scss"],
})
export class ReplyMessageComponent implements OnInit {
  @Input() replyMessage: Message;
  constructor() {}

  ngOnInit() {}
}
