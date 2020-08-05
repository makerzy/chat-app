import { Component, OnInit } from "@angular/core";
import { AlertService } from "src/app/services/alert.service";
import { ZoomService } from "src/app/services/zoom.service";

@Component({
  selector: "app-zoom-login",
  templateUrl: "./zoom-login.component.html",
  styleUrls: ["./zoom-login.component.scss"],
  providers: [],
})
export class ZoomLoginComponent implements OnInit {
  userName: string;
  password: string;
  constructor(
    private zoomService: ZoomService,
    private alertService: AlertService
  ) {}

  ngOnInit() {}
  login() {
    console.log(this.password, this.userName);
    this.zoomService.zoomLogin(this.userName, this.password);
  }
}
