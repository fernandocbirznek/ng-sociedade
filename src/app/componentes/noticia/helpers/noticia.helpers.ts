import { 
    NoticiaFilterModel, 
    NoticiaFilterSelectedModel
} from "src/app/models";

export class NoticiaHelpers {
    static noticiaSelectedItemMany(item: NoticiaFilterModel): NoticiaFilterSelectedModel[] {
        let noticiaFilterSelectedMany: NoticiaFilterSelectedModel[] = [];
        
        if (item && item.noticiaTitulo)
            noticiaFilterSelectedMany.push(
                this.getSelectedItem(item.noticiaTitulo, 1000, "draw")
            );

        if (item && item.usuarioNome)
            noticiaFilterSelectedMany.push(
                this.getSelectedItem(item.usuarioNome, 2000, "stylus_note")
            );

        if (item && item.dataInicio) 
            noticiaFilterSelectedMany.push(
                this.getSelectedItem(item.dataInicio.toDateString(), 3000, "today")
            );

        if (item && item.dataFim) 
            noticiaFilterSelectedMany.push(
                this.getSelectedItem(item.dataFim.toDateString(), 4000, "event")
            );

        return noticiaFilterSelectedMany
    }

    static getSelectedItem(nome: string, id: number, iconName: string): NoticiaFilterSelectedModel {
        let noticiaFilterSelectedModel = new NoticiaFilterSelectedModel();
        noticiaFilterSelectedModel.filtroNome = nome;
        noticiaFilterSelectedModel.id = id;
        noticiaFilterSelectedModel.matIconName = iconName;

        return noticiaFilterSelectedModel;
    }
}