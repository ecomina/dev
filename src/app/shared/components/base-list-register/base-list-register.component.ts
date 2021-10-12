import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'app-base-list-register',
  templateUrl: './base-list-register.component.html',
  styleUrls: ['./base-list-register.component.css']
})
export class BaseListRegisterComponent extends BaseComponent implements OnInit {

  public base_carregando: Boolean = false;
  public base_list: any[] = [];

  constructor() { 
    super();
  }

  ngOnInit(): void {
  }

}
