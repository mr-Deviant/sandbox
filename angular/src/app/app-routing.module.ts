import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RxjsComponent } from './components/rxjs/rxjs.component';
import { SubjectsComponent } from './components/subjects/subjects.component';

const routes: Routes = [
    { path: 'rxjs', component: RxjsComponent },
    { path: 'subjects', component: SubjectsComponent },
    { path: '',
        redirectTo: '/rxjs',
        pathMatch: 'full'
    }
    // ,{ path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
