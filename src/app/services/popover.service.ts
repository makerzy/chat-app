import { ComponentType } from "@angular/cdk/portal";
import { Injectable } from "@angular/core";
import { PopoverController } from "@ionic/angular";
import { PopoverComponent } from "../components/popover/popover.component";
@Injectable({
  providedIn: "root",
})
export class PopoverService {
  constructor(public popoverController: PopoverController) {}

  async presentPopover(ev: any, popoverComponent) {
    const popover = await this.popoverController.create({
      component: popoverComponent,
      cssClass: "my-custom-class",
      event: ev,
      translucent: true,
    });
    return await popover.present();
  }
}
