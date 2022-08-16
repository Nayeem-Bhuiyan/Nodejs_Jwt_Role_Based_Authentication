import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "./auth-helper/guard/auth.guard";
import { AdminComponent } from "./components/admin/admin.component";
import { FileUploadComponent } from "./components/file-upload/file-upload.component";
import { FogotPasswordComponent } from "./components/fogot-password/fogot-password.component";
import { HomeComponent } from "./components/home/home.component";
import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./components/register/register.component";
import { UserComponent } from "./components/user/user.component";


const routes: Routes = [
  { path: "", component: HomeComponent},
  { path: "home", component: HomeComponent},
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: "forgot-password", component: FogotPasswordComponent },
  { path: "file-upload", component: FileUploadComponent,canActivate: [AuthGuard]},
  {
    path: "adminDashboard",
    component: AdminComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "userDashboard",
    component: UserComponent,
    canActivate: [AuthGuard],
  },
  { path: "**", redirectTo: "home", pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
