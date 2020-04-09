import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
import { catalogApiService } from 'src/api/CatalogApiService/catalogapi.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Catalog, CatalogImage } from 'src/api/classes/Catalog';
import { Observable, forkJoin } from 'rxjs';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
  productForm: FormGroup;
  myFiles:File [] = [];
  isLoadingResults = false;
  product:Catalog;
  products:Catalog[];
  pId: number;
  pageTitle: string = 'Edit Product details';
  urls = [];
  images:CatalogImage[] = [];

  constructor(private router: Router, private route: ActivatedRoute, private _catalaogApiService: catalogApiService, private formBuilder: FormBuilder) { 
    this.productForm = this.formBuilder.group({
      'title' : [null, Validators.required],
      'description' : [null],
    });
  }

  get f(){
    return this.productForm.controls;
  }

  ngOnInit(): void {
    this.getProduct(this.route.snapshot.params['productId']);
  }

  getProduct(id){
    this._catalaogApiService.getCatalogWithId(id).subscribe((data: Catalog)=>{
      data.images.forEach(x=>{
        this.urls.push(`http://localhost:5000/productcatalog/images/${x.path}`);
        this.images.push({id: x.id,path:x.path});
      });
      
      this.productForm.setValue({
        title: data.title,
        description: data.description,
      });
      this.pId = data.id;
    })  
  }
  submit(){
    const catalogItem: Catalog = new Catalog();

    const result = Object.assign({}, this.productForm.value);

    debugger;
    catalogItem.title = result.title;
    catalogItem.description = result.title;
    catalogItem.id = this.pId;

    let all_obs:Observable<string>[] = [];
    let catalogImages: CatalogImage[] = [];

    if(this.myFiles.length > 0){

      this.myFiles.forEach(element => {
        let formData = new FormData();
        formData.append('file', element, element.name);
        all_obs.push(this._catalaogApiService.postFile(formData));
      });
      
      forkJoin(all_obs).subscribe(
        data => {
          data.forEach(e => {
            catalogImages.push({id: 0,path:e });
          });
          this.images.forEach(e =>{
            catalogImages.push(e);
          });
          catalogItem.images = catalogImages;
          this.update(catalogItem);

        });
    }
    else
    {
      this.images.forEach(e =>{
        catalogImages.push(e);
      });

      catalogItem.images = catalogImages;
     this.update(catalogItem);
    }
  }

  update(ctItem:Catalog)
  {
    this._catalaogApiService.put(ctItem).subscribe(
      data => {
        console.log("Catalog update completed");
        this.router.navigate(['']);
     });
  }
  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
        var filesAmount = event.target.files.length;
       
        for (let i = 0; i < filesAmount; i++) {
          this.myFiles.push(event.target.files[i]);
                var reader = new FileReader();

                reader.onload = (event:any) => {
                  console.log(event.target.result);
                   this.urls.push(event.target.result); 
                }
                reader.readAsDataURL(event.target.files[i]);
        }
    }
}
}



