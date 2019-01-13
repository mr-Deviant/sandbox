import { Component } from '@angular/core';
import { Observable, Subject, AsyncSubject, BehaviorSubject, ReplaySubject, interval } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
    selector: 'stas-subjects',
    templateUrl: './subjects.component.pug',
    styleUrls: ['./subjects.component.less']
})
export class SubjectsComponent {

    constructor() {
        // this.subject();

        // this.asyncSubject();

        // this.behaviorSubject();

        this.replaySubject();
    }

    subject() {
        let subject$ = new Subject();
        interval(300).pipe(
            take(5)
        ).subscribe(subject$); // Now subject behaves as observable
        // Every time the interval send values to the Subject, the Subject send this values to all his observers
        subject$.subscribe(val => console.log(`First subject: ${val}`)); // 0, 1, 2, 3, 4
        setTimeout(() => {
            subject$.subscribe(val => console.log(`Second subject: ${val}`)) // 3, 4
        }, 1000);
    }

    asyncSubject() {
        let asyncSubject$ = new AsyncSubject();
        interval(300).pipe(
            take(5)
        )
        .subscribe(asyncSubject$);
        asyncSubject$.subscribe(val => console.log(`First async subject: ${val}`)); // 4 (only after 1.5sec)
        // Subscribe after it will complete
        setTimeout(() => {
            asyncSubject$.subscribe(val => console.log(`Second async subject: ${val}`)) // 4
        }, 2000);
    }

    behaviorSubject() {
        let behaviourSubject$ = new BehaviorSubject(-1); 
        interval(300).pipe(
            take(5)
        ).subscribe(behaviourSubject$);
        behaviourSubject$.subscribe(val => console.log(`First behaviour subject: ${val}`)); // -1, 0, 1, 2, 3, 4
        setTimeout(() => {
            behaviourSubject$.subscribe(val => console.log(`Second behaviour subject: ${val}`)); // 2, 3, 4
        }, 1000);
    }

    replaySubject() {
        let replaySubject$ = new ReplaySubject(2); // Buffer 2 values for new subscribers
        interval(300).pipe(
            take(5)
        ).subscribe(replaySubject$);
        replaySubject$.subscribe(val => console.log(`Replay subject 1: ${val}`)); // 0, 1, 2, 3, 4
        setTimeout(() => {
            replaySubject$.subscribe(val => console.log(`Replay subject 2: ${val}`)); // 1, 2, 3, 4
        }, 1000);
    }
}
