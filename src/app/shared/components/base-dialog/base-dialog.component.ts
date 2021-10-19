import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogResult, DialogType } from '@app/modules/BaseDialog';

@Component({
  templateUrl: './base-dialog.component.html',
  styleUrls: ['./base-dialog.component.css']
})
export class BaseDialogComponent implements OnInit {

  private _titulo: string = "";
  get titulo() {
    return this._titulo;
  }

  private _tipo: DialogType;
  get tipo() {
    return this._tipo;
  }

  private _mensagem: string = "";
  get mensagem() {
    return this._mensagem;
  }

  get corTitulo() {

    let classTitulo = "ttAlert";

    switch(this.data.tipo) 
    {
      case DialogType.Alert:
        classTitulo = "ttAlert";
        break;
      case DialogType.Error:
        classTitulo = "ttError";
        break;
      case DialogType.Sucess:
        classTitulo = "ttSucess";
        break;
    }

    return classTitulo;
  }

  constructor (
    public dialogRef: MatDialogRef<BaseDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { 
    this._mensagem = data.mensagem;
    this._titulo = data.titulo;
    console.log()
  }

  ngOnInit(): void {
  }

  onOk() {
    this.data.result = DialogResult.OK;
    this.dialogRef.close(this.data);
  }

}
