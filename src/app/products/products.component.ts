import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../product.service';
import { CategoryService } from '../category.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../models/product';
import { ShoppingCartService } from '../shopping-cart.service';
import { Subscription } from 'rxjs'; 

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy{

  products: Product[] = [];
  filteredProducts: Product[] = [];
  private _searchTerm: string;
  get searchTerm(): string{
    return this._searchTerm;
  }

  set searchTerm(value: string) {
    this._searchTerm = value;
    this.filteredProducts = this.filtereProducts(value);
  }


  filtereProducts(searchString: string){
    return this.products.filter(product => 
      product.title.toLowerCase().indexOf(searchString.toLowerCase()) !== -1);


  }



  categories$;
  category: string;
  cart: any;
  subscription: Subscription;


  constructor(
    route: ActivatedRoute,
    productsService: ProductService, 
    categoryService: CategoryService,
    private shoppingCartService: ShoppingCartService
    ) {

    

    productsService.getAll().subscribe(products => {
      this.products = products
      

      route.queryParamMap.subscribe(params => {
        this.category = params.get('category');
  
        this.filteredProducts = (this.category) ?
          this.products.filter(p => p.category === this.category) : 
          this.products;
          
    }); 

    });
    this.categories$ = categoryService.getAll();

     
   }



   async ngOnInit()
   {

      this.subscription = (await this.shoppingCartService.getCart())
      .subscribe(cart => this.cart = cart);
   }

   ngOnDestroy()
   {
     this.subscription.unsubscribe();
   }


}
