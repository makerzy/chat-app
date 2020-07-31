import { Component, Input, OnInit } from "@angular/core";
import { PopoverController } from "@ionic/angular";
import { SavedMessage } from "src/app/interfaces/chat.model";
import { AlertService } from "src/app/services/alert.service";
import { ConversationService } from "src/app/services/conversation.service";

@Component({
  selector: "app-save-message",
  templateUrl: "./save-message.component.html",
  styleUrls: ["./save-message.component.scss"],
})
export class SaveMessageComponent implements OnInit {
  saveMessage: SavedMessage = {
    id: "",
    topic: "",
    content: "",
  };
  constructor(
    private conversationService: ConversationService,
    private alrtService: AlertService
  ) {}

  ngOnInit() {}

  addMessage() {
    if (this.saveMessage.topic === "" || this.saveMessage.content === "") {
      return;
    } else
      this.conversationService.saveMessage(
        this.saveMessage.topic,
        this.saveMessage.content
      );
    this.alrtService.presentAlert(
      this.saveMessage.topic,
      "message saved to favorites"
    );
    this.saveMessage.topic = "";
    this.saveMessage.content = "";
  }

  /*  dismissPopover() {
    this.popover.dismiss();
  } */
}
