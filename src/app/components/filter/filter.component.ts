import { Component, Output, Input, EventEmitter } from "@angular/core";

export interface SearchData {
  list: any[];
  searchParams: string[];
  placeholder: string;
}

@Component({
  selector: "app-filter",
  templateUrl: "./filter.component.html",
  styleUrls: ["./filter.component.scss"],
})
export class FilterComponent {
  @Input() data: SearchData;
  @Output() sendData: EventEmitter<any[]> = new EventEmitter();

  search: string;

  constructor() {}

  filterList() {
    if (!this.search) return this.sendData.emit(null);
    if (!this.data.list || this.data.list.length === 0)
      return this.sendData.emit(null);
    if (!this.data.searchParams || this.data.searchParams.length === 0)
      return this.sendData.emit(null);
    const searchTerm = this.search.trim().toLowerCase();

    const filteredList = this.data.list.filter((item) => {
      let keepItem = false;
      this.data.searchParams.forEach((param) => {
        if (item[param] && item[param].toLowerCase().includes(searchTerm))
          keepItem = true;
      });
      return keepItem;
    });

    this.sendData.emit(filteredList);
  }
}
