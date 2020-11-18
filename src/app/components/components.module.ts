import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonCustomScrollbarModule } from "ion-custom-scrollbar";
import { UpdateConversationComponent } from "src/app/components/begin-conversation/begin-conversation.component";
import { SaveMessageComponent } from "src/app/components/save-message/save-message.component";
import { SavedMessagesComponent } from "src/app/components/saved-messages/saved-messages.component";
import { MessageInputComponent } from "src/app/components/message-input/message-input.component";
import { MessageComponent } from "src/app/components/message/message.component";
import { UserListComponent } from "src/app/components/user-list/user-list.component";
import { MaterialModule } from "src/app/material.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FromNowPipe } from "src/app/from-now.pipe";
import { IonicModule, IonicRouteStrategy } from "@ionic/angular";
import { TruncateTextPipe } from "src/app/truncate-text.pipe";
import { MessageActionsComponent } from "src/app/components/message-actions/message-actions.component";
import { RouteReuseStrategy } from "@angular/router";
import { Clipboard } from "@ionic-native/clipboard/ngx";
import { FilterComponent } from "src/app/components/filter/filter.component";
import { MenuComponent } from "src/app/components/menu/menu.component";
import { PopoverComponent } from "src/app/components/popover/popover.component";
import { ReplyMessageComponent } from "./reply-message/reply-message.component";
import { AuthComponent } from "./auth/auth.component";
import { S3UploadComponent } from './s3-file-upload/s3-file-upload.component';

const components: any[] = [
  UpdateConversationComponent,
  SaveMessageComponent,
  SavedMessagesComponent,
  MessageInputComponent,
  MessageComponent,
  UserListComponent,
  MessageActionsComponent,
  FilterComponent,
  MenuComponent,
  ReplyMessageComponent,
  PopoverComponent,
  AuthComponent,S3UploadComponent
];

@NgModule({
  declarations: [components, FromNowPipe, TruncateTextPipe],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    IonCustomScrollbarModule,
  ],
  providers: [
    Clipboard,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  ],
  exports: [FromNowPipe, components],
})
export class ComponentsModule {}
