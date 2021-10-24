import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { DialogResult, DialogType } from '@app/modules/BaseDialog';
import { Observable, of } from 'rxjs';
import { BaseDialogComponent } from '../base-dialog/base-dialog.component';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.css']
})
export class BaseComponent implements OnInit {

  public base_title: string;
  public base_carregando: Boolean = false;
  private obsProcess$ = null;
  dialogResult: DialogResult.None;
  
  @Input() formulario: FormGroup;
  @Input() formularioArray: FormArray;

  public baseMatDialog: MatDialog;

  public iconCheck(check: boolean) {
    return  (check) ? 'check_box' : 'check_box_outline_blank';
  }

  constructor() { 
  }

  ngOnInit(): void {
  }

  public onBaseError(titulo: string, msg: string) {
    alert(msg);
  }

  public baseDialogError(msg: string, error: any = null) {
    
    if (error != null)
      msg = msg+'\r\rErro Original: '+error

    return this.baseDialog(DialogType.Error, 'Erro', msg);

  }

  public baseDialogAlert(titulo: string, msg: string) {
    return this.baseDialog(DialogType.Alert, titulo, msg);
  }

  public baseDialogSucess(msg: string) {
    return this.baseDialog(DialogType.Sucess, 'Sucesso', msg);
  }

  public baseDialogConfirm(msg: string) {
    return this.baseDialog(DialogType.OkCancel, 'Sucesso', msg);
  }

  public baseDialogMsg(tipoDialogo: DialogType, titulo: string, msg: string) {
    return this.baseDialog(tipoDialogo, titulo, msg);
  }

  public baseDialogProcess(msg: string) {
    return this.baseDialog(DialogType.Process, "Processando...", msg);
  }

  public baseDialogClose() {
    this.baseMatDialog.closeAll();
  }

  private baseDialog(tipoDialogo: DialogType, titulo: string, msg: string) {

    this.baseDialogClose();
    const dialogConfig = new MatDialogConfig();

    dialogConfig.data = {
      tipo: tipoDialogo,
      titulo: titulo,
      mensagem: msg,
      result: null,
      data: null}

    dialogConfig.disableClose = true;

    const dialogRef = this.baseMatDialog.open(BaseDialogComponent, dialogConfig);

    if (tipoDialogo == DialogType.Sucess)
    {
      setTimeout(() => {
        dialogRef.close();
      }, 3000)
    }

    return dialogRef;
  }

}
