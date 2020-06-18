import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { UpdateConversationComponent } from "./update-conversation/update-conversation.component";
import { CreateConversationComponent } from "./create-conversation/create-conversation.component";
import { ConversationListComponent } from "./conversation-list/conversation-list.component";
import { MessageViewComponent } from "./message-view/message-view.component";
import { MessageInputComponent } from "./message-input/message-input.component";
import { MessageComponent } from "./message/message.component";
import { UserListComponent } from "./user-list/user-list.component";
import { MaterialModule } from "../material.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FromNowPipe } from "../from-now.pipe";
import { IonicModule } from "@ionic/angular";
import { SearchComponent } from "./search/search.component";
import { TruncateTextPipe } from "../truncate-text.pipe";

@NgModule({
  declarations: [
    UpdateConversationComponent,
    CreateConversationComponent,
    ConversationListComponent,
    MessageViewComponent,
    MessageInputComponent,
    MessageComponent,
    UserListComponent,
    FromNowPipe,
    SearchComponent,
    TruncateTextPipe,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
  ],
  exports: [
    MessageInputComponent,
    MessageViewComponent,
    ConversationListComponent,
    FromNowPipe,

    MessageComponent,
    UserListComponent,
    MaterialModule,
    SearchComponent,
  ],
})
export class ComponentsModule {}
