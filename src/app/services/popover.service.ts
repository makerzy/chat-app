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
  async presentPopover(ev: any, popoverComponent) {
    this.currentPopover = popoverComponent;
    this.popover = await this.popoverController.create({
      component: this.currentPopover,
      cssClass: "my-custom-class",
      event: ev,
      translucent: true,
    });
    return await this.popover.present();
  }

  dismissPopover() {
    if (this.currentPopover) {
      this.popoverController.dismiss(this.data).then(() => {
        this.currentPopover = null;
      });
    }
  }

  async getPopoverResult() {
    return this.popover.onDidDismiss().then((result) => result);
  }
}
