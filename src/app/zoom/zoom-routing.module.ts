import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ZoomLoginComponent } from "../components/zoom-login/zoom-login.component";
import { ZoomComponent } from "../components/zoom/zoom.component";

import { ZoomPage } from "./zoom.page";

const routes: Routes = [
  {
    path: "",
    component: ZoomPage,
  },
  {
    path: "login",
    component: ZoomLoginComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ZoomPageRoutingModule {}
