import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { catalogApiService } from 'src/api/CatalogApiService/catalogapi.service';
import { Catalog } from 'src/api/classes/Catalog';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  product:Catalog;
  products:Catalog[];
  pId: number;
  errorMessage:string;
  pageTitle : string = "Product Details";
  imageWidth:number =100;
  imageMargin: number = 2;

  constructor( private route: ActivatedRoute,private _catalaogApiService: catalogApiService) {
    
   }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.pId = Number(params.get('productId'));
    });

    this._catalaogApiService.getCatalogWithId(this.pId).subscribe((data: Catalog)=>{
      console.log(data);
      this.product = data;
    })  
  }

}
