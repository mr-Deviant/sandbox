import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RxjsComponent } from './components/rxjs/rxjs.component';
import { SubjectsComponent } from './components/subjects/subjects.component';
import { HotColdComponent } from './components/hot-cold/hot-cold.component';
import { ReactiveFormsComponent } from './components/reactive-forms/reactive-forms.component';

const routes: Routes = [
    { path: 'rxjs', component: RxjsComponent },
    { path: 'subjects', component: SubjectsComponent },
    { path: 'hot-cold', component: HotColdComponent },
    { path: '',
        redirectTo: '/rxjs',
        pathMatch: 'full'
    },
    { path: 'reactive-forms', component: ReactiveFormsComponent },
    // ,{ path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
