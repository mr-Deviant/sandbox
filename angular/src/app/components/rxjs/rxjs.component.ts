import { Component, OnInit } from '@angular/core';
import { Observable, Subject, fromEvent, pipe, merge, concat, forkJoin } from 'rxjs';
import { map, takeUntil, switchMap, flatMap } from 'rxjs/operators';

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
    switchMap: string[] = [];
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
        this.testSwitchMap();
        this.testMerge();
        this.testConcat();
        this.testforkJoin();
        this.testflatMap();
    }

    init(): void {
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

    testSwitchMap(): void { // TODO
        this.firstObservable$.pipe(
            switchMap(data => this.secondOnservable$)
        )
        .subscribe((data: string) => {
            this.switchMap.push(data);
        });
    }

    testMerge(): void {
        merge(
            this.firstObservable$,
            this.secondOnservable$
        )
        .subscribe((data: string) => {
            this.merge.push(data);
        });
    }

    testConcat(): void {
        concat(
            this.firstObservable$,
            this.secondOnservable$
        )
        .subscribe((data: string) => {
            this.concat.push(data);
        });
    }

    testforkJoin(): void {
        forkJoin(
            this.firstObservable$,
            this.secondOnservable$
        )
        .subscribe((data) => { // TODO: specify correct type
            // this.forkJoin = data;
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
            .subscribe((data: string) => {
                this.flatMap.push(data);
            });
    }

    //combineLatest

    //pairwise
}
