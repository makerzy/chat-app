import { Component, OnInit } from "@angular/core";
import { User } from "src/app/interfaces/chat.model";
import { UserService } from "src/app/services/user.service";

@Component({
  selector: "app-menu",
  templateUrl: "./menu.component.html",
  styleUrls: ["./menu.component.scss"],
})
export class MenuComponent implements OnInit {
  user: User;
  constructor(private userService: UserService) {}

  ngOnInit() {
    this.user = this.userService.getCurrentUser();
    console.log(this.user.savedMessages.length);
  }
}
