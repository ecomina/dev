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

  get canOk() {
    return (this.tipo == DialogType.Ok || this.tipo == DialogType.OkCancel || this.tipo == DialogType.Sucess)
  }

  get canCancel() {
    return (this.tipo == DialogType.OkCancel || this.tipo == DialogType.YesNoCancel)
  }

  get canYes() {
    return (this.tipo == DialogType.YesNoCancel)
  }

  get canNo() {
    return (this.tipo == DialogType.YesNoCancel)
  }

  get process() {
    return this.tipo == DialogType.Process;
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

  resultOk: DialogResult = DialogResult.OK;
  resultCancel: DialogResult = DialogResult.Cancel;
  resultYes: DialogResult = DialogResult.Yes;
  resultNo: DialogResult = DialogResult.No;
  resultAbort: DialogResult = DialogResult.Abort;
  resultNone: DialogResult = DialogResult.None;
  resultIgnore: DialogResult = DialogResult.Ignore;
  resultRetry: DialogResult = DialogResult.Retry;

  constructor (
    public dialogRef: MatDialogRef<BaseDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { 
    this._mensagem = data.mensagem;
    this._titulo = data.titulo;
    this._tipo = data.tipo;
  }

  ngOnInit(): void {
  }

  onResult(result: any) {
    this.dialogRef.close(result);
  }
}
