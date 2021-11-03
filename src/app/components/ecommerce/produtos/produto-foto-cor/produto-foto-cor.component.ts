import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { EcommerceService } from '@app/core/services/ecommerce.service';
import { BaseComponent } from '@app/shared/components/base/base.component';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { catchError, delay, map, take, takeUntil } from 'rxjs/operators';
import { DialogResult } from '@app/modules/BaseDialog';
import { UtilsService } from '@app/core/services/utils.service';

// declare function modal(): any;

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

  @Output() eventPosicaoUp = new EventEmitter;

  get produtoCores() : FormArray {
    return this.formulario.get('cores') as FormArray;
  }

  get produtoCodigo() {
    return this._codProduto;
  }

  get fotos() {
    return this._produtoFotos;
  }

  private _viewportOrientation = 'horizontal';
  get viewportOrientation() : string {
    return this._viewportOrientation;
  }

  fotosCor(cor: any) {

    const codCor = cor.value.codCorECommerce;

    const list = this.fotos.filter(c => c.codCor == codCor).sort((a, b) => (a.posicao > b.posicao) ? 1 : -1);

    return list;
  }

  onMaxPosicao(cor: any) : number {
    return this.fotosCor(cor).reduce(function(a, b) {
      return (a.posicao > b.posicao) ? a.posicao : b.posicao})
  }

  constructor(
    private _api: EcommerceService,
    private _util: UtilsService,
    public matDialog: MatDialog) { 
      super();
      this.baseMatDialog = matDialog;
  }

  ngOnInit(): void {
    this._viewportOrientation = (this._util.isMobile) ? 'vertical' : 'horizontal';
  }

  onImgError(event: any) {
    event.target.src = "../../../../../assets/images/semfoto.jfif";
  }

  onCarregar(codProduto: number) {

    if (codProduto == null)
      return;

    this.base_carregando = true;
    this._api.getProdutoFotos(codProduto)
    .subscribe({
      next: result => {
        this._produtoFotos = [];
        const list = result.sort((a, b) => (a.posicao > b.posicao) ? 1 : -1);

        list.forEach(c => {
          this._produtoFotos.push({
            codProdutoEcommerce: c.codProdutoEcommerce,
            codCor: c.codCor,
            posicao: c.posicao,
            posicaoAlt: c.posicao,
            urlImagem: c.urlImagem,
            file: null
          })
        })
      },
      error: erro => {
        this.baseDialogError('Erro ao carregar cores', erro)
        this.base_carregando = false;
      },
      complete: () => {
        this.base_carregando = false;
      }
    })
  }

  drop(event: CdkDragDrop<{title: string, poster: string}[]>, cor: any) {
    
    var list = this.fotosCor(cor);
   
    moveItemInArray(list, event.previousIndex, event.currentIndex);

    this.onPosicaoUp(of(list));
  }

  onPosicaoUp(obsList: Observable<any[]>) {

    obsList.subscribe({
      next: result => {
        result.forEach((f, i) => {
          f.posicao = i+1
        })
      },
      complete: () => {
        const listUp = this.fotos
        .filter(f => f.posicao != f.posicaoAlt)
        .map(function(item) {
          delete item.posicaoAlt;
          return item}
        );
  
        this.eventPosicaoUp.emit(listUp);
      }
    })
  }

  onFilesUp(event: any, cor: any) {
    
    const files = event as File[];
    const maxPosition = this.onMaxPosicao(cor)+1;

    let registro = of(files);

    registro
      .subscribe({
        next: result => {
          this.base_carregando = true;
          this.baseDialogProcess("Carregando imagens");

          result.forEach((f, i) => {
            
            let body = {
              extensao: "",
              base64Image: ""
            }

            var fr = new FileReader();
            fr.readAsDataURL(f);
            fr.onload = () => {
      
              body.extensao = f.name.split('.').pop() as string;
              body.base64Image = (<string>fr.result).replace(/^data:image\/[a-z]+;base64,/, "");

              this._api.postFotoBase64(this.produtoCodigo, cor.value.codCorECommerce, maxPosition+i, body)
              .pipe(
                delay(3000),
                catchError(err => {
                  this.baseDialogError('Falha no envio da imagem"'+f.name+"'");
                  return err;
                })
              )
              .subscribe({
                next: result => {
                  this._produtoFotos.push({
                    codProdutoEcommerce: result.codProdutoEcommerce,
                    codCor: result.codCor,
                    posicao: result.posicao,
                    posicaoAlt: result.posicao,
                    urlImagem: result.urlImagem,
                    file: null
                  })
                },
                complete: () => {
                  this.base_carregando = false;
                  this.baseDialogClose();
                }
              })
            }
          })
        },
        error: erro => {
          console.error(erro)
          this.base_carregando = false;
          this.baseDialogError("Erro no envio de imagem");
        },
        complete: () => {
          this.base_carregando = false;
        }
      })
  }

  unsub$ = new Subject();

  onDelete(fotoCor: any) {

    this.baseDialogConfirm("Deseja excluir esta imagem?")
      .afterClosed()
      .subscribe(result => {

        if (result == DialogResult.OK)
        {
          this.baseDialogProcess('Excluindo foto...')

          this._api.delFotoCor(this.produtoCodigo, fotoCor.codCor, fotoCor.posicao)
          .pipe(
            //take(1)
            takeUntil(this.unsub$)
          )
          .subscribe({
            next: () => {
            },
            error: erro => {
              this.baseDialogError('Falha na tentativa de exclusão da imagem.', erro)
            },
            complete: () => {
              this.baseDialogSucess('Imagem excluida com sucesso!').afterClosed()
                .subscribe(() => {
                  this.onCarregar(this.produtoCodigo);
               })
            }
          })
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
    } else {
        this.uploadedFile.next("");
    }
  }

  ngOnDestroy() {
    this.unsub$.next();
    this.unsub$.complete();
  }

}
