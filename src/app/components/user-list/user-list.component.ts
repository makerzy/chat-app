import {
  Component,
  OnChanges,
  Input,
  Output,
  EventEmitter,
  OnInit,
  ViewChild,
  ChangeDetectorRef,
} from "@angular/core";
import { UserService } from "src/app/services/user.service";
import { User } from "src/app/interfaces/chat.model";
import { NavService } from "src/app/services/nav.service";
import { MomentService } from "src/app/services/moment.service";
import { MenuController } from "@ionic/angular";
import { FilterComponent } from "../filter/filter.component";

@Component({
  selector: "app-user-list",
  templateUrl: "./user-list.component.html",
  styleUrls: ["./user-list.component.scss"],
})
export class UserListComponent implements OnInit {
  _users: User[];
  _user: User;
  reciever: User;
  displayParams = ["name", "dob"];
  filteredUser: User[] = [];
  textInput: string;
  unreadMessagesCount: number = null;
  @ViewChild(FilterComponent) filterComponent;
  @Output() sendData: EventEmitter<User> = new EventEmitter();
  constructor(
    private userService: UserService,
    private navService: NavService,
    private moment: MomentService,
    public menuCtrl: MenuController,
    private cdref: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this._user = this.userService.getCurrentUser();
    this.getUsers();
  }

  getUsers() {
    this._users = this.userService.getAllUsers();
  }

  // ngAfterContentChecked() {

  // }
  retrieveFilteredList(users: User[]) {
    if (users) this.filteredUser = users;
    else this.filteredUser = [];
  }

  sendUser(user: User) {
    if (user) {
      this.navService.setRoot(`chat/${user.userId}`, { user });
      this.sendData.emit(user);
    }
    this.filterComponent.search = "";
  }

  setTime(date) {
    // this.getUnreadMessages();
    return this.moment.formatTimeDate(date);
  }
  getUser(user: User) {
    if (user) {
      this.navService.setRoot(`chat/${user.userId}`, { user });
      this.sendData.emit(user);
      this.filteredUser = [];
    }
  }

  getUnreadMessages() {
    this._user.conversations.forEach((conversation) => {
      this.unreadMessagesCount = conversation.unreadMessages.length;
    });
    console.log(this.unreadMessagesCount);
  }
}
