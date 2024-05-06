import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { map, filter } from 'rxjs/operators';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  private firstObsSubscription: Subscription;

  constructor() { }

  ngOnInit() {

     // this.firstObsSubscription = interval(1000).subscribe(count => {
    //     console.log(count);
    //   });

    const customIntervalObservable = new Observable<number>((observer) => {
      let count = 0;
      const intervalId = setInterval(() => {
        observer.next(count);
        if(count==2){
          observer.complete();
        }
        if(count>3){
          observer.error(new Error('count is greater than 3!!'));
        }
        count++;
      }, 1000);

      // Teardown logic
      return () => {
        clearInterval(intervalId);
      };
    });

   ;

    this.firstObsSubscription =  customIntervalObservable.pipe(filter(data=>{
      return data>0;
    }),map((data:number)=>{
      return "Round: "+(data+1);
    })).subscribe((count) => {
      console.log(count);
    },error=>{
      console.log(error);
      alert(error.message);
    },()=>{
      console.log("completed");
    });
  }

  ngOnDestroy(): void {
    this.firstObsSubscription.unsubscribe();
  }
}
