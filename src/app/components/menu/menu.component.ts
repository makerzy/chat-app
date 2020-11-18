import { Component, Input, OnInit } from "@angular/core";

import {
  Conversation,
  Message,
  User,
  MenuNavData,
} from "src/app/interfaces/chat.model";
import { ConversationService } from "src/app/services/conversation.service";
import { ModalService } from "src/app/services/modal.service";
import { NavService } from "src/app/services/nav.service";
import { PopoverService } from "src/app/services/popover.service";
import { UserService } from "src/app/services/user.service";

export interface MnuNavData {
  currentUser?: User;
  placeholder?: string;
  displayParams: string[];
  users?: User[];
  reciever?: User;
  select?: boolean;
  privateMsg?: boolean;
  conversation?: Conversation;
  selectedMessages?: Message[];
}
@Component({
  selector: "app-menu",
  templateUrl: "./menu.component.html",
  styleUrls: ["./menu.component.scss"],
})
export class MenuComponent implements OnInit {
  currentUser: User;
  placeholder: string = "Search user by dob or name";
  displayParams: string[];
  users: User[];
  reciever: User;
  select: boolean;
  privateMsg: boolean;
  @Input() conversation: Conversation;
  @Input() selectedMessages: Message[];
  data: MenuNavData;

  constructor(
    private userService: UserService,
    private nav: NavService,
    private popoverService: PopoverService
  ) {}

  ngOnInit() {
    this.currentUser = this.userService.getCurrentUser();
    console.log("ConnectedState: ", this.currentUser.connected);
  }

  goToFavorites() {
    this.nav.push(`/chat/${this.currentUser.userId}/favorites`);
    this.popoverService.dismissPopover();
  }

  goToSaveMessage() {
    this.nav.push(`/chat/${this.currentUser.userId}/save`);
    this.popoverService.dismissPopover();
  }
  handleSelect() {
    if (this.select) {
      this.select = false;
      this.popoverService.dismissPopover("deselect");
    } else {
      this.select = true;
      this.popoverService.dismissPopover("select");
    }
  }

  sendPrivate() {
    this.popoverService.dismissPopover("privateMessage");
  }
}
