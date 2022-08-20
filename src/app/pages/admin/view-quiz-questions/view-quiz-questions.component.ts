import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';

@Component({
  selector: 'app-view-quiz-questions',
  templateUrl: './view-quiz-questions.component.html',
  styleUrls: ['./view-quiz-questions.component.css']
})
export class ViewQuizQuestionsComponent implements OnInit {
  qId: any;
  qTitle: any
  questions=[];
  constructor(
    private _route:ActivatedRoute,
    private _question:QuestionService,
    private _snack:MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.qId=this._route.snapshot.params['qId']
    this.qTitle=this._route.snapshot.params['title'];
    this._question.getQuestionsofQuiz(this.qId).subscribe((data:any)=>{
      console.log(data);
      this.questions=data
      
    },(error)=>{
      console.log(error);
      
    }
    )

    
  }
  deleteQuestion(qid:any){
    console.log(qid);
    this._question.deleteQuestion(qid).subscribe(
      (data)=>{
        this._snack.open('Question Deleted','ok')
      }
    )
    this.questions=this.questions.filter((q)=>q.quesId!=qid)
    
  }
  

}
