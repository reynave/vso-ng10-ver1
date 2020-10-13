import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { LocalstorageService } from './localstorage.service';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  varKey: string = "mXTSxrEKSErYnZb33LyBus5RpVtGNfcgEBqxp5Unk5azj4ZgdWfhkfVDKJ3KSLFG7DtecSehXe7Q67NGFWGehU3ANexas3ZbrkfU";
  varToken: string;
  varHeaders: any = [];  
  constructor( 
    private localstorage : LocalstorageService,

  ) { 
    this.varToken = "tokentest";

  }


  headers() {   
    return this.varHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Key': this.varKey,
      'Token': this.token(),
    });
  }

  removeToken(){
    localStorage.removeItem("vso1sales");
  }

  token() : any{
    return  localStorage.getItem("vso1sales") !== null ? localStorage.getItem("vso1sales") : false;
  } 
}
