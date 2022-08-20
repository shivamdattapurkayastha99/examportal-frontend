import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {
  [x: string]: boolean;
  qid:any
  questions:any
  marksGot=0
  correctAnswers=0
  attempted=0
  isSubmit=false
  timer:any



  constructor(private locationSt:LocationStrategy,private _route:ActivatedRoute,private _question:QuestionService) { }

  ngOnInit(): void {
    this.preventBackButton();
    this.qid=this._route.snapshot.params['qid'];
    this.loadQuestions()


  }
  loadQuestions(){
    this._question.getQuestionsofQuizForTest(this.qid).subscribe((data:any)=>{
      console.log(data);
      this.questions=data
      this.timer=this.questions.length*2*60

      this.questions.forEach((q: any) => {
        q['givenAnswer']='';

        
      });
      this.startTimer();

      
    },(error)=>{
      console.log(error);
      
    })
  }
  preventBackButton(){
    history.pushState(null,null,location.href);
    this.locationSt.onPopState(()=>{
      history.pushState(null,null,location.href)

    })
  }
  evalQuiz(){
    // this['isSubmit']=true
    // this.questions.forEach((q: { givenAnswer: any; answer: any; })=>{
    //   if (q.givenAnswer==q.answer) {
    //     this.correctAnswers++
    //     let marksSingle=this.questions[0].quiz.maxMarks/this.questions.length
    //     this.marksGot+=marksSingle

        
    //   }
    //   if (q.givenAnswer.trim()!='') {
    //     this.attempted++;

        
    //   }
    // })
    this._question.evalQuiz(this.questions).subscribe((data:any)=>{
      console.log(data);
      this.marksGot=data.marksGot;
      this.correctAnswers=data.correctAnswers;
      this.attempted=data.attempted;
      this.isSubmit=true;
      

      
    },(error)=>{
      console.log(error);
      
    })
  }
  submitQuiz(){
    this.evalQuiz()
  }
  
  startTimer(){
    let t=window.setInterval(()=>{
      if (this.timer<=0) {
        this.submitQuiz()
        clearInterval(t)
        
      }
      else{
        this.timer--;

      }
    },1000)
  }

  getFormattedTime(){
    let mm=Math.floor(this.timer/60)
    let ss=this.timer-mm*60
    return `${mm} min:${ss} sec`
  }
}
