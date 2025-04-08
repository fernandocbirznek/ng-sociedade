import { WidgetModel } from "../../widget";

export class WidgetViewModel {
    widgetCursar: WidgetModel[] = [];
    widgetCursando: WidgetModel[] = [];
    widgetConcluido: WidgetModel[] = [];

    protected constructor(item?: Partial<WidgetViewModel>) {
        Object.assign(this, item);
    }

    static create(item: Partial<WidgetViewModel>): WidgetViewModel {
        return new WidgetViewModel(item);
    }
}