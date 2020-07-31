import { Injectable } from "@angular/core";
import { NavController } from "@ionic/angular";

@Injectable({
  providedIn: "root",
})
export class NavService {
  data: any;

  constructor(public navCtrl: NavController) {}

  push(url: string, data?: any) {
    this.data = data;
    this.navCtrl.navigateForward("/" + url, this.data);
  }

  pop() {
    this.navCtrl.back();
  }

  setRoot(url: string, data?: any) {
    this.data = data;
    this.navCtrl.navigateRoot("/" + url);
  }

  get(key: string) {
    if (this.data) {
      console.log(this.data[key], this.data);
      return this.data[key];
    } else {
      return console.log("No Nav Data");
    }
  }

  set(key: string, data: any) {
    this.data[key] = data;
  }
}
