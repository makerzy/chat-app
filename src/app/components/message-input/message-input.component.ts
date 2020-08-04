import {
  Component,
  Output,
  EventEmitter,
  Input,
  OnChanges,
  SimpleChanges,
} from "@angular/core";
import { Message } from "src/app/interfaces/chat.model";

@Component({
  selector: "app-message-input",
  templateUrl: "./message-input.component.html",
  styleUrls: ["./message-input.component.scss"],
})
export class MessageInputComponent implements OnChanges {
  @Output() sendMessageString: EventEmitter<string> = new EventEmitter();
  @Input() _message: string;
  message: string;
  available: boolean = false;
  @Input() replyMessage: Message;
  constructor() {}

  /* Check for changes */
  /* https://stackoverflow.com/questions/41728043/detect-when-input-value-changed-in-directive */
  ngOnChanges(changes: SimpleChanges) {
    if (changes._message && this._message !== undefined) {
      this.available = true;
    }
  }

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
