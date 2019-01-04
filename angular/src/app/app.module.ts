import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RxjsComponent } from './components/rxjs/rxjs.component';
import { SubjectsComponent } from './components/subjects/subjects.component';
import { HotColdComponent } from './components/hot-cold/hot-cold.component';

@NgModule({
  declarations: [
    AppComponent,
    RxjsComponent,
    SubjectsComponent,
    HotColdComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
