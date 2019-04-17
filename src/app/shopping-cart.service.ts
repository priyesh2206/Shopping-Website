import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { Product } from './models/product';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';
import { ShoppingCart } from './models/shopping-cart';
import { Observable } from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  static getCart(): any {
    throw new Error("Method not implemented.");
  }

  constructor(private db: AngularFireDatabase) { }

  async getCart(): Promise<Observable<ShoppingCart>> {
    let cartId = await this.getOrCreateCartId();
    return this.db.object('/shopping-carts/' + cartId)
      .map(x => new ShoppingCart(x.items));
  }

  async addToCart(product: Product) {
    this.updateItem(product, 1);
    // let cartId = await this.getOrCreateCartId();
    // let item$ = this.getItem(cartId, product.$key);
    // item$.take(1).subscribe(item => {
    //   item$.update({ product: product, quantity: (item.quantity || 0) + 1 });  
    // });

  }

  async removeFromCart(product: Product){
    this.updateItem(product, -1);
    // let cartId = await this.getOrCreateCartId();
    // let item$ = this.getItem(cartId, product.$key);
    // item$.take(1).subscribe(item => {
    //   item$.update({ product: product, quantity: (item.quantity || 0) - 1 });  
    // });
  }

  async clearCart(){
    let cartId = await this.getOrCreateCartId();
    this.db.object('/shopping-carts/' + cartId + '/items').remove();
  }


  private create(){
    return this.db.list('/shopping-carts').push({
      dataCreated: new Date().getTime()
    });
  }

  
  private getItem(cartId: string, productId: string)
  {
    return this.db.object('/shopping-carts/' + cartId + '/items/' + productId);
  }



  private async getOrCreateCartId(): Promise<string>{
    let cartId = localStorage.getItem('cartId');
    if (cartId) return cartId;

      let result = await this.create();
      localStorage.setItem('cartId', result.key);
      return result.key;
     }

  

  private async updateItem(product: Product, change: number){
    let cartId = await this.getOrCreateCartId();
    let item$ = this.getItem(cartId, product.$key);
    item$.take(1).subscribe(item => {
      let quantity = (item.quantity || 0) + change 
      if(quantity === 0) item$.remove();
      else item$.update({ 
        //product: product,
        title: product.title,
        imageUrl: product.imageUrl,
        price: product.price,
        quantity: quantity
      });  
    });
  }
}
