
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute ,Router } from '@angular/router';
import { PublicationService } from '../publication.service';
import { FavoriteService } from '../favorite.service';
import { AuthService } from '../auth.service';
import $ from 'jquery';
import { LikeService } from '../like.service';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrl: './image.component.css'
})
export class ImageComponent implements OnInit{
  reviews: any;
  likes: any;
  dislikes:any;
onSubmit() {
  if(this.detail ==="" && this.formRating===0){
    this.message="Please Fill at least one of them";

  }else{
    this.imageService.createReview({rate:this.formRating,review:this.detail,pubId : this.id}).subscribe((data :any)=>{
      if(data.message){
        this.message=data.message;
        setTimeout(()=>window.location.reload(),1000);
      }
    });
  }
}
  hasComment=false;
  id:any;
  title:any;
  image: any;
  favs:any;
  max = 5;
  rate = 0;
  isReadonly = true;
formRating=0;
detail="";
message="";
constructor(private route : ActivatedRoute,private imageService : PublicationService,private router:Router,private favoriteService : FavoriteService,private auth :AuthService,private likeService : LikeService)
{}
ngOnInit(){

this.favoriteService.getUserFavorites().subscribe((data)=>{
   
    if(data.favorites){
      this.favs=data.favorites;
    }
});
if(this.route.snapshot.paramMap.get('id') && this.route.snapshot.paramMap.get('title')){
  this.id=this.route.snapshot.paramMap.get('id');
  this.title=this.route.snapshot.paramMap.get('title');
  this.imageService.getAverageRate(this.id).subscribe((data :any)=>{
    
    this.rate=data.avg;
  })
  this.imageService.hasReview(this.id).subscribe((data:any)=>{
    this.hasComment=data.has;
  });
 this.imageService.getPublication(this.id,this.title).subscribe((data :any)=>{
  
  if(data.image){
      this.image=data.image;
      
  }else{
    this.router.navigate(['error']);
  }
 });
 this.likeService.getUserLikesDislikes().subscribe(data=>{
  
  
    this.likes=data.likes;
    this.dislikes=data.dislikes;
  
 })
 
 this.imageService.getReviews(this.id).subscribe((data:any)=>{
  if(data.reviews){
    this.reviews=data.reviews;
     }
 });

}

}



onClick(element :any){
  const button = element.currentTarget;
  var data = { publicationId : button.value};
    const token=this.auth.getToken();
    
    $.ajax({
     type: 'POST',
     data: JSON.stringify(data),
     contentType: 'application/json',
     url: 'http://localhost:8080/favorites/handle',	
     headers: { 'x-access-token':token},
     success: function(data) {
         
         if(data.message === 'favorite'){
          button.innerHTML='<i class="fa-solid fa-heart"></i>';
         }else{
            button.innerHTML='<i class="fa-regular fa-heart"></i>';
         }
     }

    });
  }
exist(id :number){
  return this.favs.some((el:any)=> el.publicationId===id);
}
}
