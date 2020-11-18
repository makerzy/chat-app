import {
  Component,
  Output,
  EventEmitter,
  Input,
  OnChanges,
  NgZone,
  ViewChild,
  SimpleChanges,
} from "@angular/core";
import { CdkTextareaAutosize } from "@angular/cdk/text-field";
import { take } from "rxjs/operators";
import { Message, messageInput } from "src/app/interfaces/chat.model";
import { S3UploadComponent } from "src/app/components/s3-file-upload/s3-file-upload.component";

@Component({
  selector: "app-message-input",
  templateUrl: "./message-input.component.html",
  styleUrls: ["./message-input.component.scss"],
})
export class MessageInputComponent implements OnChanges {
  @Output() sendMessageString: EventEmitter<messageInput> = new EventEmitter();
  @Output() sendUrlString: EventEmitter<string> = new EventEmitter();
  @Input() _message: string;
  message: string;
  available: boolean = false;
  @Input() replyMessage: Message;
  file: any;
  imgUrl: string;
  urlString: string;
  contentType;
  @ViewChild("autosize") autosize: CdkTextareaAutosize;
  @ViewChild(S3UploadComponent) private s3UploadComponent: S3UploadComponent;
  fileType: boolean = false;

  constructor(private _ngZone: NgZone) {}

  /* Check for changes */
  /* https://stackoverflow.com/questions/41728043/detect-when-input-value-changed-in-directive */
  ngOnChanges(changes: SimpleChanges) {
    if (changes._message && this._message !== undefined) {
      this.available = true;
    }
  }

  triggerResize() {
    // Wait for changes to be applied, then trigger textarea resize.
    this._ngZone.onStable
      .pipe(take(1))
      .subscribe(() => this.autosize.resizeToFitContent(true));
  }

  async sendMessage() {
    if (this.fileType && this.message !== "") {
      this.sendMessageString.emit({
        text: this.message,
        imgUrl: await this.s3UploadComponent.handleUpload(),
      });
      this.message = "";
      this.fileType = false;
      return;
    }
    if (this.fileType && this.message === "") {
      this.urlString = await this.s3UploadComponent.handleUpload();
      console.log("UrlString: ", this.urlString);
      this.sendMessageString.emit({
        text: "",
        imgUrl: this.urlString,
      });
      this.message = "";
      this.fileType = false;
      return;
    }
    if (!this.fileType && this.message.trim().length) {
      this.sendMessageString.emit({ text: this.message, imgUrl: "" });
      this.message = "";
      this.fileType = false;
      return;
    }
    if (!this.message || (this.message.trim().length === 0 && !this.fileType))
      return;
  }
  retrieveContentType(event) {
    this.fileType = event;
    console.log(this.fileType);
  }
  handleSubmit(event) {
    if (event.keyCode == 13) {
      this.sendMessage();
    }
  }

  handleUpload() {
    const upload = document.getElementById("upload");
    upload.click();
  }

  onFileSelected(event) {
    const {
      target: { files },
    } = event;
    this.file = files[0];
    this.s3UploadComponent.onFileSelected(this.file);
    event.target.value = null;
  }
}
