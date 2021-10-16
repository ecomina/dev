import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.css']
})
export class BaseComponent implements OnInit {

  public base_title: string;
  public base_carregando: Boolean = false;

  @Input() formulario: FormGroup;
  @Input() formularioArray: FormArray;


  public iconCheck(check: boolean) {
    return  (check) ? 'check_box' : 'check_box_outline_blank';
  }

  constructor() { }

  ngOnInit(): void {
  }

}
