import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfigService } from 'src/app/service/config.service';
import { Router } from '@angular/router';

export class Customer {

  constructor(
    public id: string,
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
  transaction: any;
  transactionCode: string;
  code: string;
  currency: string = "Rp ";
  total: number = 0;
  cart: any = [];
  itemDetail: any = [];
  pickup:string = "";
  customer: any = {
    phone: "",
    name: "",
    address: "",
    email: "",
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
    this.spinner.show();
    this.http.get<any>(environment.api + 'cart/', {
      headers: this.configService.headers()
    }).subscribe(data => {
      console.log(data);
      this.spinner.hide();
      this.selectBranches = data['branches'];
     
      this.updateArray(data);
    }, error => {
      console.log(error);
    })
  }

  updateArray(data){
    this.customer = data['customer'];
    this.transaction = data['transaction'];
    this.loading = null;
    this.total = data['total'];
    this.cart = data['cart'];
  
    this.branchesId = data['transaction']['branchesId'];
    this.transactionCode = data['transactionCode'];
    if (this.customer === null || this.customer == "") {
      this.editCustomer = true;
      this.customer = new Customer(null, null, null, null, null);
    } else {
      this.customer = new Customer(this.customer['id'],this.customer['phone'], this.customer['name'], this.customer['address'], this.customer['email']);
    }
  }

  updateBranches() {
    this.http.post<any>(environment.api + "cart/updateBranches/", this.branchesId, {
      headers: this.configService.headers()
    }).subscribe(
      (data) => {
        console.log(data); 
        this.updateArray(data);
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
        this.updateArray(data);
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

    if (this.transaction['branchesId'] === null) {
      alert("Please select outlet location!");
    }
    else if (this.pickup == "") {
      alert("Please input pickup location!");
    }
    else { 

      this.spinner.show();
      console.log(this.transactionCode)
      const body = {
        transactionCode: this.transactionCode,
        pickup:this.pickup
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

  }
  userId: string;
  checkName : boolean = false;
  onAutoCustomer() {
    this.spinner.show();
    this.checkName = true;
    console.log('onAutoCustomer name :' + this.customer['name']);
    const body = {
      name: this.customer['name'],
    }
    this.http.post<any>(environment.api + "cart/onAutoCustomer/", body, {
      headers: this.configService.headers()
    }).subscribe(
      data => {
        this.checkName = false;
        console.log(data);
        this.spinner.hide();
        this.userId = data['id'];
        if (data['phone'] !== null) this.customer['phone'] = data['phone'];
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
