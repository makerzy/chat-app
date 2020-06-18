import { Component, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-message-input",
  templateUrl: "./message-input.component.html",
  styleUrls: ["./message-input.component.scss"],
})
export class MessageInputComponent {
  @Output() sendMessageString: EventEmitter<string> = new EventEmitter();

  message: string;

  constructor() {}

  sendMessage() {
    if (!this.message || this.message.trim().length === 0) return;
    this.sendMessageString.emit(this.message);
    this.message = "";
  }

  handleSubmit(event) {
    if (event.keyCode == 13) {
      this.sendMessage();
    }
  }
}
