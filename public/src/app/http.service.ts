import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import "rxjs/Rx"

@Injectable()
export class HttpService {

  constructor(private _http: Http) { }

  retrieveData(){
    return this._http.get('/products').map(data=>data.json()).toPromise()

  }

    delete(id){
    return this._http.get('/delete/'+id).map(data=>data.json()).toPromise()

  }

  createProduct(product){
    console.log("Hello from httpservice");
    
    return this._http.post('/createProduct',product).map(data=>data.json()).toPromise()

  }

  getProduct(id){
       return this._http.get('/showProduct/'+id).map(data=>data.json()).toPromise()

  }

  updateProduct(product,id){
    return this._http.post('/editProduct/'+id,product).map(data=>data.json()).toPromise()

  }


}
