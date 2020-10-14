import { Component, OnInit, HostListener } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfigService } from '../service/config.service';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-weekly-performance',
  templateUrl: './weekly-performance.component.html',
  styleUrls: ['./weekly-performance.component.css']
})
export class WeeklyPerformanceComponent implements OnInit {
  @HostListener('window:popstate', ['$event'])
  onPopState(event) {
    console.log('Back button pressed');
    this.modalService.dismissAll();
  }

  weekly : any = [];
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
    this.http.get<any>(environment.api + 'performance/', {
      headers: this.configService.headers()
    }).subscribe(data => {
      this.spinner.hide();  
      console.log(data);
      this.weekly = data['weekly'];
 
    }, error => {
      console.log(error);
    })
  }

}
