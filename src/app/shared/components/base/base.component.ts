import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
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

  public baseDialogError(msg: string, error: any = null) : Observable<DialogResult> {
    
    if (error != null)
      msg = msg+'\r\rErro Original: '+error

    return this.baseDialog(DialogType.Error, 'Erro', msg);

  }

  public baseDialogAlert(titulo: string, msg: string) : Observable<DialogResult> {
    return this.baseDialog(DialogType.Alert, titulo, msg);
  }

  public baseDialogSucess(msg: string) : Observable<DialogResult> {
    return this.baseDialog(DialogType.Sucess, 'Sucesso', msg);
  }

  public baseDialogMsg(tipoDialogo: DialogType, titulo: string, msg: string) : Observable<DialogResult> {
    return this.baseDialog(tipoDialogo, titulo, msg);
  }

  public baseDialogProcess(msg: string) : Observable<DialogResult> {
    return this.baseDialog(DialogType.Process, "Processando...", msg);
  }

  public baseDialogClose() {
    this.dialog.closeAll();
  }

  private baseDialog(tipoDialogo: DialogType, titulo: string, msg: string) : Observable<DialogResult> {

    this.dialog.closeAll();
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

    return of(DialogResult.OK);
  }

}
