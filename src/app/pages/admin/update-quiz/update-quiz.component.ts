import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-update-quiz',
  templateUrl: './update-quiz.component.html',
  styleUrls: ['./update-quiz.component.css']
})
export class UpdateQuizComponent implements OnInit {

  constructor(private _route:ActivatedRoute,private _quiz:QuizService,private _cat:CategoryService,private _router:Router) { }
  qId=0;
  quiz: any;
  categories: any;
  ngOnInit(): void {
    this.qId=this._route.snapshot.params['qid'];
    this._quiz.getQuiz(this.qId).subscribe(
      (data:any)=>{
        this.quiz=data;

      },
      (error)=>{
        console.log(error);

        
      }
    );
    this._cat.categories().subscribe((data:any)=>{
      this.categories=data;

    },
    error=>{
      console.log("error");
      

    })
    
  }
  public updateData(){
    this._quiz.updateQuiz(this.quiz).subscribe((data)=>{
        this._router.navigate(['/admin/quizzes'])
    },(error)=>{
      console.log(error);
      
    })
  }
}
