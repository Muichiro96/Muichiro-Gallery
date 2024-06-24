import { Component ,TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Observable, Observer } from 'rxjs';
import { FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.css'
})
export class GalleryComponent {
  fg : FormGroup;
  modalRef?: BsModalRef;
  isPublished: Boolean=false;
  constructor(private fb : FormBuilder,private modalService : BsModalService,private http : HttpClient){
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
  publish(){
    this.isPublished=true;
    console.log(this.fg.value);
    
  

    if(this.fg.valid){

    }
  }
  openModal(template: TemplateRef<void>) {
    this.modalRef = this.modalService.show(template);
  }

}
