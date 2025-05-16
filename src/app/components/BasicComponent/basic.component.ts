import {ChangeDetectionStrategy, Component, ElementRef, OnInit, Renderer2, signal, ViewChild} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {FirstChildComponent} from './first-child/first-child.component';
import {SecondChildComponent} from './second-child/second-child.component';

@Component({
  selector: 'basic-component',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,FirstChildComponent, SecondChildComponent],
  templateUrl: './basic.component.html',
  styleUrl: './basic.component.css',
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class BasicComponent{
   color () : string {
     console.log('Basic Component')
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
