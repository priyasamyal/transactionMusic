import {Injectable} from '@angular/core';
import {Http, RequestOptions, URLSearchParams} from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the ApiProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class ApiProvider {

  public server_base_url : string = 'http://transactionmusic.com/api/v1/all-categories?api_token=piDIHsO36SnAaG0tKShrGzUC1ekGuUrQJAHxn2R4tgvJ2VE7yE3stwhX3LZi';


  
  constructor(public http : Http) {
   
  }
  get(endpoint : string, params?: any, options?: RequestOptions) {
    if (!options) {
      options = new RequestOptions();
    }
    // Support easy query params for GET requests
    if (params) {
      let p = new URLSearchParams();
      for (let k in params) {
        p.set(k, params[k]);
      }
      // Set the search field if we have params and don't already have a search field
      // set in options.
      options.search = !options.search && p || options.search;
    }

    return this
      .http
      .get(endpoint, options);
  }

  post(endpoint : string, body : any, options?: RequestOptions) {
    return this
      .http
      .post(endpoint, body, options);
  }

  put(endpoint : string, body : any, options?: RequestOptions) {
    return this
      .http
      .put(endpoint, body, options);
  }

  delete(endpoint : string, body : any, options?: RequestOptions) {
    return this
      .http
      .post(endpoint, body, options);
  }

  patch(endpoint : string, body : any, options?: RequestOptions) {
    return this
      .http
      .put(endpoint, body, options);
  }

}
