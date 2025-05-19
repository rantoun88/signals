import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, signal} from '@angular/core';
import {interval, Observable, take} from 'rxjs';
import {AsyncPipe, DatePipe} from '@angular/common';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-basic-second-child',
  imports: [
    DatePipe,
    AsyncPipe,

  ],
  templateUrl: './second-child.component.html',
  styleUrl: './second-child.component.css',
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class SecondChildComponent implements OnInit{
  // using plane member variables
  time = new Date();
  // using Observable with Sync Pipe in html
  time$:Observable<Date> =  interval(1000).pipe(take(100),map(()=> new Date()));
  // using Signal
  constructor( private  changeDR: ChangeDetectorRef) {

  }

  ngOnInit(): void {
   this.time$.subscribe((date:Date)=>
    {
      this.time= date;

    })
    }
  color () : string {
    console.log('Second Component rerendered')
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
