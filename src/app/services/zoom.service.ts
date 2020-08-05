import { Injectable } from "@angular/core";
import { Zoom } from "@ionic-native/zoom/ngx";

@Injectable({
  providedIn: "root",
})
export class ZoomService {
  /* Zoom Params */
  zoomToken: string;
  zoomAccessToken: string;
  userId: string;

  // Meeting Params
  meetingNumber: string = null;
  meetingPassword: string = "123456";
  displayName: string = "Samuel";
  language: string = "en-US";
  constructor(private zoomService: Zoom) {}

  /* Not needed */
  zoomLogin(userName: string, password: string) {
    if (this.zoomService.isLoggedIn()) return;
    else
      this.zoomService
        .login(userName, password)
        .then((success: any) => console.log(success))
        .catch((error: any) => console.log(error));
  }
  /* Not needed */
  zoomLogout() {
    // Log user out.
    this.zoomService
      .logout()
      .then((success: boolean) => console.log(success))
      .catch((error: any) => console.log(error));
  }

  options = {
    no_driving_mode: true,
    no_invite: true,
    no_meeting_end_message: true,
    no_titlebar: false,
    no_bottom_toolbar: false,
    no_dial_in_via_phone: true,
    no_dial_out_to_phone: true,
    no_disconnect_audio: true,
    no_share: true,
    no_audio: true,
    no_video: true,
    no_meeting_error_message: true,
  };

  // Join meeting.
  joinMeeting() {
    this.zoomService
      .joinMeeting(
        this.meetingNumber,
        this.meetingPassword,
        this.displayName,
        this.options
      )
      .then((success: any) => console.log(success))
      .catch((error: any) => console.log(error));
  }

  /* Start an existing meeting for non-login user. */
  /* I want this */
  startMeetingforNonLoginUser() {
    this.zoomService
      .startMeetingWithZAK(
        this.meetingNumber,
        this.displayName,
        this.zoomToken,
        this.zoomAccessToken,
        this.userId,
        this.options
      )
      .then((success: any) => console.log(success))
      .catch((error: any) => console.log(error));
  }

  // Start an existing meeting for logged in user.
  /* Not needed */
  startMeetingForLoginUser(vanityId) {
    this.zoomService
      .startMeeting(this.meetingNumber, vanityId)
      .then((success: any) => console.log(success))
      .catch((error: any) => console.log(error));
  }

  // Start an instant meeting for logged in user.
  /* I want this  */
  startInstantMeeting() {
    this.zoomService
      .startInstantMeeting(this.options)
      .then((success: any) => console.log(success))
      .catch((error: any) => console.log(error));
  }
  /* I want this */
  setLanguage() {
    this.zoomService
      .setLocale("en-US")
      .then((success: any) => console.log(success))
      .catch((error: any) => console.log(error));
  }
}
