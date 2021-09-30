import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-base-combo-filter',
  templateUrl: './base-combo-filter.component.html',
  styleUrls: ['./base-combo-filter.component.css']
})
export class BaseComboFilterComponent implements OnInit {

  @Input() comboLabel: string;
  @Input() comboEnabled: boolean = true;
  @Input() comboCanEdit: boolean = false;
  @Input() comboCanAdd: boolean = false;
  @Input() comboCanDel: boolean = false;
  @Input() comboCanOpt: boolean = false;

  @Input() public set comboIdValue(cValue: any) {
    this.idFilter = cValue;  
    if (cValue != null)
      this.onLocate();
  }
  @Input() public set clear(clear: boolean) {
    this.list = [];
    this.objValue = null;
  }

  @Input() public set comboListObs(cList: Observable<any[]>) {

    cList.subscribe({
      next: result => {
        this.carregando = true;

        this.itensControls.clear();
        this.list = [];
        result.forEach(obj => {
          this.additem(obj),
          this.list.push(obj)
          this.onLocate();
        })
      },
      error: erro => {
        alert('Erro ao carregar lista')
      },
      complete: () => {
        this.carregando = false;
      }
    })
    
    // cList.subscribe(result => {
    //   this.carregando = true;
    //   this.itensControls.clear();
    //   this.list = [];
    //   result.forEach(obj => {
    //     this.additem(obj),
    //     this.list.push(obj)
    //     this.onLocate();
    //   })
    //   this.carregando = false;
    // })
  }

  @Input() public set objValueS(v: any) {
    this.objValueX = v;
  }

  @Output() eventEmiterBase = new EventEmitter();
  @Output() eventEmiterBaseAdd = new EventEmitter();
  @Output() eventEmiterBaseEdit = new EventEmitter();
  @Output() eventEmiterBaseDelete = new EventEmitter();

  constructor(private _formBuilder: FormBuilder) { }

  filterValue: string = ""; 
  list: any[] = [];
  idFilter: any = null;
  listObs: Observable<any[]> = new Observable<any[]>();
  editando: boolean = false;

  comboValue: any = null;
  carregando: boolean = true;

  descricaoControl = new FormControl('', Validators.required);

  formulario: FormGroup = this._formBuilder.group({
      selecionado : [null],
      itens: this._formBuilder.array([this._formBuilder.group({
        id: [0, Validators.required],
        descricao: ['', Validators.required],
        grupo: '',
        object: [null, Validators.required]}), Validators.required])
  });

  additem(item: any) {
    this.itensControls.push(this._formBuilder.group({
      id: item.id,
      descricao: item.descricao,
      grupo: item.grupo,
      object: item.object
    }));

  }

  ngOnInit(): void {
  }

  onAdd() {
    this.eventEmiterBaseAdd.emit(this.filterValue);
  }

  onEdit(obj: any)
  {
    this.descricaoControl.setValue(obj.object.descricao);
    this.editando = !this.editando;
  }

  onDelete(obj: any)
  {
    console.log('onDelete', obj);
    //this.eventEmiterBaseDelete.emit(this.objValue);
  }

  onConfirm(obj: any) {
    this.editando = !this.editando;
    this.objValue.descricao = this.descricaoControl.value;
    //this.objValue.object.descricao = this.descricaoControl.value;
    this.eventEmiterBaseEdit.emit(this.objValue);
  }

  onCancel() {
    this.editando = !this.editando;
  }

  onLocate() {
      this.list.forEach(obj => {
        if (obj.id == this.idFilter){
          this.objValue = obj;
        }
      })
  }

  get itensControls() : FormArray {
    return (this.formulario.get('itens') as FormArray);
  }

  onChange(event: any)
  {
    if (event.value != undefined)
    {
      this.formulario.get('selecionado')?.setValue(event.value.value);
      this.eventEmiterBase.emit(event.value);
    }
  }

  get canFilter() : boolean {
    return (this.filterValue.length > 0);
  }

  get canAdd() : boolean {
    return (this.comboCanAdd && this.canFilter && this.listObjects.length == 0);
  }

  get canEdit() : boolean {
    return (this.comboCanEdit && this.objValue != null && this.listObjects.length > 0 && !this.editando);
  }

  get canDel() : boolean {
    return (this.comboCanDel && this.objValue != null && this.listObjects.length > 0);
  }

  get canConfirm() : boolean {
    let objects = this.list;
    
    objects = objects.filter(m => ( m.object.descricao).toUpperCase() == this.descricaoControl.value.toUpperCase());

    return (this.editando && this.descricaoControl.valid && objects.length == 0);
  }

  objValueX : any;
  get objValue() {
    return this.objValueX;
  }

  set objValue(v: any) {
    this.objValueX = v;
  }

  get listObjects() : any[] {
    let objects = this.list;
    
    if (this.canFilter)
    {
      objects =  objects.filter(m => (m.id + m.descricao).toUpperCase().includes(this.filterValue.toUpperCase()));
    }

    return objects;
  }
  
  onFilter(event: any) {
    this.filterValue = event;
  }

  get label(): string {
    return (this.carregando) ? "Carregando..." : this.comboLabel;
  }


}
