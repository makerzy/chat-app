import { Injectable } from "@angular/core";
import { Storage } from "aws-amplify";
import { User } from "../interfaces/chat.model";

export interface fileKey {
  key: string;
}

export interface fileData {
  fileType: boolean;
  fileUrl: string;
}

@Injectable({
  providedIn: "root",
})
export class AwsStorageService {
  fileName: string;
  imgSrc;
  fileType: string;
  user: User;
  userId: string;
  fileKey: fileKey;
  constructor() {}

  async handleFileSelect(file) {
    const fileSize = file.size / 1024 / 1024;
    this.fileName = file.name.replace(/\s+/g, "");
    this.fileType = file.type;

    if (fileSize > 3) return;
    console.log("file: ", file);
    const reader = new FileReader();
    reader.onload = (e) => (this.imgSrc = reader.result);
    reader.readAsDataURL(file);
    this.fileKey = await this.saveFile(
      `${this.userId}-${this.fileName}`,
      file,
      this.fileType,
      "public"
    );
    return { imgSrc: this.imgSrc, fileKey: this.fileKey };
  }

  async saveFile(
    key: string,
    file: any,
    contentType: string,
    level: "public" | "protected" | "private"
  ) {
    try {
      const response = await Storage.put(key, file, {
        level,
        contentType,
      });
      return response as { key: string };
    } catch (e) {
      console.log("ERROR: ", e);
    }
  }

  async getFileUrl(path: string, level: "public" | "protected" | "private") {
    try {
      const url = await Storage.get(path, { level });
      return url;
    } catch (e) {
      console.log("ERROR: ", e);
    }
  }

  async deleteFile(path, level: "public" | "protected" | "private") {
    try {
      const response = await Storage.remove(path, { level });
      console.log(response);
    } catch (e) {
      console.log("ERROR: ", e);
    }
  }
}
