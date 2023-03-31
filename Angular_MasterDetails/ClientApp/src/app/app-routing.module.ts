import { MasterComponent } from './components/master/master.component';
import { MasterViewComponent } from './components/master-view/master-view.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MasterEditComponent } from './components/master-edit/master-edit.component';

const routes: Routes = [
  { path: '', redirectTo: '/masterdetails', pathMatch: 'full' },
  { path: 'masterdetails', component: MasterViewComponent },
  { path: 'masterdetails/Create', component: MasterComponent },
  { path: 'masterdetails/Edit/:id', component: MasterEditComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
