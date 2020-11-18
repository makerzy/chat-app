import { Injectable } from "@angular/core";
import { PopoverController } from "@ionic/angular";
@Injectable({
  providedIn: "root",
})
export class PopoverService {
  data: any;
  currentPopover: any = null;
  popover: any;
  constructor(public popoverController: PopoverController) {}

  assignData(_data: any) {
    this.data = _data;
  }
  async presentPopover(event: any, popoverComponent, componentProps?) {
    this.currentPopover = popoverComponent;
    this.popover = await this.popoverController.create({
      component: this.currentPopover,
      componentProps,
      mode: "ios",
      event,
      animated: true,
    });
    return await this.popover.present();
  }

  dismissPopover(data?) {
    data ? (this.data = data) : this.data;
    if (this.currentPopover) {
      return this.popoverController.dismiss(this.data).then(() => {
        this.currentPopover = null;
        this.data = null;
      });
    }
  }

  async getPopoverResult() {
    return this.popover.onDidDismiss().then((result) => result);
  }
}
