import { Component, OnInit, HostListener } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfigService } from '../service/config.service';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {

  @HostListener('window:popstate', ['$event'])
  onPopState(event) {
    console.log('Back button pressed');
    this.modalService.dismissAll();
  }

  transaction: any = [];

  constructor(
    private spinner: NgxSpinnerService,
    private modalService: NgbModal,
    private http: HttpClient,
    private configService: ConfigService,
  ) { }

  ngOnInit(): void {
    this.httpGet();
  }


  httpGet() {
    this.spinner.show();
    this.http.get<any>( environment.api + 'transaction/', {
      headers: this.configService.headers()
    }).subscribe(data => {
      this.spinner.hide();  
      this.transaction = data['transaction'];
 
    }, error => {
      console.log(error);
    })
  }

  item : any = [];
  open(content,obj) {
    this.item = obj;
    console.log(this.item);
    this.modalService.open(content);
  }

}
