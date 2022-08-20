import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  [x: string]: any;

  loginData={
    username:'',
    password:'',
  }
  constructor(private snack:MatSnackBar,private login:LoginService,private router:Router) { }

  ngOnInit(): void {
  }
  formSubmit(){
    if (this.loginData.username.trim()==''||this.loginData.username==null) {

      this.snack.open("username is required",'',{
        duration:3000,
      });
      return;

    }
    if (this.loginData.password.trim()==''||this.loginData.password==null) {

      this.snack.open("password is required",'',{
        duration:3000,
      });
      return;
      
    }
    this.login.generateToken(this.loginData).subscribe(
      (data:any)=>{
        console.log("success");
        console.log(data);
        this.login.loginUser(data.token)
        this.login.getCurrentUser().subscribe(
          (user:any)=>{
            this.login.setUser(user);
            if (this.login.getUserRole()=="ADMIN") {

              // window.location.href='/admin';
              this.router.navigate(['admin'])
              // this['loginStatusSubject'].next(true);
              this.login.loginStatusSubject.next(true)

            }
            else if (this.login.getUserRole()=="NORMAL") {
              // window.location.href='/user-dashboard';
              this.router.navigate(['user-dashboard/0'])
              // this['loginStatusSubject'].next(true);
              this.login.loginStatusSubject.next(true)
            }
            else{
              this.login.logout();
              // location.reload();

            }
          }

        );
      },
      (error)=>{
        console.log(error);
        this.snack.open("Invalid details",'ok')

      }
    )
  }
}
