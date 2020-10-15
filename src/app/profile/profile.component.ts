import { Component, HostListener, OnInit } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ConfigService } from 'src/app/service/config.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Md5 } from "md5-typescript";
export class User {
  constructor(
    public email: string,
    public name: string,
    public bank: string,
    public rek: string,
    public account: string,
    
  ) { }
}

export class Password {
  constructor(
    public pass: string,
    public newPass1: string,
    public newPass2: string,
  ) { }
}


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  @HostListener('window:popstate', ['$event'])
  onPopState(event) {
    console.log('Back button pressed');
    this.modalService.dismissAll();
  }
  phone: string;
  userModel: any = new User("", "", "", "", "");
  oldPass: string;
  resetPassw: any = new Password(null, null, null);

  constructor(
    private spinner: NgxSpinnerService,
    private http: HttpClient,
    private configService: ConfigService,
    private modalService: NgbModal,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.httpGet();
  }



  httpGet() {
    this.spinner.show();
    this.http.get<any>(environment.api + 'user', {
      headers: this.configService.headers()
    }).subscribe(data => {
      this.spinner.hide();
      console.log(data);
      this.phone = data['user']['phone'];
      this.userModel = new User(
        data['user']['email'],
        data['user']['name'],
        data['user']['bank'],
        data['user']['rek'],
        data['user']['account']);


      this.oldPass = data['password'];

    }, error => {
      console.log(error);
    })
  }

  open(content) {
    this.modalService.open(content);
  }

  onSubmitUser() {
    this.spinner.show();
    this.http.post<any>(environment.api + "user/onSubmitUser", this.userModel, {
      headers: this.configService.headers()
    }).subscribe(
      data => {
        console.log(data);
        this.spinner.hide();
      },
      error => {
        console.log(error);
      }
    )


  }
  note:string;
  onSubmitPass() {
    const body = {
      oldPass:  Md5.init(this.resetPassw['pass']),
      pass1: Md5.init(this.resetPassw['newPass1']),
      pass2:  Md5.init(this.resetPassw['newPass2']),
    }

    if (this.oldPass != Md5.init(this.resetPassw['pass'])) { 
      this.note = "Password lama tidak match";
    }
    else if(  body['pass1'] != body['pass2'] ){
      this.note = "Password tidak match";

    }
    else {
      this.spinner.show();
      this.http.post<any>(environment.api + "user/onSubmitPass",  body, {
        headers: this.configService.headers()
      }).subscribe(
        data => {
          console.log(data);
          this.spinner.hide();
          this.note = "Update password success!";
        },
        error => {
          console.log(error);
        }
      )
    }

  }



  logout() {
    const body = {
      token: this.configService.token(),
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
