import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.css'
})
export class CommentComponent {
  @Input()
  rate:number=0;
  @Input()
  review: any;
  @Input()
  username:any;
max: number=5;
isReadonly: boolean=true;
}
