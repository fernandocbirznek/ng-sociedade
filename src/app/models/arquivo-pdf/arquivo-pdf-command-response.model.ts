export class ArquivoPdfCommandResponseModel {
	id: number = 0;
    DataCadastro: Date | undefined = undefined;

    conteudo: Blob | undefined = undefined;
    aulaSessaoId: number = 0;
    aulaSessaoDataCadastro: Date | undefined = undefined;
    contentType: string = '';
}