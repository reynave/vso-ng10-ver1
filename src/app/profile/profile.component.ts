import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment'; 
import { ConfigService } from 'src/app/service/config.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(
    private spinner: NgxSpinnerService,
    private http: HttpClient,
    private configService: ConfigService, 
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  logout(){
    const body = {
      token : this.configService.token(),
    }
    console.log(body);
    this.http.post<any>(environment.api + "login/signout/", body, {
      headers: this.configService.headers()
    }).subscribe(
      data => { 
        console.log(data); 
        this.configService.removeToken();
        window.location.href = '/';

      },
      error => {
        console.log(error);
      },
       
    );
  }
}
