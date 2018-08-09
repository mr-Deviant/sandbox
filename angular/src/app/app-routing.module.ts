import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RxjsComponent } from './components/rxjs/rxjs.component';

const routes: Routes = [
    { path: 'rxjs', component: RxjsComponent },

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
