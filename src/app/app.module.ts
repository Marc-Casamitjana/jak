import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from "./app.component";
import { ChatComponent } from "./chat/chat.component";
import { RouterModule, Routes } from "@angular/router";
import { HttpClientModule } from '@angular/common/http';

const appRoutes: Routes = [
  { path: "room", component: ChatComponent },
  { path: "**", redirectTo: "/", pathMatch: "full" }
];

@NgModule({
  imports: [BrowserModule, FormsModule, RouterModule.forRoot(appRoutes),
  ReactiveFormsModule, HttpClientModule],
  declarations: [AppComponent, ChatComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
