import { Component, OnInit,OnDestroy } from '@angular/core';
import { HttpService } from '../http.service';
import { Router ,ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit,OnDestroy {
  sub = null;
  id= null;
  first = true;
  updatedBy = null;
  product = null;
  error =null;
  currentUser = null;
  newBid = null;

  constructor(private _httpService: HttpService,private _router:Router,private _route: ActivatedRoute) { }

  ngOnInit() {
    this.sub = this._route.params.subscribe((param)=>{
      this.id = param.id;
    this.currentUser = param.name; })
    




    this._httpService.getProduct(this.id)
    .then( data => { 
      if(data.message =="success"){
        this.product = data.product
      
      }
      else{
        this.error = "Error in receiving data from api" //due to incorrect id
      }
     })
    .catch( err => { console.log(err); })


  }

  onUpdate(){
    if(this.newBid >this.product.topBid){
      this.product.topBid = this.newBid;
      this.product.bidBy= this.currentUser;
      

    }

    
    this._httpService.updateProduct(this.product, this.id)
    .then( data => { 
      if(data.message =="success"){
        this._router.navigate(['/currentAuctions', this.currentUser])
      
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

}
