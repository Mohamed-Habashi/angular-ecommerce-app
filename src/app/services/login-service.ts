import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {environment} from '../../environments/environment.development';
import {IuserLogin} from '../models/iuserLogin';
import {IUserData} from '../models/iuser-data';
import {ILogin} from '../models/ilogin';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private httpClient: HttpClient) {
    if (localStorage.getItem('token')) {
      this.loadUserData();
    }
  }

  private userSubject= new BehaviorSubject<IUserData|null>(null);
  user$=this.userSubject.asObservable();

  userLogin(newUser:ILogin):Observable<IuserLogin>{
    return this.httpClient.post<IuserLogin>(`${environment.baseUrl}auth/login.php`,newUser);
  }

  checkLogin():boolean{
    return !!localStorage.getItem('token');
  }

  getUserData():Observable<IUserData>{
   return this.httpClient.get<IUserData>(`${environment.baseUrl}auth/profile.php`)
  }

  loadUserData(){
    this.getUserData().subscribe({
      next:(res)=>{
        this.userSubject.next(res);
      },
      error:()=>{},
      complete:()=>{},
    })
  }

  logout():any{
    this.httpClient.post(
      `${environment.baseUrl}auth/signout.php`,
      localStorage.getItem('token'),
    )
  }
}
