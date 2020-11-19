import { Component, OnInit, HostListener } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfigService } from '../service/config.service';
import { NgxSpinnerService } from "ngx-spinner";

declare var document;
declare var select;
@Component({
  selector: 'app-bank',
  templateUrl: './bank.component.html',
  styleUrls: ['./bank.component.css']
})
export class BankComponent implements OnInit {
  items: any = {
    bank: "",
    info: "",
    pt: "",
  }
  constructor(
    private spinner: NgxSpinnerService,
    private modalService: NgbModal,
    private http: HttpClient,
    private configService: ConfigService,
  ) { }

  ngOnInit(): void {
    this.spinner.show();
    this.http.get<any>(environment.api + 'setting/', {
      headers: this.configService.headers()
    }).subscribe(data => {
      this.spinner.hide();
      console.log(data);
      this.items = data;

    }, error => {
      console.log(error);
    })
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
