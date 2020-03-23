import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, from, fromEvent, range, combineLatest, concat, merge, race, zip, forkJoin } from 'rxjs';
import { distinct, map, filter, reduce, takeUntil, withLatestFrom, buffer, concatMap, mergeMap, switchMap,          retry, retryWhen, delay, scan, takeWhile, tap } from 'rxjs/operators';
import * as $ from 'jquery';

@Component({
    selector: 'stas-rxjs',
    templateUrl: 'rxjs.component.html',
    styleUrls: ['./rxjs.component.less']
})
export class RxjsComponent implements OnInit {
    firstObservable$;
    secondObservable$;
    combineLatest: string[] = [];
    concat: string[] = [];
    merge: string[] = [];
    race: string[] = [];
    withLatestFrom: string[] = [];
    zip: string[] = [];
    forkJoin: string[] = [];
    buffer: string[] = [];
    concatMap: string[] = [];
    mergeMap: string[] = [];
    switchMap: string[] = [];

    constructor(
        private http: HttpClient
    ) { }

    ngOnInit() { // ngAfterContentInit
        this.init();

        // COMBINATION OPERATORS
        this.testCombineLatest();
        this.testConcat();
        this.testMerge();
        this.testRace();
        this.testWithLatestFrom();
        this.testZip();
        this.testforkJoin();

        // TRANSFORMATION OPERATORS
        this.testBuffer();
        this.testConcatMap();
        this.testMergeMap();
        this.testSwitchMap();

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
        this.secondObservable$ = fromEvent(document.querySelector('input[name="second"]'), 'keypress')
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
        combineLatest(this.firstObservable$, this.secondObservable$).subscribe(
            ([first, second]) => {
                this.combineLatest.push(first + '-' + second);
            }
        );
    }

    testConcat(): void {
        concat(
            this.firstObservable$,
            this.secondObservable$
        )
            .subscribe((data: string) => {
                this.concat.push(data);
            });
    }

    testMerge(): void {
        merge(
            this.firstObservable$,
            this.secondObservable$
        )
            .subscribe((data: string) => {
                this.merge.push(data);
            });
    }

    testRace(): void {
        race(
            this.firstObservable$,
            this.secondObservable$
        )
            .subscribe((data: string) => {
                this.race.push(data);
            });
    }

    testWithLatestFrom(): void {
        this.firstObservable$
            .pipe(withLatestFrom(this.secondObservable$))
            .subscribe(([first, second]) => {
                this.withLatestFrom.push(first + '-' + second);
            });
    }

    testZip(): void {
        zip(
            this.firstObservable$,
            this.secondObservable$
        )
            .subscribe((data: string) => {
                this.zip.push(data);
            });
    }

    testforkJoin(): void {
        forkJoin(
            this.firstObservable$,
            this.secondObservable$
        )
            .subscribe(([first, second]: [string, string]) => {
                this.forkJoin.push(first + '-' + second);
            });
    }

    testBuffer(): void {
        this.firstObservable$
            .pipe(buffer(this.secondObservable$))
            .subscribe((data: string) => {
                this.buffer.push(data);
            });
    }

    testConcatMap(): void { // concatMap is equivalent to mergeMap with concurrency parameter set to 1.
        this.firstObservable$
            .pipe(concatMap(event => this.secondObservable$, (firstValue, secondValue) => {
                return firstValue + '-' + secondValue;
            }))
            .subscribe((data: string) => {
                this.concatMap.push(data);
            });
    }

    testMergeMap(): void { // flatMap
        this.firstObservable$
            .pipe(
                mergeMap(firstValue => this.secondObservable$, (firstValue, secondValue) => {
                    return firstValue + '-' + secondValue;
                })
            )
            .subscribe((data: string) => {
                this.mergeMap.push(data);
            });
    }

    testSwitchMap(): void { // TODO
        this.firstObservable$.pipe(
            switchMap(data => this.secondObservable$, (firstValue, secondValue) => {
                return firstValue + '-' + secondValue;
            })
        )
        .subscribe((data: string) => {
            this.switchMap.push(data);
        });
    }

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



    toggleImage(imgSelector) {
        $(imgSelector).slideToggle();
    }
}
