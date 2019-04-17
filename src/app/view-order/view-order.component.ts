import { Component, Input, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AuthService } from '../auth.service';
import { OrderService } from '../order.service';
import { ActivatedRoute } from '@angular/router';
import { OrderCart } from '../models/order-cart';
import { Order } from '../models/order';


@Component({
  selector: 'view-order',
  templateUrl: './view-order.component.html',
  styleUrls: ['./view-order.component.css']
})
export class ViewOrderComponent implements OnInit {
  @Input('cart') cart: OrderCart;

  orders: any[];
  order$;
  SumOfQuantity=0;
  SumOfPrice=0;




  constructor(
    private route: ActivatedRoute,
    private db: AngularFireDatabase,
    private orderService: OrderService,) { 

      const orderId = route.snapshot.paramMap.get('id');
      this.order$ = orderService.get(orderId);

      orderService.get(orderId).subscribe(orders => {
        this.orders = orders
        
        for(let item of orders.items )
        {
          this.SumOfQuantity = this.SumOfQuantity + item.quantity
          this.SumOfPrice = this.SumOfPrice + item.totalPrice
        }
        
        
      })

      

        
       
          
    }


  ngOnInit(){


  }
}
