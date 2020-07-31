import { Component, OnInit } from "@angular/core";
import {
  User,
  Conversation,
  SavedMessage,
} from "src/app/interfaces/chat.model";
import { UserService } from "src/app/services/user.service";
import { ConversationService } from "src/app/services/conversation.service";
import { Plugins } from "@capacitor/core";
import { AlertService } from "src/app/services/alert.service";
const { Clipboard } = Plugins;

@Component({
  selector: "app-message-view",
  templateUrl: "./saved-messages.component.html",
  styleUrls: ["./saved-messages.component.scss"],
})
export class SavedMessagesComponent implements OnInit {
  messages: SavedMessage[];
  _messages: SavedMessage[];
  user: User;
  constructor(
    private userService: UserService,
    private conversationService: ConversationService,
    private alrtService: AlertService
  ) {}
  ngOnInit() {
    this.getSavedMessages();

    this.user = this.userService.getCurrentUser();
  }

  getSavedMessages() {
    this.messages = this.conversationService.getSavedMessages();
    this._messages = this.messages;
  }

  retrieveFilteredList(messages: SavedMessage[]) {
    console.log(messages);
    if (messages !== null) {
      this._messages = messages;
    } else this._messages = this.messages;
  }

  deleteMessage(_id: string) {
    this.messages = this.conversationService.deleteFavorite(_id);
    this._messages = this.messages;
    console.log("Messages: ", this.messages);
  }

  copyMessage(msg: string) {
    Clipboard.write({
      string: msg,
    });
    this.alrtService.presentAlert("Success", "Message copied to clipboard!");
  }
}
