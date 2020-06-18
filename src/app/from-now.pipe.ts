import { Pipe, PipeTransform } from "@angular/core";
import * as _moment from "moment";
const moment = _moment;
@Pipe({
  name: "fromNow",
})
export class FromNowPipe implements PipeTransform {
  transform(value: any, ...args: any[]): string {
    return moment(value).fromNow();
  }
}
