import { EventEmitter, Injectable } from '@angular/core';

import { Product } from './product.model';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators';
@Injectable()
export class ProductService {
  productSelected = new EventEmitter<Product>();
  private products: Product[] = [];
 //private products: Product[] = [
   //new Product(1, 'Playstation 5', 'Dit is een gave playstation 5!', 'eenrandomimage.png', 35.99),
  //new Product(2, 'Playstation 4', 'Dit is een gave playstation 4!', 'eenrandomimage.png', 35.99),
  //];

  constructor(private http: HttpClient) {}
 /* getProducts() {
    return this.products.slice();
  }
*/



  // async getProducts() : Promise<Product[]> {
  //   let arrayProducts : Product[] = [];
  //   await this.http
  //   .get<{message: string, products: any[]}>(
  //     'http://localhost:3000/api/products'
  //   )
  //   .pipe(map((productenData) => {
  //     return productenData.products.map(product => {
  //       return {
  //         naam: product.naam,
  //         description: product.description,
  //         imagePath: product.imagePath,
  //         price: product.price,
  //         id: product._id
  //       }
  //     })
  //   }))
  //   .subscribe((transformedProducts) => {
  //     for(let i = 0; i < transformedProducts.length; i++) {
  //       arrayProducts.push(transformedProducts[i]);
  //     }
  //     //this.products = transformedProducts;
  //   });
  //   return arrayProducts;
  // }

  getProducts(): Product[] {
    this.products.length = 0;
    this.http.get('http://localhost:3000/api/products').subscribe(response => {
      response['products'].forEach((product) => {
        this.products.push(new Product(product.naam, product.description, product.imagePath, product.price, product._id));
      })
    })
    return this.products;
  }

  getProduct(id: number) {
    console.log(this.products);
    console.log(this.products.find(x => x.id === 'id'));
    console.log(' TEST');

      return this.products.find(x => x.id === 'id');
  }



  addProduct(naam: string, description: string, imagePath: File, price: string) {
    const productData = new FormData();
    productData.append("naam", naam);
    productData.append("description", description);
    productData.append("imagePath", imagePath, naam);
    productData.append("price", price);
    this.http.post<{message: string, product: Product}>('http://localhost:3000/api/products/new', productData)
    .subscribe((responseData) => {
      const product: Product = 
      {
        naam: naam, description: description, imagePath: responseData.product.imagePath, price: price, id: responseData.product.id
      } 
      this.products.push(product);
    });
  }

  deleteProduct(id: string) {
    this.http.delete('http://localhost:3000/api/products/delete/' + id)
    .subscribe(() => {
      console.log('verwijderd');
    });

  }


}
function naam(arg0: string, naam: any) {
  throw new Error('Function not implemented.');
}

