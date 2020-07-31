import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonCustomScrollbarModule } from "ion-custom-scrollbar";
import { UpdateConversationComponent } from "./update-conversation/update-conversation.component";
import { SaveMessageComponent } from "./save-message/save-message.component";
import { ConversationListComponent } from "./conversation-list/conversation-list.component";
import { SavedMessagesComponent } from "./saved-messages/saved-messages.component";
import { MessageInputComponent } from "./message-input/message-input.component";
import { MessageComponent } from "./message/message.component";
import { UserListComponent } from "./user-list/user-list.component";
import { MaterialModule } from "../material.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FromNowPipe } from "../from-now.pipe";
import { IonicModule, IonicRouteStrategy } from "@ionic/angular";
import { SearchComponent } from "./search/search.component";
import { TruncateTextPipe } from "../truncate-text.pipe";
import { MessageActionsComponent } from "./message-actions/message-actions.component";
import { RouteReuseStrategy } from "@angular/router";
import { Clipboard } from "@ionic-native/clipboard/ngx";
import { FilterComponent } from "./filter/filter.component";
import { MenuComponent } from "./menu/menu.component";

const components: any[] = [
  UpdateConversationComponent,
  SaveMessageComponent,
  ConversationListComponent,
  SavedMessagesComponent,
  MessageInputComponent,
  MessageComponent,
  UserListComponent,
  SearchComponent,
  MessageActionsComponent,
  FilterComponent,
  MenuComponent,
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
