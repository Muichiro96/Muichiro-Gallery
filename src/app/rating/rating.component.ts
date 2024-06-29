import { Component ,Input} from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrl: './rating.component.css'
})
export class RatingComponent {
@Input()
rating: any;
max: number=5;
isReadonly: boolean=true;
}
