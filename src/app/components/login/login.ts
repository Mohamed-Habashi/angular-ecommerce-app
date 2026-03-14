import {Component, OnInit, signal} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {LoginService} from '../../services/login-service';
import {ILogin} from '../../models/ilogin';
import {Router} from '@angular/router';
import {IUserData} from '../../models/iuser-data';

@Component({
  selector: 'app-login',
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements OnInit {
  loginForm!:FormGroup;
  constructor(private _loginService:LoginService,private _router:Router) {
  }

  ngOnInit(): void {
        this.loginForm=new FormGroup({
          email:new FormControl('', [Validators.required, Validators.email]),
          password:new FormControl('',[Validators.required, Validators.minLength(6)]),
        })
    }

  userLogin(){
    if(this.loginForm.invalid)return;
    const formValue=this.loginForm.value;
    this._loginService.userLogin(formValue).subscribe({
      next:(res)=>{
        console.log(res)
        localStorage.setItem('token',res.data.token);
        // this.getUserInfo();
        this._loginService.loadUserData();
        this._router.navigateByUrl('/Home');
      },
      complete:()=>{},
      error:()=>{},
    });
  }



}
