import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BankComponent } from './bank/bank.component';
import { ItemsCartComponent } from './items/items-cart/items-cart.component'; 
import { ItemsComponent } from './items/items.component';
import { LoginComponent } from './login/login.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { ProfileComponent } from './profile/profile.component';
import { TransactionComponent } from './transaction/transaction.component';
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  
  { path: 'items', component: ItemsComponent,  canActivate: [AuthGuard]  }, 
  { path: 'items/cart', component: ItemsCartComponent ,  canActivate: [AuthGuard] },
  
  { path: 'transcation', component: TransactionComponent,  canActivate: [AuthGuard]  },
  { path: 'login', component: LoginComponent,  canActivate: [AuthGuard]  },
  { path: 'bank', component: BankComponent,  canActivate: [AuthGuard]  }, 
  { path:'profile', component:ProfileComponent,  canActivate: [AuthGuard] },
  { path: '**', component: NotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{ useHash:true}) ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
