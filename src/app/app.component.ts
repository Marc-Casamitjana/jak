import { Component } from "@angular/core";
import { trigger, transition, style, animate } from "@angular/animations";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  animations: [
    trigger("inOutAnimation", [
      transition(":enter", [
        style({ height: 0, opacity: 0 }),
        animate(".5s ease-out", style({ height: 300, opacity: 1 }))
      ]),
      transition(":leave", [
        style({ height: 300, opacity: 1 }),
        animate(".5s ease-in", style({ height: 0, opacity: 0 }))
      ])
    ])
  ]
})
export class AppComponent {
  isOpenModalLogin = false;
<<<<<<< HEAD
  name = "Angular";
=======
  name = 'Angular';
>>>>>>> ffb6a45387b70eb69397b26548223a379eb2ff02

  openLoginModal() {
    this.isOpenModalLogin = !this.isOpenModalLogin;
  }
<<<<<<< HEAD
=======

  closeLoginModal() {
    this.isOpenModalLogin = false;
  }
}

>>>>>>> ffb6a45387b70eb69397b26548223a379eb2ff02

  closeLoginModal() {
    this.isOpenModalLogin = false;
  }
}
