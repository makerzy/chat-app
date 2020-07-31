import { Component, OnInit } from "@angular/core";
import { NavParams, ModalController } from "@ionic/angular";

@Component({
  selector: "app-modal",
  templateUrl: "./modal.page.html",
  styleUrls: ["./modal.page.scss"],
})
export class ModalPage implements OnInit {
  list: any[];
  displayParams: string[];
  placeholder?: string;
  header?: string;
  orderBy?: string;
  displayedList: any[];
  items: any[] = [];
  constructor(
    private navParams: NavParams,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {
    this.list = this.navParams.get("list");
    this.displayedList = this.list;
    this.displayParams = this.navParams.get("displayParams");
    this.header = this.navParams.get("header");
    this.placeholder = this.navParams.get("placeholder");
    this.orderBy = this.navParams.get("orderBy");
    console.log(this.list, this.displayParams);
  }

  selectItem(item: any) {
    this.items.push(item);
    this.modalCtrl.dismiss(this.items);
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }

  retrieveFilteredList(list: any[] | null) {
    if (!list) return (this.displayedList = this.list);
    this.displayedList = list;
  }
}
