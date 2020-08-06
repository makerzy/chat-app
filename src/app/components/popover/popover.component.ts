import { Component, OnInit } from "@angular/core";
import { AlertController } from "@ionic/angular";

import { Message } from "src/app/interfaces/chat.model";
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
    private alrtController: AlertController
  ) {}

  ngOnInit() {}
  async dismissPopover() {
    this.popoverService.dismissPopover();
    const result = await this.popoverService.getPopoverResult();
    const data: Message = { ...Object.values<Message>(result)[0] };
    console.log(data);
    this.message = [data];
  }

  async deleteMessage() {
    await this.dismissPopover();
    console.log("Message", this.message);
    const alert = await this.alrtController.create({
      cssClass: "my-custom-class",
      header: `Confirm`,
      message: "All the messages will be deleted forever!!!",
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          cssClass: "secondary",
          handler: (blah) => {
            console.log("Confirm Cancel: blah");
          },
        },
        {
          text: "Okay",
          handler: () => {
            console.log("Confirm Okay");

            this.conversastionService.deleteMessages(
              this.message,
              this.message[0].conversationId
            );
          },
        },
      ],
    });
    await alert.present();
  }

  public async replyMessage() {
    await this.dismissPopover();
  }
}
