import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxSpinnerModule } from "ngx-spinner";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { TextareaAutosizeModule } from 'ngx-textarea-autosize';

import { ItemsComponent } from './items/items.component';
import { TransactionComponent } from './transaction/transaction.component';
import { ProfileComponent } from './profile/profile.component';
import { BankComponent } from './bank/bank.component';
import { LoginComponent } from './login/login.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { TabsComponent } from './global/tabs/tabs.component';
import { HeaderComponent } from './global/header/header.component'; 
import { ItemsCartComponent } from './items/items-cart/items-cart.component';

@NgModule({
  declarations: [
    AppComponent,
    ItemsComponent,
    TransactionComponent,
    ProfileComponent,
    BankComponent,
    LoginComponent,
    NotfoundComponent,
    TabsComponent,
    HeaderComponent, 
    ItemsCartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    TextareaAutosizeModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgxSpinnerModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
