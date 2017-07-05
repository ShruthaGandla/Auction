import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user_name =null;

  constructor(private _router:Router) { }

  ngOnInit() {
  }

  onSubmit(){
    
    console.log(this.user_name); 
    this._router.navigate(['/currentAuctions',this.user_name])
  }

}
