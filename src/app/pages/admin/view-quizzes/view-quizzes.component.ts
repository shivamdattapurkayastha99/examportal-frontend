import { Component, OnInit } from '@angular/core';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-view-quizzes',
  templateUrl: './view-quizzes.component.html',
  styleUrls: ['./view-quizzes.component.css']
})
export class ViewQuizzesComponent implements OnInit {
  quizzes=[
    {
      qId:23,
      title:'Java Exam',
      description:'Core Java',
      maxMarks:'50',
      numberOfQuestions:'20',
      active:'',
      category:{
        title:'Programming'
      },

    },
    {
      qId:24,
      title:'Python Exam',
      description:'python',
      maxMarks:'50',
      numberOfQuestions:'20',
      active:'',
      category:{
        title:'Programming'
      },

    },
  ]

  constructor( private _quiz:QuizService) { }

  ngOnInit(): void {
    this._quiz.quizzes().subscribe(
      (data:any)=>{
        this.quizzes=data
        console.log(this.quizzes);
        
      },
      (error)=>{
        console.log(error);
        
      }
    )
  }
  deleteQuiz(qId:any){
    this._quiz.deleteQuiz(qId).subscribe((data)=>{
    this.quizzes=this.quizzes.filter((quiz)=>quiz.qId!=qId)
      console.log("success");
      

    },(error)=>{
      console.log(error);
      
    });


  }

}
