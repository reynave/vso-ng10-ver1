import { Component, OnInit } from '@angular/core';

declare var cordova;

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>', 
})
export class AppComponent implements OnInit {
  title = 'app';

  constructor(){

  }
  ngOnInit(): void { 
    document.addEventListener('deviceready', function(){
      console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    }, false);


    // document.addEventListener("backbutton", function(){
    //   console.log("back on press");
    //   location.href = "index.html";
    // }, false);


  }



}
