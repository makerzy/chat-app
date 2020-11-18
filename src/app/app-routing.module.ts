import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {
    path: "home",
    loadChildren: () =>
      import("./pages/home/home.module").then((m) => m.HomePageModule),
  },
  {
    path: "",
    redirectTo: "entry",
    pathMatch: "full",
  },
  {
    path: "chat/:id",
    loadChildren: () =>
      import("./pages/chat/chat.module").then((m) => m.ChatPageModule),
  },
  {
    path: "modal",
    loadChildren: () =>
      import("./pages/modal/modal.module").then((m) => m.ModalPageModule),
  },
  {
    path: "entry",
    loadChildren: () =>
      import("./pages/entry/entry.module").then((m) => m.EntryPageModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
