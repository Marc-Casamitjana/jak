import { Component, OnInit, ViewChild, ElementRef, Renderer2, AfterViewInit, Input } from '@angular/core';
import { TimelineMax } from 'gsap';
import { FormGroup, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginModalComponent implements OnInit, AfterViewInit {
  @ViewChild('modalContainer', { static: false }) container: ElementRef<HTMLElement>;
  @Input() modalOpenEvent: Observable<void>;
  modal: any;
  animation: any;
  containerElement: any;
  isOpen: boolean;

  loginForm: FormGroup;

  constructor() { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      username: new FormControl(''),
      password: new FormControl('')
    })
    this.modalOpenEvent.subscribe(e => {
      this.openModal();
    })
  }
  
  ngAfterViewInit() {
  }

  openModal() {
    this.containerElement = this.container.nativeElement;
    this.createModalAnimation(this.containerElement);
    this.animation.play().timeScale(2)
  }


  createModalAnimation(container: any) {
    const content = container.querySelector(".modal-content");
    const dialog = container.querySelector(".modal-dialog");


    const point1 = this.createPoint(45, 45);
    const point2 = this.createPoint(55, 45);
    const point3 = this.createPoint(55, 55);
    const point4 = this.createPoint(45, 55);

    this.animation = new TimelineMax({
      paused: true
    })
      .to(point1, 0.3, {
        x: 15,
        y: 30,
        ease: Power4.easeIn
      }, 0)
      .to(point4, 0.3, {
        x: 5,
        y: 80,
        ease: Power2.easeIn
      }, "-=0.1")
      .to(point1, 0.3, {
        x: 0,
        y: 0,
        ease: Power3.easeIn
      })
      .to(point2, 0.3, {
        x: 100,
        y: 0,
        ease: Power2.easeIn
      }, "-=0.2")
      .to(point3, 0.3, {
        x: 100,
        y: 100,
        ease: Power2.easeIn
      })
      .to(point4, 0.3, {
        x: 0,
        y: 100,
        ease: Power2.easeIn
      }, "-=0.1")
      .to(container, 1, {
        autoAlpha: 1
      }, 0)
      .to(content, 1, {
        autoAlpha: 1
      });
  }

  close() {
    this.isOpen = false;
    this.animation.reverse().timeScale(2.5);
  }

  createPoint(x, y) {
    const polygon = this.containerElement.querySelector(".modal-polygon");
    const svg = this.containerElement.querySelector(".modal-svg");
    var point = polygon.points.appendItem(svg.createSVGPoint());
    point.x = x || 0;
    point.y = y || 0;
    return point;
  }
}