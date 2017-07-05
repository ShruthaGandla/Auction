import { Component, OnInit ,OnDestroy} from '@angular/core';
import { HttpService } from '../http.service';
import { Router ,ActivatedRoute} from '@angular/router';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit,OnDestroy {
  errors = null;
  sub = null;
  maxDate = new Date().toString();

  product = {productName:"",sellerName:"",topBid:0,description :"",time_remaining:"",endDate:null,bidBy:""};
  

  constructor(private _httpService: HttpService,private _router:Router,private _route: ActivatedRoute) { }

  ngOnInit() {
    this.sub = this._route.params.subscribe((param)=>{
      this.product.sellerName = param.name; })
  }

  onSubmit(){
    // product.time_remaining = currentDate-product.endDate;
    this.product.time_remaining = "2 Days";
    this.product.bidBy =  this.product.sellerName;
    // console.log(this.product);
    
     this._httpService.createProduct(this.product)
     .then((data) =>{
       if(data.message == "success"){
         this.errors =null //to reset the value from previous error
          this._router.navigate(['/currentAuctions',this.product.sellerName])
        }
         else {
           this.errors = "There is an error in fetching data from api";
         } 
       
     })
      .catch( err => { console.log(err); })
      
  
  }

   ngOnDestroy(){
    this.sub.unsubscribe();

  }

}
