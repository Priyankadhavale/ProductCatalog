import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { catalogApiService } from 'src/api/CatalogApiService/catalogapi.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
  myFiles:string [] = [];
  
  myForm = new FormGroup({
   title: new FormControl('', [Validators.required, Validators.minLength(3)]),
   file: new FormControl('', [Validators.required])
 });

  constructor(private _catalaogApiService: catalogApiService) { }

  get f(){
    return this.myForm.controls;
  }

  ngOnInit(): void {
  }

  onFileChange(event) {
   
    for (var i = 0; i < event.target.files.length; i++) { 
        this.myFiles.push(event.target.files[i]);
    }
}
submit(){
  debugger;
  const formData = new FormData();

  for (var i = 0; i < this.myFiles.length; i++) { 
    formData.append("fileArray", this.myFiles[i]);
    
  }
  // this._catalaogApiService.postFile(formData)
  // .subscribe(res => {
  //   console.log(res);
  //   alert('Uploaded Successfully.');
  // })
 
}

}
