import { Injectable } from "@angular/core";
import * as _moment from "moment";
const moment = _moment;
@Injectable({
  providedIn: "root",
})
export class MomentService {
  constructor() {}

  getToday(format: string) {
    return moment().format(format);
  }
  getMoment() {
    return moment();
  }
  getMinDate() {
    return moment().subtract(95, "years");
  }
  getMaxDate() {
    return moment().add(1, "years");
  }
  convertDateToISO(date: Date) {
    return moment(date).toISOString();
  }
  formatDate(date: Date) {
    return moment(date, "MM-DD-YYYY");
  }
  formatTime(date: Date) {
    return moment(date).format("h: mm A l");
  }

  formatTimeDate(date: Date) {
    return moment(date).format("h:mm A");
  }
}
