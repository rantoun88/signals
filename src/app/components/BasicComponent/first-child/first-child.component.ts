import {
  ChangeDetectionStrategy,
  Component,
  computed,
  signal,
} from '@angular/core';
import { tap} from 'rxjs';
import {toObservable} from '@angular/core/rxjs-interop';
import {map} from 'rxjs/operators';



@Component({
  selector: 'app-basic-first-child',
  templateUrl: './first-child.component.html',
  styleUrl: './first-child.component.css',
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FirstChildComponent {
  // WritableSignal
  counter = signal<number>( 0)
  showCount = signal(true);

  // computed Signal
  doubleCounter = computed(()=> {
    console.log('inside computed');
    return  this.counter() * 2
  });


  // lazy + memorized + dynamic
  // doubleCounter = computed(()=> {
  //   console.log('inside computed');
  //   const star = this.showCount()?  '*': '';
  //   return star + this.counter()*2 + star ;
    // if(this.showCount()){
    //   // if showCount is false then  counter will no longer be considered a dependency of doubleCounter
    //   return this.counter()*2;
    // }
    // else {
    //   return 0;
    // }
  //})

  doubleCounter$ = toObservable(this.counter)
    .pipe(map(n=> n*2),
      tap(()=> console.log('inside observable')));

  protected increment(): void {
    //update() operation to compute a new value from the previous one
    this.counter.update((oldValue)=> oldValue+1);
  }

  protected reset(): void {
    this.counter.set(0);
  }

  color () : string {
    const randomNumber = Math.floor(Math.random() * 20);
    const colors: string[] = [
      '#FF0000',
      '#008000',
      '#0000FF',
      '#FFFF00',
      '#00FFFF',
      '#FF00FF',
      '#FFA500',
      '#800080',
      '#FFC0CB',
      '#A52A2A',
      '#808080',
      '#0000AA',
      '#FF0000',
      '#00FF00',
      '#800000',
      '#808000',
      '#000080',
      '#008080',
      '#C0C0C0',
      '#FFD700'
    ];
    return colors[randomNumber % 20];
  }

  toggleShowCount() {
    this.showCount.update(show=> !show);
  }

}
