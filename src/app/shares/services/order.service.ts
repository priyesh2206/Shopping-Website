import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { ShoppingCartService } from './shopping-cart.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  

  constructor(private db: AngularFireDatabase, private shoppingCartService: ShoppingCartService) { }

  async placeOrder(order){
    let result = await this.db.list('/orders').push(order);
    this.shoppingCartService.clearCart();
    return result;
  }

  getOrders(){
    return this.db.list('/orders');
  } 

  get(orderId){
    return this.db.object('/orders/' + orderId);
  }

  delete(orderId)
  {
    return this.db.object('/orders/' + orderId).remove();
  }

  getOrdersByUser(userId: string){
    return this.db.list('/orders', {
      query: {
        orderByChild: 'userId',
        equalTo: userId
      }
    })
  }
}

//let id = this.route.snapshot.paramMap.get('id');
  //if (id) this.orderService.get(id).take(1).subscribe(o => this.order = o);
      
