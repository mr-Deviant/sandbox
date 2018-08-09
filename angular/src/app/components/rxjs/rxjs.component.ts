import { Component, OnInit } from '@angular/core';
import { Observable, Subject, fromEvent, pipe, merge, concat, forkJoin } from 'rxjs';
import { map, takeUntil, flatMap } from 'rxjs/operators';

// import 'rxjs/add/operator/takeUntil';
// import 'rxjs/add/observable/fromEvent';
// import 'rxjs/add/observable/merge';
// import 'rxjs/add/observable/concat';
// import 'rxjs/add/observable/forkJoin'
// import 'rxjs/add/operator/mergeMap'; // flatMap
// import 'rxjs/add/operator/map';


// import { Observable, Subject, asapScheduler, pipe, of, from, interval, merge, fromEvent, SubscriptionLike, PartialObserver } from 'rxjs';
// import { map, filter, scan } from 'rxjs/operators';


@Component({
    selector: 'stas-rxjs',
    templateUrl: 'rxjs.component.pug',
    styleUrls: ['./rxjs.component.less']
})
export class RxjsComponent implements OnInit {
    firstObservable$;
    secondOnservable$;
    merge: string[] = [];
    concat: string[] = [];
    forkJoin: string[] = [];
    flatMap: string[] = [];

    constructor() { }

    // https://github.com/ReactiveX/rxjs/blob/master/docs_app/content/guide/v6/migration.md#pipe-syntax
    // switchMap - 71
    // Concat - 27
    // combineLatest - 25
    // Merge - 20
    // mergeMap - 9
    // concatMap - 9
    // forkJoin - 7
    // Zip - 3
    // Race - 0

    ngOnInit() { // ngAfterContentInit
        this.init();
        this.testMerge();
        this.testConcat();
        this.testforkJoin();
        this.testflatMap();
    }

    init() {
        let firstCompleted$ = new Subject();
        let secondCompleted$ = new Subject();

        this.firstObservable$ = fromEvent(document.querySelector('input[name="first"]'), 'keypress')
            .pipe(
                map((event: any) => String.fromCharCode(event.which || event.keyCode)),
                takeUntil(firstCompleted$)
            );
        this.secondOnservable$ = fromEvent(document.querySelector('input[name="second"]'), 'keypress')
            .pipe(
                map((event: any) => String.fromCharCode(event.which || event.keyCode)),
                takeUntil(secondCompleted$)
            );

        fromEvent(document.querySelector('#completeFirst'), 'click')
            .subscribe(event => firstCompleted$.next());
        fromEvent(document.querySelector('#completeSecond'), 'click')
            .subscribe(event => secondCompleted$.next());
    }

    testMerge() {
        merge(
            this.firstObservable$,
            this.secondOnservable$
        )
        .subscribe(data => {
            this.merge.push(data);
        });
    }

    testConcat() {
        concat(
            this.firstObservable$,
            this.secondOnservable$
        )
        .subscribe(data => {
            this.concat.push(data);
        });
    }

    testforkJoin() {
        forkJoin(
            this.firstObservable$,
            this.secondOnservable$
        )
        .subscribe(data => {
            this.forkJoin = data;
        });
    }

    //MergeMap,

    //switchMap

    testflatMap() {
        this.firstObservable$
            .pipe(
                flatMap(firstValue => this.secondOnservable$, (firstValue, secondValue) => {
                    return firstValue + '-' + secondValue;
                })
            )
            .subscribe(data => {
                this.flatMap.push(data);
            });
    }

    //combineLatest

    //pairwise
}
