import {ChangeDetectionStrategy, Component, signal} from '@angular/core';
import {interval} from 'rxjs';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-basic-second-child',
  imports: [
    DatePipe
  ],
  templateUrl: './second-child.component.html',
  styleUrl: './second-child.component.css',
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class SecondChildComponent {
  // using
  time = signal<Date>( new Date());
  constructor() {
    // interval(1000).pipe(takeUntilDestroyed()).subscribe(()=>
    // {
    //  this.time.set(new Date());
    // })
  }
  color () : string {
    console.log('Second Component')
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
    return colors[randomNumber %20];
  }

  clickMe(){
    console.log('just a click');
  }
}
