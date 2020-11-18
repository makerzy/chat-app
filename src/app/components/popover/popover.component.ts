import { Component, OnInit } from "@angular/core";

import { Message } from "src/app/interfaces/chat.model";
import { AlertService } from "src/app/services/alert.service";
import { ConversationService } from "src/app/services/conversation.service";
import { PopoverService } from "src/app/services/popover.service";

export interface PopoverInput {
  header: string;
  item: string[];
}
@Component({
  selector: "app-popover",
  templateUrl: "./popover.component.html",
  styleUrls: ["./popover.component.scss"],
})
export class PopoverComponent implements OnInit {
  message: Message[];
  constructor(
    private popoverService: PopoverService,
    private conversastionService: ConversationService,
    private alrtService: AlertService
  ) {}

  ngOnInit() {}
  async dismissPopover() {
    this.popoverService.dismissPopover();
    const result = await this.popoverService.getPopoverResult();
    const data: Message = { ...Object.values<Message>(result)[0] };
    this.message = [data];
  }

  async deleteMessage() {
    await this.dismissPopover();
    const alertResult = await this.alrtService.presentAlertConfirm(
      `Confirm`,
      "All the messages will be deleted forever!!!"
    );
    if (alertResult === "continue") {
      this.conversastionService.deleteMessages(
        this.message,
        this.message[0].conversationId
      );
    } else return;
  }

  async replyMessage() {
    return await this.dismissPopover();
  }
}
