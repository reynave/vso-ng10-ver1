import { Component, OnInit, HostListener } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfigService } from '../service/config.service';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {

  @HostListener('window:popstate', ['$event'])
  onPopState(event) {
    console.log('Back button pressed');
    this.modalService.dismissAll();
  }

  brand: any = [];
  data: any = [];
  brandId: string;;
  items: any = [];
  loading: string;
  transactionCode: string;
  code: string;
  currency: string = "Rp ";
  total: number = 0;
  cart: any = [];
  branchesId: string;
  customer: any = null;
  brandName : string;

  itemsDetail: any = [];
  constructor(
    private spinner: NgxSpinnerService,
    private modalService: NgbModal,
    private http: HttpClient,
    private configService: ConfigService,
  ) { }

  ngOnInit(): void {
    this.httpGet();
    this.httpCart();
  }


  httpGet() {
    this.spinner.show();
    this.http.get<any>(environment.api + 'item/', {
      headers: this.configService.headers()
    }).subscribe(data => {
      this.spinner.hide();
      console.log(data);
      this.brand = data['brand']; 
      this.items = data['items'];   
 
    }, error => {
      console.log(error);
    })
  }
 

  httpCart() { 
    this.loading = "Loading...";
    this.http.get<any>(environment.api + 'cart/', {
      headers: this.configService.headers()
    }).subscribe(data => {
    
      this.branchesId = data['transaction']['branchesId'];
      this.brandId = data['transaction']['brandId'];
      
      this.brandName = data['brandName']; 

      this.customer = data['customer'];
      this.loading = null;
      this.total = data['total'];
      this.cart = data['cart'];
      this.transactionCode = data['transactionCode'];
    }, error => {
      console.log(error);
    })
  }

  clearCart(brandId){ 
    const body = {
      brandId : brandId,
    }
    this.brandId=null;
    this.total = 0;
    this.http.post<any>(environment.api + "cart/clearCart",body, {
      headers: this.configService.headers()
    }).subscribe(
      data=>{
        console.log(data);
      },
      error=>{
        console.log(error);
      }
    );
  }
  open(content, obj) { 
    this.itemsDetail = obj;
    this.modalService.open(content, { size: 'xl' });
  }

  addToCart() {
    var total = 0;
    
    this.itemsDetail.price.forEach(elm => {
      total += elm['cart'];
    });
   
     if (total > 0) {
      this.http.post<any>(environment.api + "item/addToCart", this.itemsDetail, {
        headers: this.configService.headers()
      }).subscribe(
        data => { 
          console.log(data);
          this.httpCart();
        }
      )
    }
    this.modalService.dismissAll();
  }


  onSelectBrand(obj){ 
    console.log(obj);
    this.http.post<any>(environment.api + "item/onSelectBrand", obj, {
      headers: this.configService.headers()
    }).subscribe(
      data => { 
        this.httpCart();
        this.httpGet();
      }
    )
  }


}
