import { Component, OnInit } from '@angular/core';
import { catalogApiService } from 'src/api/CatalogApiService/catalogapi.service';
import { Catalog } from 'src/api/classes/Catalog';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  pageTitle: string = 'Product List';

  imageWidth:number =40;
  imageMargin: number = 2;
  products:Catalog[];
  showImage: boolean = false;
  errorMessage:string;

  _listFilter: string;
  get listFilter():string{
    return this._listFilter;
  }
  set listFilter(value:string){
    this._listFilter = value;
    this.filteredProduct = this.listFilter?this.performFilter(this.listFilter):this.products;
  }
  
  filteredProduct:Catalog[];

  constructor(private _catalaogApiService: catalogApiService){
    
  }
  ngOnInit(): void {
    this._catalaogApiService.getCatalogs().subscribe(
      {
        next: data => {this.filteredProduct = data; this.products = data;},
        error: err => this.errorMessage = err
      });
    //   data => {
    //       this.products = data;
    //       this.filteredProduct = data;
    //   }
    // );
  }

  toggleImage(): void {
    this.showImage = !this.showImage;
  }

  performFilter(filterBy:string):Catalog[]{
    filterBy = filterBy.toLocaleLowerCase();
    return this.products.filter((product:Catalog) => product.title.toLocaleLowerCase().indexOf(filterBy) != -1);
  }
}
