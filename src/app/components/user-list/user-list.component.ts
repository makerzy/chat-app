import {
  Component,
  OnChanges,
  Input,
  Output,
  EventEmitter,
  OnInit,
} from "@angular/core";
import { UserService } from "src/app/services/user.service";
import { Observable } from "rxjs";
import { User } from "src/app/interfaces/chat.model";
import { send } from "process";

@Component({
  selector: "app-user-list",
  templateUrl: "./user-list.component.html",
  styleUrls: ["./user-list.component.scss"],
})
export class UserListComponent implements OnInit {
  users: Observable<User[]>;
  displayParams = ["name"];
  @Output() sendData: EventEmitter<User> = new EventEmitter();
  constructor(private userService: UserService) {}

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.users = this.userService.getAllUsers();
  }

  retrieveSearchSelection(user) {
    console.log(" User: ", user);
    this.sendData.emit(user);
  }

  async sendUser(user: User) {
    console.log(user);
    this.sendData.emit(user);
    // const user = await this.userService.getUserByUserId(id);
    // console.log("Userrr: ", user);
    // const _user = user[0];
    // this.sendData.emit(_user);
  }
}
