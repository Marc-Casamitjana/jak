import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PrivatesService } from './privates.service';

@Component({
  selector: 'app-privates',
  templateUrl: './privates.component.html',
  styleUrls: ['./privates.component.scss']
})
export class PrivatesComponent implements OnInit {
  constructor(private privateService: PrivatesService) { }

  setListener(listener) {
    this.privateService.connect();
  }

  ngOnInit() {

  }

  
}
