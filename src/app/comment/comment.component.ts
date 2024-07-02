import { Component, Input } from '@angular/core';
import { AuthService } from '../auth.service';
import $ from 'jquery';
@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.css'
})
export class CommentComponent {
  @Input()
  userlikes: any;
  @Input()
  userdislikes: any;
  @Input()
  idReview:any;
  @Input()
  rate:number=0;
  @Input()
  review: any;
  @Input()
  username:any;
  @Input()
  likes:any;
  @Input()
  dislikes:any;
max: number=5;
isReadonly: boolean=true;
constructor(private auth : AuthService){}
isLiked(){if(this.userlikes){
  
  return this.userlikes.some((el:any)=>
    el.reviewId===this.idReview);
}}
isDisliked(){
  
  return this.userdislikes.some((el:any)=>
    el.reviewId==this.idReview
  
  );
}
like(element:any){
  const button = element.currentTarget;
  var data = { id : button.value};
    const token=this.auth.getToken();
    const length=this.likes.length;
    const isLiked=this.isLiked();
    $.ajax({
     type: 'POST',
     data: JSON.stringify(data),
     contentType: 'application/json',
     url: 'http://localhost:8080/like/handle',	
     headers: { 'x-access-token':token},
     success: function(data) {
         
         if(data.message === 'like'){
          
          button.innerHTML=`<i class="fa-solid fa-thumbs-up"></i> &nbsp; ${isLiked? length :length+1}`;
          
         }else{
            button.innerHTML=`<i class="fa-regular fa-thumbs-up"></i> &nbsp;  ${ isLiked ?length-1:length}`;
         }
     }

    });
}
dislike(element:any){
  const button = element.currentTarget;
  var data = { id : button.value};
    const token=this.auth.getToken();
    const length=this.dislikes.length;
    const isDisliked=this.isDisliked();
    
    $.ajax({
     type: 'POST',
     data: JSON.stringify(data),
     contentType: 'application/json',
     url: 'http://localhost:8080/dislike/handle',	
     headers: { 'x-access-token':token},
     success: function(data) {
        
         if(data.message === 'dislike'){
          button.innerHTML=`<i class="fa-solid fa-thumbs-down"></i> &nbsp; ${isDisliked ? length : length+1}`;
         }else{
            button.innerHTML=`<i class="fa-regular fa-thumbs-down"></i> &nbsp;  ${ isDisliked ? length-1 : length}`;
         }
     }

    });

}

}
