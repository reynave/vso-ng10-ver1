import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment'; 
import { ConfigService } from 'src/app/service/config.service';
import { Router } from '@angular/router';
import {Md5} from "md5-typescript";

export class Login { 
  constructor(
    public phone: string, 
    public password: string
  ) { }

}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
 login :any  = new Login(null, null);
  
  note: any;
  constructor(
    private spinner: NgxSpinnerService,
    private http: HttpClient,
    private configService: ConfigService, 
    private router: Router,
  ) { }

  ngOnInit(): void {
    if(this.configService.token() ){
      this.router.navigate(['items']);
    }
  }


  onSubmit(){
    
    this.spinner.show(); 
    const body = {
      phone : this.login['phone'],
      password : Md5.init(this.login['password']),
      device : 'android',
    }
    console.log(body);
    this.http.post<any>(environment.api + "login/signin/", body, {
      headers: this.configService.headers()
    }).subscribe(
      data => {
        console.log(data);
        this.spinner.hide(); 
        this.note = data['data']['note'];
        if(data['data']['login']=== true){
          localStorage.setItem("vso1sales", data['data']['token']);  
          this.router.navigate(['items']); 
        }  
  
      },
      error => {
        console.log(error);
      },
       
    );
  }
}
