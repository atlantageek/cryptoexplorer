import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Rx';

@Injectable()
export class CoinService {


  constructor(private http:Http) { }
    // Uses http.get() to load a single JSON file
  getCoins():Observable<{}[]> {
    return this.http.get('http://localhost:3000/coins').map((res:Response) => res.json());
  }

}
