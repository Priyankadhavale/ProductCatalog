import { Component, OnInit } from '@angular/core';
import { catalogApiService } from 'src/api/CatalogApiService/catalogapi.service';
import { Catalog } from 'src/api/classes/Catalog';
import { ConfirmationDialogService } from '../confirmation-dialog/confirmation-dialog.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  providers: [ ConfirmationDialogService ]
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

  constructor(private _catalaogApiService: catalogApiService,private confirmationDialogService: ConfirmationDialogService,private router: Router){
    
  }
  ngOnInit(): void {
    this._catalaogApiService.getCatalogs().subscribe(
      {
        next: data => {this.filteredProduct = data; this.products = data;},
        error: err => this.errorMessage = err
      });
  }

  public openConfirmationDialog(id:number) {
    this.confirmationDialogService.confirm('Please confirm..', 'Do you really want to delete this catalog ... ?')
    .then((confirmed) => { debugger; console.log('User confirmed:', confirmed);
    if(confirmed)
    {
      this._catalaogApiService.delete(id).subscribe((data: boolean)=>{
        var index = this.filteredProduct.indexOf(this.filteredProduct.filter(x=> x.id === id)[0]);
        this.filteredProduct.splice(index,1);
        this.router.navigate(['']);
      }) 
    }
         
  })
    .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
  }

  toggleImage(): void {
    this.showImage = !this.showImage;
  }

  performFilter(filterBy:string):Catalog[]{
    filterBy = filterBy.toLocaleLowerCase();
    return this.products.filter((product:Catalog) => product.title.toLocaleLowerCase().indexOf(filterBy) != -1);
  }
}
