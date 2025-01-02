import { Component, EventEmitter, Input, input, Output } from '@angular/core';
import { CatModel } from '../_models/cat-model';

@Component({
  selector: 'app-cat',
  standalone: true,
  imports: [],
  templateUrl: './cat.component.html',
  styleUrl: './cat.component.css'
})
export class CatComponent {
  @Input() cat: CatModel | undefined = undefined;
  @Output() canceled = new EventEmitter<void>();
  @Output() saved = new EventEmitter<CatModel>();
  isVisible: boolean = true;

  getvalue(event: any): string {
    return event.target.value;
  }
  cancel() {
    this.canceled.emit();
  }
  getNumberValue(event: any): number {
    return Number(event.target.value);
  }
  save() {
    this.saved.emit(this.cat);
  }
  getBooleanValue(event: any): boolean {
    return event.target.checked;
  }
}
