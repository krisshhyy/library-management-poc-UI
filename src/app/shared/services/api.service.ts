import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Subject } from 'rxjs';
import { User, UserType } from '../../models/models';
import { Book } from '../../models/models';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseURL: string = "https://localhost:44310/api/Library/";
  userStatus: Subject<string> = new Subject();

  constructor(private http: HttpClient, private jwt: JwtHelperService) {}

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

  isLoggedIn(): boolean{
    if(localStorage.getItem('access_token')!=null && !this.jwt.isTokenExpired()) return true;
    return false;
  }

  getUserInfo(): User | null {
    if (!this.isLoggedIn()) return null;
    var decodedToken = this.jwt.decodeToken();
    var user: User = {
      id: decodedToken.id,
      firstName: decodedToken.firstName,
      lastName: decodedToken.lastName,
      email: decodedToken.email,
      mobileNumber: decodedToken.mobileNumber,
      userType: UserType[decodedToken.userType as keyof typeof UserType],
      accountStatus: decodedToken.accountStatus,
      createdOn: decodedToken.createdOn,
      password: '',
    };
    return user;
  }

  logOut(){
    localStorage.removeItem('access_token');
    this.userStatus.next('loggedOff');
  }

  getBooks(){
    return this.http.get<Book[]>(this.baseURL+'GetBooks');
  }
}
