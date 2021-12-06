export class BaseTreeSelect {
    codigo: any;
    descricao: string = '';
    selecionado: boolean = false;
    objValue?: any = null;
    expandir?: boolean = false;
    carregando?: boolean = false;
    filhos: BaseTreeSelect[] = [];

    constructor(item: BaseTreeSelect) {
        this.codigo = item.codigo
        this.descricao = item.descricao
        this.selecionado = item.selecionado
        this.filhos = item.filhos
    }
}

    