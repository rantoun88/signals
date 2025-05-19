import {ChangeDetectionStrategy, Component, computed, effect, signal, WritableSignal} from '@angular/core';
import {tap} from 'rxjs';
import {AsyncPipe} from '@angular/common';
import {toObservable} from '@angular/core/rxjs-interop';
import {map} from 'rxjs/operators';



@Component({
  selector: 'app-basic-first-child',
  imports: [
    AsyncPipe
  ],
  templateUrl: './first-child.component.html',
  styleUrl: './first-child.component.css',
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class FirstChildComponent {
  // WritableSignal
  counter = signal<number>( 0)
  //
  doubleCounter = computed(()=> {
    this.counter();
    console.log('inside computed');
    return this.counter()*2 ;
  })

  doubleCounter$ = toObservable(this.counter).pipe(map(n=> n*2),tap(()=> console.log('inside observable')));

  protected increment(): void {
    this.counter.update((oldValue)=> oldValue+1);
  }

  protected reset(): void {
    // this.counter.set(400);
    // this.counter.set(100);
    // this.counter.set(800);
    // this.counter.set(900);
    // this.counter.set(1500);
    this.counter.set(0);
  }

  color () : string {
    //console.log('First Component rerendered')
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

}
