import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { SaveMessageComponent } from "../components/save-message/save-message.component";
import { SavedMessagesComponent } from "../components/saved-messages/saved-messages.component";

import { ChatPage } from "./chat.page";

const routes: Routes = [
  {
    path: "",
    component: ChatPage,
  },
  {
    path: "favorites",
    component: SavedMessagesComponent,
  },
  {
    path: "save",
    component: SaveMessageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChatPageRoutingModule {}
