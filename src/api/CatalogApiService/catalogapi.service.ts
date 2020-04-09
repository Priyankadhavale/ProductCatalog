import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import {HttpClient,HttpParams, HttpErrorResponse} from '@angular/common/http';
import { Catalog } from '../classes/Catalog';
import { HttpHeaders } from '@angular/common/http';
import { catchError,tap } from "rxjs/operators";

@Injectable()
export class catalogApiService{

    constructor(private httpClient: HttpClient){}

    httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      })
    }

    httpOptionsFileupload ={
      headers: new HttpHeaders({
        'Content-Type': null,
        'Accept': "multipart/form-data"
      })
    }

    getCatalogs(): Observable<Catalog[]>{
      return this.httpClient.get<Catalog[]>("http://localhost:5000/productCatalog/Catalog").pipe(
        tap(data => console.log('All: '+ JSON.stringify(data))),
        catchError(this.handleError)
      );
    }

    getCatalogWithId(id:number):Observable<Catalog>{
     // let params = new HttpParams().set("id","10");
      return this.httpClient.get<Catalog>(`http://localhost:5000/productCatalog/Catalog/${id}`);
    }
    
    post(opost:Catalog):Observable<Catalog>{
      return this.httpClient.post<Catalog>("http://localhost:5000/productCatalog/Catalog",opost,this.httpOptions);
    }
    
    postFile(file:FormData):Observable<string>{
      return this.httpClient.post("http://localhost:5000/productCatalog/FileUpload",file,{responseType:'text'});
    }

    delete(id:number):Observable<boolean>{
      return this.httpClient.delete<boolean>(`http://localhost:5000/productCatalog/Catalog/${id}`);
    }
    put(opost:Catalog):Observable<Catalog>{
      return this.httpClient.put<Catalog>("http://localhost:5000/productCatalog/Catalog",opost,this.httpOptions);
    }

    private handleError(err:HttpErrorResponse){
      let errorMessage = '';
      if(err.error instanceof ErrorEvent){
        errorMessage = 'An error occurred: ${err.error.message}';
      }
      else
      {
        errorMessage = 'server returned the code ${err.status}, error message is : ${err.message}';
      }
      console.error(errorMessage);
      return throwError(errorMessage);
    }
}