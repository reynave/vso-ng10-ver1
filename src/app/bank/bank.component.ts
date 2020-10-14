import { Component, OnInit } from '@angular/core';

declare var document;
declare var select;
@Component({
  selector: 'app-bank',
  templateUrl: './bank.component.html',
  styleUrls: ['./bank.component.css']
})
export class BankComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  copas() {
    /* Get the text field */
    var copyText = document.getElementById("bank");

    /* Select the text field */
    
    copyText.select();
    copyText.setSelectionRange(0, 99999); /*For mobile devices*/

    /* Copy the text inside the text field */
    document.execCommand("copy");

  }

}
