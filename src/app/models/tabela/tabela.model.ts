import { MatTableDataSource } from "@angular/material/table";

export class TabelaModel {
    dataSource: any = new MatTableDataSource();

    colunaHeader: string[] = [];
    colunaMany: string[] = [];
    colunaWidth: number[] = [];

    buttonCriar: boolean = false;
    buttonEditar: boolean = true;
    buttonExcluir: boolean = true;
    buttonVisualizar: boolean = true;

    buttonCriarLabel: string = '';

    public constructor(item?: Partial<TabelaModel>) {
        Object.assign(this, item);
    }

    static create(item: Partial<TabelaModel>): TabelaModel {
        return new TabelaModel(item);
    }
}