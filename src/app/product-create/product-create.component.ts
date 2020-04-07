import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { catalogApiService } from 'src/api/CatalogApiService/catalogapi.service';
import { Catalog, CatalogImage } from 'src/api/classes/Catalog';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { Router } from '@angular/router';
import { forkJoin, Observable } from 'rxjs';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {
  myFiles:File [] = [];
  pageTitle:string="Create Catalog";
 // catalogImages: CatalogImage[] = [];
  imageName:string='';
  
  frmCreate = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl(''),
    file: new FormControl('', [Validators.required])
  });
  
  catalogDetails: Catalog;
  
  get f(){
    return this.frmCreate.controls;
  }
  constructor(private _catalaogApiService: catalogApiService,
    private httpClient: HttpClient, private router: Router) { }

  ngOnInit(): void {
  }
  urls = [];
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
  submit(){
    const catalogItem: Catalog = new Catalog();

    const result = Object.assign({}, this.frmCreate.value);
    catalogItem.title = result.title;
    catalogItem.description = result.title;
    let all_obs:Observable<string>[] = [];
    let catalogImages: CatalogImage[] = [];

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

        catalogItem.thumbnail = catalogImages[0].path;
        catalogItem.images = catalogImages;
         this._catalaogApiService.post(catalogItem).subscribe(
         data => {
           console.log("Catalog create completed");
           this.router.navigate(['']);
        });

      }
    )
  
  }
}
