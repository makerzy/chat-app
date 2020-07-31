import {
  Component,
  OnChanges,
  Input,
  Output,
  EventEmitter,
  OnInit,
} from "@angular/core";
import { UserService } from "src/app/services/user.service";
import { User } from "src/app/interfaces/chat.model";
import { NavService } from "src/app/services/nav.service";

@Component({
  selector: "app-user-list",
  templateUrl: "./user-list.component.html",
  styleUrls: ["./user-list.component.scss"],
})
export class UserListComponent implements OnInit {
  _users: User[];
  _user: string;
  displayParams = ["name", "dob"];
  filteredUser: User[] = [];
  @Output() sendData: EventEmitter<User> = new EventEmitter();
  constructor(
    private userService: UserService,
    private navService: NavService
  ) {}

  ngOnInit() {
    this._user = this.userService.getCurrentUser().userId;
    this.getUsers();
  }

  getUsers() {
    this._users = this.userService.getAllUsers();
  }

  retrieveSearchSelection(user) {
    console.log(" User: ", user);
    if (user) {
      this.navService.push("chat", { user: user });
      this.sendData.emit(user);
    }
  }
  retrieveFilteredList(users: User[]) {
    console.log(users);
    if (users) this.filteredUser = users;
    else this.filteredUser = [];
  }

  sendUser(user: User) {
    console.log(user);
    this.navService.push("chat", { user: user });
    this.sendData.emit(user);
  }

  getUser(user: User) {
    console.log(user);
    this.navService.push("chat", { user: user });
    this.sendData.emit(user);
    this.filteredUser = [];
  }
}
