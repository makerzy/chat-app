import { Component } from "@angular/core";

import { Platform } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { UserService } from "./services/user.service";
import { Zoom } from "@ionic-native/zoom/ngx";
import { ZoomKeys } from "../environments/environment";

@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"],
})
export class AppComponent {
  /* SDK KEYS */

  sdkKey: string = ZoomKeys.SDK_KEY;
  sdkSecret: string = ZoomKeys.SDK_SECRET;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private userService: UserService,
    private zoomService: Zoom
  ) {
    this.initializeApp();
    // Initialize Zoom SDK, need to be called when app fired up.
    this.zoomService
      .initialize(this.sdkKey, this.sdkSecret)
      .then((success: any) => console.log(success))
      .catch((error: any) => console.log(error));
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.userService.getCurrentUser();
    });
  }
}
