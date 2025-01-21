import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseURL: string = "https://localhost:44310/api/Library/";
  constructor(private http: HttpClient) {}

  register(user:any){
    return this.http.post(this.baseURL+'Register',user,{
      responseType: 'text',
    });
  }

  login(info:any){
    let params = new HttpParams()
    .append('email',info.email)
    .append('password',info.password);

    return this.http.get(this.baseURL + 'Login',{
      params: params,
      responseType: 'text'
    });
  }
}
