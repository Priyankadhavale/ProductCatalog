import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { ProductListComponent } from './product-list/product-list.component';
import {HttpClientModule} from '@angular/common/http';
import { catalogApiService } from 'src/api/CatalogApiService/catalogapi.service';
import {FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { ProductCreateComponent } from './product-create/product-create.component';
import { RouterModule } from "@angular/router";
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductEditComponent,
    ProductCreateComponent,
    ProductDetailsComponent,
    ConfirmationDialogComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component: ProductListComponent },
      { path: 'ProductCreate', component: ProductCreateComponent },
      { path: 'products/:productId', component: ProductDetailsComponent },
      { path: 'ProductEdit/:productId', component: ProductEditComponent },
    ])
  ],
  providers: [catalogApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
