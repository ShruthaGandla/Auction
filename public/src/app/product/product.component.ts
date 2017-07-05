import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpService } from '../http.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit,OnDestroy {

  user_name = null;
  sub = null;
  products = null;
  error =null;
  errors = null//for delete functionlaity

  constructor(private _httpService: HttpService,private _route: ActivatedRoute,private _router:Router) {}

  ngOnInit() {
     this.sub = this._route.params.subscribe((param)=>{
      this.user_name = param.name; })

    this._httpService.retrieveData()
    .then( data => { 
      if(data.message =="success"){
        this.products = data.products
 
      }
      else{
        this.error = "Error in receiving data from api" //due to incorrect id
      }
     })
    .catch( err => { console.log(err); })
  }

   ngOnDestroy(){
    this.sub.unsubscribe();

  }

  delete(id){
    this._httpService.delete(id)
    .then((data)=>{
      if(data.message == "success"){
        console.log("inside delete in component");
         this._httpService.retrieveData()
                .then( data => { 
                  if(data.message =="success"){
                    this.products = data.products
 
                  }
               else{
                       this.error = "Error in receiving data from api" //due to incorrect id
                     }
       })
       .catch( err => { console.log(err); })//retrievedata ends
      
        }
         else {
           this.errors = "There is an error in fetching data from api";
         } 
      

    })
    .catch( err => { console.log(err); })


  }

}
