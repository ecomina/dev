import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogResult, DialogType } from '@app/modules/BaseDialog';
import { BaseDialogComponent } from '../base-dialog/base-dialog.component';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.css']
})
export class BaseComponent implements OnInit {

  public base_title: string;
  public base_carregando: Boolean = false;
  dialog : MatDialog;

  
  @Input() formulario: FormGroup;
  @Input() formularioArray: FormArray;


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

  public baseDialogError(titulo: string, msg: string) : DialogResult {
    this.baseDialog(DialogType.Error, titulo, msg);

    return DialogResult.OK;
  }

  public baseDialogAlert(titulo: string, msg: string) : DialogResult {
    this.baseDialog(DialogType.Alert, titulo, msg);

    return DialogResult.OK;
  }

  public baseDialogSucess(msg: string) : DialogResult {
    this.baseDialog(DialogType.Sucess, 'Sucesso', msg);

    return DialogResult.OK;
  }

  public baseDialogMsg(tipoDialogo: DialogType, titulo: string, msg: string) : DialogResult {
    this.baseDialog(tipoDialogo, titulo, msg);

    return DialogResult.OK;
  }

  private baseDialog(tipoDialogo: DialogType, titulo: string, msg: string) {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.data = {
      tipo: tipoDialogo,
      titulo: titulo,
      mensagem: msg,
      result: null,
      data: null}

    dialogConfig.disableClose = true;

    const dialogRef = this.dialog.open(BaseDialogComponent, dialogConfig);

    setTimeout(() => {
      dialogRef.close();
    }, 80000)

    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog Msg', result);
    })
  }

}
