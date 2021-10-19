import { Component, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { EcommerceService } from '@app/core/services/ecommerce.service';
import { BaseComponent } from '@app/shared/components/base/base.component';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { BehaviorSubject, of, Subject } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { DialogType } from '@app/modules/BaseDialog';
import { take, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-produto-foto-cor',
  templateUrl: './produto-foto-cor.component.html',
  styleUrls: ['./produto-foto-cor.component.css']
})
export class ProdutoFotoCorComponent extends BaseComponent implements OnInit, OnDestroy {

  public readonly uploadedFile: BehaviorSubject<any> = new BehaviorSubject(null);
  private _produtoFotos: any[] = [];
  private imageSrc: string = '';

  @Input() set form(form: FormGroup) {
    this.formulario = form;
  }

  private _codProduto = 0;
  @Input() set codProduto(codProduto: number) {
    this._codProduto = codProduto;
    this.onCarregar(codProduto);
  }

  get produtoCores() : FormArray {
    return this.formulario.get('cores') as FormArray;
  }

  get produtoCodigo() {
    return this._codProduto;
  }

  get fotos() {
    return this._produtoFotos;
  }

  fotosCor(cor: any) {
    const list = this.fotos.filter(c => c.codCor == cor);

    return list;
  }

  constructor(
    private _api: EcommerceService,
    private _builder: FormBuilder,
    public dialog: MatDialog) { 
    super();
  }

  ngOnInit(): void {
  }

  onImgError(event: any) {
    event.target.src = "../../../../../assets/images/semfoto.jfif";
  }

  onCarregar(codProduto: number) {

    if (codProduto == null)
      return;

    this._api.getProdutoFotos(codProduto).subscribe({
      next: result => {
        this._produtoFotos = [];
        this.base_carregando = true;

        result.forEach(c => {
          this._produtoFotos.push({
            codProdutoEcommerce: c.codProdutoEcommerce,
            codCor: c.codCor,
            posicao: c.posicao,
            urlImagem: c.urlImagem,
            file: null
          })
        })
      },
      error: erro => {
        this.onBaseError('Cores', 'Erro ao carregar cores')
        this.base_carregando = false;
      },
      complete: () => {
        this.base_carregando = false;
      }
    })
  }


  drop(event: CdkDragDrop<{title: string, poster: string}[]>) {
    moveItemInArray(this.fotos, event.previousIndex, event.currentIndex);
  }

  onFilesUp(event: any, cor: any) {
    
    const files = event as File[];

    let maxPosition: number = this.fotosCor( cor.value.codCorECommerce).length;
    let uploading = false;

    for (let i = 0; i < files.length; i++)
    {
      let f = files[i]; 
      maxPosition++;

      let body = {
        extensao: "",
        base64Image: ""
      }
    
      var base64Output : any;

      var fr = new FileReader();
      fr.readAsDataURL(f);
      fr.onload = () => {
        base64Output =  (<string>fr.result).replace(/^data:image\/[a-z]+;base64,/, "");

        body.extensao = f.name.split('.').pop() as string;
        body.base64Image = <string>base64Output;

        console.log('onFilesUp', body);

        uploading = true;
        this.base_carregando = true;
        this._api.postCorFoto(this.produtoCodigo, cor.value.codCorECommerce, maxPosition, body)
        .subscribe({
          next: result => {
            
            this._produtoFotos.push({
              codProdutoEcommerce: result.codProdutoEcommerce,
              codCor: result.codCor,
              posicao: result.posicao,
              urlImagem: result.urlImagem,
              file: null
            })
          },
          complete: () => {
            uploading = false;
            this.base_carregando = false;
            this.baseDialogSucess('Imagens enviadas com sucesso!');
          }
        })
      }


      
    }


    // files.forEach((f: any) => {
    //   console.log('Passei')
    //   maxPosition++;

    //   let body = {
    //     base64Image: ""
    //   }
    
    //   var base64Output : any;

    //   var fr = new FileReader();
    //   fr.readAsDataURL(f);
    //   fr.onload = () => {
    //     base64Output =  (<string>fr.result).replace(/^data:image\/[a-z]+;base64,/, "");;
    //     body.base64Image = <string>base64Output;

    //     this._api.postCorFoto(this.produtoCodigo, cor.value.codCorECommerce, maxPosition, body)
    //     .subscribe();
    //   }
    // });
  }

  unsub$ = new Subject();

  onDelete(fotoCor: any) {

    this._api.delFotoCor(this.produtoCodigo, fotoCor.codCor, fotoCor.posicao)
    .pipe(
      //take(1)
      takeUntil(this.unsub$)
    )
    .subscribe({
      next: result => {
        this.baseDialogSucess('Imagem excluida com sucesso!')
      },
      error: erro => {
        this.baseDialogError('Erro', 'Falha na tentativa de exclusão da imagem.')
      },
      complete: () => {
        this.onCarregar(this.produtoCodigo);
      }
    })
  }

  private getImage(file: File): void {

    if (FileReader && file) {
      const fr = new FileReader();
      fr.onload = (e) =>  
      { 
        this.uploadedFile.next(e.target?.result);
      }
      fr.readAsDataURL(file);
      console.log('getImage', fr.result);
    } else {
        this.uploadedFile.next("");
    }
  }

  ngOnDestroy() {
    this.unsub$.next();
    this.unsub$.complete();
    console.log(`${this} foi desctruido`);
  }

}
