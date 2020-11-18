import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { User } from "src/app/interfaces/chat.model";
import {
  AwsStorageService,
  fileData,
  fileKey,
} from "src/app/services/file-upload.service";
import { UserService } from "src/app/services/user.service";

@Component({
  selector: "app-s3-file-upload",
  templateUrl: "./s3-file-upload.component.html",
  styleUrls: ["./s3-file-upload.component.scss"],
})
export class S3UploadComponent implements OnInit {
  fileName: string;
  imgSrc;
  fileType: string;
  user: User;
  userId: string;
  fileKey: fileKey;
  @Output() sendContentType: EventEmitter<boolean> = new EventEmitter();

  constructor(
    private storageService: AwsStorageService,
    private userService: UserService
  ) {}
  ngOnInit() {
    this.user = this.userService.getCurrentUser();
    this.userId = this.user.userId;
  }

  async handleUpload() {
    const key: string = Object.values(this.fileKey)[0];
    const url = await this.storageService.getFileUrl(key, "public");
    console.log("Url: ", url);
    this.sendContentType.emit(false);
    this.imgSrc = null;
    console.log("file key: ", this.fileKey);
    return url as string;
  }

  async onFileSelected(file) {
    if (!file) return;
    this.sendContentType.emit(true);
    const data = await this.storageService.handleFileSelect(file);

    const { imgSrc, fileKey } = data;

    this.imgSrc = imgSrc;
    this.fileKey = fileKey;
    // const fileSize = file.size / 1024 / 1024;
    // this.fileName = file.name.replace(/\s+/g, "");
    // this.fileType = file.type;

    // if (fileSize > 3) return;
    // console.log("file: ", file);
    // const reader = new FileReader();
    // reader.onload = (e) => (this.imgSrc = reader.result);
    // reader.readAsDataURL(file);
    // this.fileKey = await this.storageService.saveFile(
    //   `${this.userId}-${this.fileName}`,
    //   file,
    //   this.fileType,
    //   "public"
    // );
  }
}
