import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { YarnTableComponent } from "./yarn-table/yarn-table.component";
import { YarnDetailsComponent } from "./yarn-details/yarn-details.component";
import { YarnEditComponent } from "./yarn-edit/yarn-edit.component";
import { CsvComponent } from './csv/csv.component';

const routes: Routes = [
	{ path: '', redirectTo: '/yarn-table', pathMatch: 'full' },
	{ path: 'yarn-edit/:id', component: YarnEditComponent },
	{ path: "yarn-table", component: YarnTableComponent },
	{ path: "csv", component: CsvComponent }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {}