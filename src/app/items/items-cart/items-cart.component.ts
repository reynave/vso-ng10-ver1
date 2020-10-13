import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfigService } from 'src/app/service/config.service';
import { Router } from '@angular/router';

export class Customer {

  constructor(
    public phone: string,
    public name: string,
    public address: string,
    public email: string
  ) { }

}

@Component({
  selector: 'app-items-cart',
  templateUrl: './items-cart.component.html',
  styleUrls: ['./items-cart.component.css']
})
export class ItemsCartComponent implements OnInit {
  editCustomer: boolean = false;
  brand: any = [];
  data: any = [];
  brandId: string = "1";
  branchesId: string;
  selectBranches: any = [];
  items: any = [];
  loading: string;
  transactionCode: string;
  code: string;
  currency: string = "Rp ";
  total: number = 0;
  cart: any = [];
  itemDetail: any = [];
  customer: any = {
    phone: "",
    name:  "",
    address:  "",
    email:  "",
  }; 

  constructor(
    private spinner: NgxSpinnerService,
    private http: HttpClient,
    private configService: ConfigService,
    private modalService: NgbModal,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.httpCart();

  }

  httpCart() {
    this.loading = "Update...";
    this.http.get<any>(environment.api + 'cart/', {
      headers: this.configService.headers()
    }).subscribe(data => {
      console.log(data);
      this.customer = data['customer'];
      this.loading = null;
      this.total = data['total'];
      this.cart = data['cart'];
      this.selectBranches = data['branches'];
      this.branchesId = data['transaction']['branchesId'];
      this.transactionCode = data['transactionCode'];
      if (this.customer === null || this.customer == "") {
        this.editCustomer = true;
        this.customer = new Customer(null, null,null,null);
      } else {
        this.customer = new Customer(this.customer['phone'], this.customer['name'], this.customer['address'], this.customer['email']);
      }
    }, error => {
      console.log(error);
    })
  }

 

  updateBranches() {
    this.http.post<any>(environment.api + "cart/updateBranches/", this.branchesId, {
      headers: this.configService.headers()
    }).subscribe(
      () => {

      },
      error => {
        console.log(error);
      }
    );
  }

  onUpdateCustomer() {
    this.http.post<any>(environment.api + "cart/onUpdateCustomer/", this.customer, {
      headers: this.configService.headers()
    }).subscribe(
      data => {
        this.editCustomer = false;
        console.log(data);
      },
      error => {
        console.log(error);
      }
    );
  }

  back() {
    window.history.back();
  }

  onSubmit() {
    this.spinner.show();
    console.log(this.transactionCode)
    const body = {
      transactionCode : this.transactionCode 
    }
    this.http.post<any>(environment.api + "cart/onSubmit/", body, {
      headers: this.configService.headers()
    }).subscribe(
      data => {
        console.log(data);
        this.spinner.hide(); 
        this.router.navigate(['transcation']); 
      },
      error => {
        console.log(error);
      }
    );

  }

  onAutoCustomer() {
    this.spinner.show();
    console.log('onAutoCustomer phone :' + this.customer['phone']);
    const body = {
      phone: this.customer['phone'],
    }
    this.http.post<any>(environment.api + "cart/onAutoCustomer/", body, {
      headers: this.configService.headers()
    }).subscribe(
      data => {
        this.spinner.hide();
        if (data['name'] !== null) this.customer['name'] = data['name'];
        if (data['address'] !== null) this.customer['address'] = data['address'];
        if (data['email'] !== null) this.customer['email'] = data['email'];
      },
      error => {
        console.log(error);
      }
    );
  }

  open(content, obj) {
    this.itemDetail = obj;
    this.modalService.open(content, { size: 'xl' });
  }

  updateItem() {

    this.http.post<any>(environment.api + "cart/updateItem/", this.itemDetail, {
      headers: this.configService.headers()
    }).subscribe(
      data => {
        console.log(data);
        this.httpCart();
        this.modalService.dismissAll();
      },
      error => {
        console.log(error);
      }
    );
  }


  removeItem() {
    this.http.post<any>(environment.api + "cart/removeItem/", this.itemDetail, {
      headers: this.configService.headers()
    }).subscribe(
      data => {
        console.log(data);
        this.httpCart();
        this.modalService.dismissAll();
      },
      error => {
        console.log(error);
      }
    );
  }



}
