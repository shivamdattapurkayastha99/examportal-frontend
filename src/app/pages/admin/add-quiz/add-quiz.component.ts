import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css']
})
export class AddQuizComponent implements OnInit {
  categories=[
    
  ]
  quizData={
    title:'',
    description:'',
    maxMarks:'',
    numberOfQuestions:'',
    active:true,
    category:{
      cid:'',
    },


  };

  constructor(private _cat:CategoryService,private _snack:MatSnackBar,private _quiz:QuizService) { }

  ngOnInit(): void {
    this._cat.categories().subscribe(
      (data:any)=>{
        this.categories=data;
        console.log(this.categories);
        
      },
      (error)=>{
        console.log(error);

        
      }
    )
  }
  addQuiz(){
    if (this.quizData.title.trim()==''||this.quizData.title==null) {

      this._snack.open("Title required",'',{
        duration:3000
      })
      return;

    }
return this._quiz.addQuiz(this.quizData).subscribe(
  (data:any)=>{
    console.log("success");
    this.quizData={
      title:'',
      description:'',
      maxMarks:'',
      numberOfQuestions:'',
      active:true,
      category:{
        cid:'',
      },
  
  
    };
    
  },
  (error:any)=>{
    console.log("error");
    
  });

  }
}
