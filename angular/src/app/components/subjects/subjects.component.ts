import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'stas-subjects',
    templateUrl: './subjects.component.pug',
    styleUrls: ['./subjects.component.less']
})
export class SubjectsComponent implements OnInit {

    constructor() { }

    ngOnInit() {

    }

    

    /*subjects() { // Allows values to be multicasted to many Observers

let subject = new Rx.Subject(); // It's Observable and Observer (has subscribe, next, error, and complete methods), used when second observer has to get the same events as first.
    let source = Rx.Observable.interval(300).take(5);
    source.subscribe(subject); // Now subject behaves as observable
    // Every time the interval send values to the Subject, the Subject send this values to all his observers
    subject.subscribe(val => console.log(`First subject: ${val}`)); // 0, 1, 2, 3, 4
    setTimeout(() => {
        subject.subscribe(val => console.log(`Second subject: ${val}`)) // 3, 4
    }, 1000);

    let asyncSubject = new Rx.AsyncSubject(); // Emits last value of sequence if it's completed (ideal for ajax (or we can apply toPromise() to RxSubject), emulating promises)
    Rx.Observable.interval(300).take(5)
        .subscribe(asyncSubject);
    asyncSubject.subscribe(val => console.log(`Async subject: ${val}`)); // 4 (only after 1.5sec)

    let behaviourSubject = new Rx.BehaviorSubject('Loading'); // Observer recieves last emited value during subscription and then all other (it guarantees that there will always be at least 1 value emitted)
    Rx.Observable.interval(300).take(5)
        .subscribe(behaviourSubject);
    behaviourSubject.subscribe(val => console.log(`Behaviour subject 1: ${val}`)); // Loading, 0, 1, 2, 3, 4
    setTimeout(() => {
        behaviourSubject.subscribe(val => console.log(`Behaviour subject 2: ${val}`)); // 2, 3, 4
    }, 1000);

    let replaySubject = new Rx.ReplaySubject();
    Rx.Observable.interval(300).take(5)
        .subscribe(replaySubject);
    replaySubject.subscribe(val => console.log(`Replay subject 1: ${val}`)); // 0, 1, 2, 3, 4
    setTimeout(() => {
        replaySubject.subscribe(val => console.log(`Replay subject 2: ${val}`)); // 0, 1, 2, 3, 4
    }, 1000);
    }*/

}
