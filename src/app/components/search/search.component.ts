import {
  Component,
  OnChanges,
  Input,
  Output,
  EventEmitter,
  OnInit,
} from "@angular/core";
import { FormControl } from "@angular/forms";
import { Observable } from "rxjs";
import { map, startWith } from "rxjs/operators";

export interface MatAutoCompleteData {
  label: string;
  list: any[];
  selected: string | null;
  valueKey: string;
  textKey: string;
  clearSelection?: boolean;
  placeholder?: string;
}

@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.scss"],
})
export class SearchComponent implements OnChanges, OnInit {
  @Input() data: MatAutoCompleteData;
  @Output() sendData: EventEmitter<any> = new EventEmitter();

  myControl = new FormControl();
  filteredOptions: Observable<string[]>;
  textKey = "text";
  valueKey = "value";
  ngOnInit() {}
  ngOnChanges() {
    if (this.data && this.data.list) {
      if (this.data.textKey) this.textKey = this.data.textKey;
      if (this.data.valueKey) this.valueKey = this.data.valueKey;
      if (this.data.selected)
        this.myControl.setValue(
          this.data.list.find(
            (item) => item[this.valueKey] === this.data.selected
          )
        );
      this.filteredOptions = this.myControl.valueChanges.pipe(
        startWith(""),
        map((value) => {
          if (value)
            return typeof value === "string" ? value : value[this.textKey];
        }),
        map((text) => (text ? this._filter(text) : this.data.list.slice()))
      );
    }
  }

  displayFn(option): string {
    if (!option) return "";
    if (this.data && this.data.clearSelection) return "";
    return option && option[this.textKey] ? option[this.textKey] : "";
  }

  private _filter(searchText: string): any[] {
    searchText = searchText.toLowerCase();

    return this.data.list.filter((item) =>
      item[this.textKey].toLowerCase().includes(searchText)
    );
  }

  select(option) {
    console.log(option);
    this.sendData.emit(option);
    if (this.data.clearSelection) {
      this.myControl.patchValue(null);
    }
  }
}
