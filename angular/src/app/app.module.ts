import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RxjsComponent } from './components/rxjs/rxjs.component';
import { SubjectsComponent } from './components/subjects/subjects.component';
import { HotColdComponent } from './components/hot-cold/hot-cold.component';
import { ReactiveFormsComponent } from './components/reactive-forms/reactive-forms.component';
import { ReactiveFormsService } from './components/reactive-forms/reactive-forms.service'

@NgModule({
  declarations: [
    AppComponent,
    RxjsComponent,
    SubjectsComponent,
    HotColdComponent,
    ReactiveFormsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [ReactiveFormsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
