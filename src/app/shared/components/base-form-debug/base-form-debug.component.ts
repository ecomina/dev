import { Component, Input, OnInit } from '@angular/core';
import { environment } from '@environments/environment';

@Component({
  selector: 'app-base-form-debug',
  templateUrl: './base-form-debug.component.html',
  styleUrls: ['./base-form-debug.component.css']
})
export class BaseFormDebugComponent implements OnInit {

  @Input() form: any;
  exibir: boolean = false;
  producao: boolean = environment.production;


  constructor() {}

  ngOnInit(): void {
  }

  onSubmit()
  {
    console.log(this.form);
  }

  onSubmitJson()
  {
    console.log(JSON.stringify(this.form.value));
  }

  onExibir(event: any){
    this.exibir = !this.exibir;
    console.log(this.exibir);
  }
}
