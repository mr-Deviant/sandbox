import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, from, fromEvent, range, merge, concat, forkJoin, combineLatest } from 'rxjs';
import { distinct, map, filter, reduce, takeUntil, switchMap, flatMap, retry, retryWhen, delay, scan, takeWhile, tap } from 'rxjs/operators';
import $ from 'jquery';

@Component({
    selector: 'stas-rxjs',
    templateUrl: 'rxjs.component.pug',
    styleUrls: ['./rxjs.component.less']
})
export class RxjsComponent implements OnInit {
    firstObservable$;
    secondOnservable$;
    combineLatest: string[] = [];
    switchMap: string[] = [];
    merge: string[] = [];
    concat: string[] = [];
    forkJoin: string[] = [];
    flatMap: string[] = [];

    constructor(
        private http: HttpClient
    ) { }

    // https://github.com/ReactiveX/rxjs/blob/master/docs_app/content/guide/v6/migration.md#pipe-syntax
    // - switchMap - 71
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
        this.testCombineLatest();

        this.testFlatMap();
        this.testSwitchMap();
        this.testMerge();
        this.testConcat();
        this.testforkJoin();

        this.createObservables();

        this.loadAjax();
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

    testCombineLatest() {
        combineLatest(this.firstObservable$, this.secondOnservable$).subscribe(
            ([first, second]) => {
                this.combineLatest = [first, second];
            }
        );
    }

    testFlatMap() { // mergeMap
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
        .subscribe(([first, second]: [string, string]) => { // TODO: specify correct type +
            console.log(first, second);
            this.forkJoin = [first, second];
        });
    }

    //MergeMap,

    //switchMap

    //combineLatest


    ///// Create observables /////

    createObservables() {
        // this.observableCreate();
        // this.observableFrom();
        // this.observableRange();
        // this.observableFromEvent();
    }

    observableCreate() {
        let observable$ = new Observable(observer => { // Observer: is a collection of callbacks that knows how to listen to values delivered by the Observable
            try {
                observer.next(1);
                observer.next(2);
                setTimeout(() => {
                    observer.next(3);
                    // observer.error('Shit happens');
                    observer.complete();
                }, 1000);
            } catch (err) {
                observer.error(err); // Delivers an error if it caught one
            }

            // Provide a way of canceling and disposing the interval resource
            return function unsubscribe() {
            	// Clean stuff
            };
        });

        let subscription = observable$.subscribe(
            value => console.log('Create value: ' + value), // Create value: 1, Create value: 2, ... Create value: 3, Complete
            error => console.error('Something wrong occurred: ' + error),
            () => console.log('Complete')
        );

        setTimeout(() => {
            subscription.unsubscribe();
        }, 1001);
    }

    observableFrom() {
        from([4, 4, 5, 6])
            .pipe(distinct()) // !!!!! Emits only element that haven't been emited before
            .subscribe(value => console.log('From value: ', value)) // From value: 4, From value: 5, From value: 6
            .unsubscribe();
    }

    observableRange() {
        range(7, 4)
            .pipe(
                filter(item => item % 2 === 0), // !!!!! 8, 10 - Test each element and return only satisfying the rule
                map(item => item + 1), // !!!!! 9, 11 - Apply function to each element
                reduce((prev, cur) => prev + cur) // !!!!! 20 - Single result of applying a function over each element
            )
            .subscribe(value => console.log('Range value: ', value)) // Range value: 20
            .unsubscribe();
    }

    observableFromEvent() {
        fromEvent(document.querySelector('input[name="first"]'), 'keydown')
            .subscribe(event => console.log('FromEvent value: ', (event as any).key)); // FromEvent value: 1, FromEvent value: 2, ...
    }

    ///// Load Ajax /////

    private subscription$;
    private unsubscribe$: Subject<void> = new Subject();

    loadAjax() {
        this.subscription$ = this.http.get('https://api.github.com/users' + 'error')
            .pipe(
                // retry(3), // !!! Retry 3 times more
                retryWhen(errors => {
                    return errors.pipe(
                        scan((accumulator, value) => { // Use attempts counter
                            return accumulator + 1;
                        }, 0),
                        takeWhile(accumulator => accumulator < 4), // Limit to 3 attempts
                        delay(1000) // Wait 1 second between attempts
                    );
                }),
                takeUntil(this.unsubscribe$) // Or this.subscription.unsubscribe();
            )
            .subscribe(data => {
                console.log(data);
            });

        const subscription = from(fetch('https://api.github.com/users').then(data => data.json())) // Promise
            .subscribe(data => {
                console.log('Promise data:', data);
            });

        this.subscription$.add(subscription); // Unsubscribe will work for all even added subscriptions
    }

    ngOnDestroy() {
        this.subscription$.unsubscribe();
        // Or
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }

    toggleImage(event) {
        const img = $(event.target).next();

        if (img.is('img')) {
            img.slideToggle();
        }
    }

}
