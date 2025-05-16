import {ChangeDetectionStrategy, Component, computed, effect, signal} from '@angular/core';



@Component({
  selector: 'app-basic-first-child',
  imports: [],
  templateUrl: './first-child.component.html',
  styleUrl: './first-child.component.css',
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class FirstChildComponent {
  restored = Number(sessionStorage.getItem(`counter`));
  counter = signal<number>(this.restored || 0)
  doubleCounter = computed(()=> {
    this.counter();
    console.log('computing double counter  ', this.counter());
    return this.counter()*2;
  })

  ef=effect(()=> {
    console.log('inside the effect',this.counter());
    sessionStorage.setItem(`counter`, String(this.counter()));
  });

  constructor(
  ) {

  }
  protected color(): string {
    return this.colorPicker(this.counter());
  }

  protected increment(): void {
    this.counter.update((oldValue)=> oldValue+1);
    //this.persist();
  }

  protected reset(): void {
    this.counter.set(400);
    this.counter.set(200);
    this.counter.set(500);
    setTimeout(()=> { this.counter.set(0);},100)
    //this.persist();
  }

  // private persist(): void {
  //   sessionStorage.setItem(`counter`, String(this.counter()));
  //   console.log("persisted");
  // }

  private colorPicker (n: number) : string {
    const colors=[  "#d98324",
      "#a40606",
      "#0f4c5c",
      "#6c9a8b",
      "#c1d7ae",
    ];
    return colors[n %5];
  }
}
