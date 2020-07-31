import { Injectable } from "@angular/core";
import { AlertController } from "@ionic/angular";

@Injectable({
  providedIn: "root",
})
export class AlertService {
  constructor(public alertController: AlertController) {}

  async presentAlert(header, message) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ["OK"],
    });
    await alert.present();
  }

  async presentAlertConfirm(header, message, func) {
    const alert = await this.alertController.create({
      cssClass: "my-custom-class",
      header,
      message,
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          cssClass: "secondary",
          handler: (blah) => {
            console.log("Confirm Cancel: blah");
          },
        },
        {
          text: "Okay",
          handler: () => {
            console.log("Confirm Okay");
            func;
          },
        },
      ],
    });
    await alert.present();
  }
}
