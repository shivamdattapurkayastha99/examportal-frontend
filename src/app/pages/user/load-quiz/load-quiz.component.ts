import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-load-quiz',
  templateUrl: './load-quiz.component.html',
  styleUrls: ['./load-quiz.component.css']
})
export class LoadQuizComponent implements OnInit {
  catId:any
  quizzes:any
  constructor(private _route:ActivatedRoute,private _quiz:QuizService) { }

  ngOnInit(): void {
    
    this._route.params.subscribe((params)=>{
      console.log(params);
      this.catId=params.catId
      if (this.catId==0) {
        console.log("load all quiz");
        this._quiz.getActiveQuizzes().subscribe(
          (data:any)=>{
            this.quizzes=data
  
  
          },
          (error)=>{
            console.log(error);
            
          }
        )
        
      }
      else{
        console.log("load specific quiz");
        // this.quizzes=[]
        this._quiz.getActiveQuizzesofCategory(this.catId).subscribe(
          (data:any)=>{
            this.quizzes=data

          },
          (error)=>{
            console.log(error);
            
          }
        )
  
        
      }
      
    })
    
  }

}
