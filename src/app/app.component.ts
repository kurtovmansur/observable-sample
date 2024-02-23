import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { debounceTime, filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor() {
    //this.sample1();
    this.sample2();
  }

  sample1() {
    let ob1 = new Observable<number>((observer) => {
      observer.next(100);
      observer.next(200);
      observer.next(300);
      observer.error('error');
    });

    let sub1 = ob1.subscribe({
      next: (_) => {
        console.log('NEXT called, value:', _);
      },
      error: (er) => {
        console.log('Error', er);
      },
      complete: () => {
        console.log('COMPETED');
      },
    });

    let sub2 = ob1.subscribe({
      next: (_) => {
        console.log('sub2 NEXT called, value:', _);
      },
      error: (er) => {
        console.log('sub2 Error', er);
      },
      complete: () => {
        console.log('sub2 COMPETED');
      },
    });
    sub1.unsubscribe();
    sub2.unsubscribe();
  }

  sample2() {
    let ob1 = new Observable<number>((o) => {
      o.next(100);
      o.next(123);
      o.next(125);
    });
    let sub1 = ob1
      .pipe(
        map((m) => {
          return { id: m, name: `name ${m}` };
        }),
        filter((f) => f.id != 123),
        debounceTime(1000) //NATIJANI SHUNCHA VAQTDAN KEYIN OBROBOTKA QILADI

      )
      .subscribe((s) => {
        console.log('sample2 result:', s);
        //sub1.unsubscribe();
      });
  }
}
