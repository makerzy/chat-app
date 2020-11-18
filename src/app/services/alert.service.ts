import { Injectable } from "@angular/core";
import { AlertController } from "@ionic/angular";

@Injectable({
  providedIn: "root",
})
export class AlertService {
  resolve: string;
  constructor(public alertController: AlertController) {}

  async presentAlert(header, message) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ["OK"],
    });
    await alert.present();
  }

  async presentAlertConfirm(header, message) {
    const alert = await this.alertController.create({
      cssClass: "my-custom-class",
      header,
      message,
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
        },
        {
          text: "Okay",
          role: "continue",
        },
      ],
    });
    await alert.present();
    const { role } = await alert.onDidDismiss();
    return role;
  }
}
