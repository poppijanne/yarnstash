import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { AngularFontAwesomeModule } from "angular-font-awesome";
import { DataTableModule, SharedModule } from "primeng/primeng";

import { MultiSelectModule } from "primeng/multiselect";
import { CheckboxModule } from "primeng/checkbox";
import { DropdownModule } from "primeng/dropdown";
import { ButtonModule } from "primeng/button";
import { DialogModule } from "primeng/dialog";
import { ChipsModule } from "primeng/chips";
import { TableModule } from "primeng/table";
import { ContextMenuModule } from "primeng/contextmenu";
import { AutoCompleteModule } from "primeng/autocomplete";
import { InputTextModule } from "primeng/inputtext";
import { ColorPickerModule } from "primeng/colorpicker";
import {FieldsetModule} from 'primeng/fieldset';

import { AppRoutingModule } from ".//app-routing.module";

import { AppComponent } from "./app.component";
import { ItemService } from "./item.service";
import { ItemModel } from "./data/item.model";
import { TagsComponent } from "./tags/tags.component";
import { YarnTableComponent } from "./yarn-table/yarn-table.component";
import { ListWithCommasPipe } from "./list-with-commas.pipe";
import { FinnishDecimalPipe } from "./finnish-decimal.pipe";
import { YarnDetailsComponent } from "./yarn-details/yarn-details.component";
import { MaterialBarComponent } from "./material-bar/material-bar.component";
import { ColorsComponent } from "./colors/colors.component";
import { YarnEditComponent } from "./yarn-edit/yarn-edit.component";
import { CsvComponent } from './csv/csv.component';

@NgModule({
  declarations: [
    AppComponent,
    TagsComponent,
    YarnTableComponent,
    ListWithCommasPipe,
    FinnishDecimalPipe,
    YarnDetailsComponent,
    MaterialBarComponent,
    ColorsComponent,
    YarnEditComponent,
    CsvComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AngularFontAwesomeModule,
    FormsModule,
    AppRoutingModule,
    DataTableModule,
    SharedModule,
    ChipsModule,
    DialogModule,
    AutoCompleteModule,
    ColorPickerModule,
    InputTextModule,
    ButtonModule,
    ContextMenuModule,
    DropdownModule,
    CheckboxModule,
    MultiSelectModule,
    TableModule,
    FieldsetModule
  ],
  providers: [ItemService, ItemModel],
  bootstrap: [AppComponent]
})
export class AppModule {}
