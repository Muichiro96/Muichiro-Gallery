import { Component ,TemplateRef ,OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PublicationService } from '../publication.service';
import { FavoriteService } from '../favorite.service';
import  $ from 'jquery';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.css'
})
export class GalleryComponent implements OnInit{
  max = 5;
  rate =0;
  isReadonly = true;
  fg : FormGroup;
  modalRef?: BsModalRef;
  pubs: any;
  favs: any;
  ar:any;
  isPublished: Boolean=false;
  imageUploaded: any ;
  message: String="";
isSuccess:  Boolean=false;
isDanger:  Boolean=false;
  constructor(private fb : FormBuilder,private modalService : BsModalService,private http : HttpClient,private pubService : PublicationService,private favoriteService : FavoriteService,private auth:AuthService){
    this.message ="";
    this.fg=this.fb.group({
      name : ['',[Validators.required]],
      description : ['',[Validators.required, Validators.minLength(50)]],
      image : [null,[Validators.required]],
      check : ['',Validators.requiredTrue]
    })
  }
  get name(){
    return this.fg.get('name');
  }
  get description(){
    return this.fg.get('description');
  }
  get image(){
    return this.fg.get('image');
  }
  get check(){
    return this.fg.get('check');
  }
  onChange(element : any){
    this.imageUploaded = element.target.files[0];
    if(element.target.files[0].type.startsWith("image/")){
      this.isDanger=false;
      this.isSuccess=false;
      this.message="";
    }else{
      this.message="Please upload an image";
      this.isDanger=true;
      this.isSuccess=false;
    }}
  publish(){
    let formData = new FormData();
    this.isPublished=true;
   
    
  

    if(this.fg.valid){
        formData.append("image",this.imageUploaded,this.imageUploaded.name);
        formData.append("title",this.fg.value.name);
        formData.append("description",this.fg.value.description);
        this.pubService.createPublication(formData).subscribe((data : any)=>{
          if(data.message){
      this.isDanger=false;
      this.isSuccess=true;
      this.message=data.message;
          }else{
            this.isDanger=false;
      this.isSuccess=false;
      this.message="";
      
          }
        })
    }
  }
  openModal(template: TemplateRef<void>) {
    this.modalRef = this.modalService.show(template);
  }
  ngOnInit(){
    this.message ="";
    this.favoriteService.getUserFavorites().subscribe((data)=>{
        console.log(data)
        if(data.favorites){
          this.favs=data.favorites;
        }
    });
    this.pubService.getPublications().subscribe((data : any)=>{
      if(data.publications){
      this.pubs=data.publications;}});
      
  }
  exist(id :number){
    return this.favs.some((el:any)=> el.publicationId===id);
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
  }

