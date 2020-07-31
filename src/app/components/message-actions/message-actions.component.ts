import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { AlertController, PopoverController } from "@ionic/angular";
import { User, Message } from "src/app/interfaces/chat.model";
import { ConversationService } from "src/app/services/conversation.service";
import { ModalService } from "src/app/services/modal.service";
import { Plugins } from "@capacitor/core";
import { AlertService } from "src/app/services/alert.service";

const { Clipboard } = Plugins;

@Component({
  selector: "app-message-actions",
  templateUrl: "./message-actions.component.html",
  styleUrls: ["./message-actions.component.scss"],
})
export class MessageActionsComponent implements OnInit {
  @Input() reciever: User;
  @Input() users: User[];
  @Input() conversationId: string;
  @Input() messages: Message[];
  @Input() user: User;
  @Output() sendCopiedMessage: EventEmitter<string> = new EventEmitter();
  @Output() sendMessage: EventEmitter<any[]> = new EventEmitter();
  @Output() sendReplyMessage: EventEmitter<Message> = new EventEmitter();
  copied: boolean = false;
  displayParams: string[] = ["name", "type"];
  header: string = "Forward message to";
  constructor(
    private conversationService: ConversationService,
    private modalService: ModalService,
    private popover: PopoverController,
    private alrtController: AlertController,
    private alrtService: AlertService
  ) {}

  ngOnInit() {}

  replyMessage() {
    const message = this.messages[0];
    this.sendReplyMessage.emit(message);
    this.messages.forEach((msg) => (msg.isSelected = false));
    this.sendMessage.emit(this.messages);
  }

  remove() {
    this.conversationService.deleteMessages(this.messages, this.conversationId);
    this.messages.forEach((msg) => (msg.isSelected = false));
    this.sendMessage.emit(this.messages);
  }
  async deleteMessages() {
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
            this.remove();
          },
        },
      ],
    });
    await alert.present();
  }

  async forwardMessages() {
    console.log(this.user);
    await this.modalService
      .presentModal(this.users, this.displayParams, this.header, "none")
      .then((users: User[]) => {
        this.conversationService.sortMessages(this.messages);
        users.forEach(({ userId, conversations }) => {
          /* check if there is active conversation between users, if there's push messages to the conversation */
          let haveActiveConversation = conversations.find(({ memberIds }) =>
            memberIds.includes(this.user.userId)
          );

          if (haveActiveConversation) {
            this.messages.forEach(({ content }) => {
              console.log(content);
              this.conversationService.createMessage(
                content,
                haveActiveConversation.id
              );
            });
          }

          /* if there is no conversation, create new conversation and add messages */
          if (haveActiveConversation === undefined) {
            let _users = [this.user.userId, userId];
            let newConversation = this.conversationService.createNewConversation(
              _users
            );
            this.messages.forEach(({ content }) => {
              console.log(content);

              this.conversationService.createMessage(
                content,
                newConversation.id
              );
            });
          }
        });
      });
    this.messages.forEach((msg) => (msg.isSelected = false));
    this.sendMessage.emit(this.messages);
  }

  copyMessages() {
    this.copied = true;
    const messages = this.conversationService.copyMessages(this.messages);
    this.messages.forEach((msg) => (msg.isSelected = false));
    this.sendMessage.emit(this.messages);
    let message: string = "";
    messages.forEach(({ content }) => {
      message = message.concat(`${content} `);
      Clipboard.write({
        string: message,
      });
    });
    this.alrtService.presentAlert("", "Copied to clipboard!");
  }

  dismissPopover() {
    this.popover.dismiss();
  }
}
