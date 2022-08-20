import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private userService:UserService,private snack: MatSnackBar) { }
  public user={
    username:'',
    password:'',
    firstname:'',
    lastname:'',
    email:'',
    phone:'',
  }
  ngOnInit(): void {
  }
  formSubmit(){
    alert("submit");
    console.log(this.user);
    if (this.user.username==""||this.user.username==null) {
      // alert('user is required')
      this.snack.open("Username is required","ok",{
        verticalPosition:'top',
        horizontalPosition:'right',
      })
      return;
      
    }
    this.userService.addUser(this.user).subscribe(
      (data)=>{
        console.log(data);
        alert("success");

        
      },
      (error)=>{
          console.log(error);
          alert("error");

          
      }
    )

  }

}
