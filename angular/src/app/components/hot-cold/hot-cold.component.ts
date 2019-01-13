import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { share, publish } from 'rxjs/operators';

@Component({
    selector: 'stas-hot-cold',
    templateUrl: './hot-cold.component.pug',
    styleUrls: ['./hot-cold.component.less']
})
export class HotColdComponent {

    constructor() {
    	// this.cold();

    	this.coldMakeHot();

    	// this.hot();
    }

    cold() {
		const observable$ = Observable.create((observer) => {
			observer.next(Math.random()); // Data produced inside observable
		});

		observable$.subscribe((data) => {
			console.log('First subscription:', data); // First subscription: 0.4094810378447036
		});

		observable$.subscribe((data) => {
			console.log('Second subscription:', data); // Second subscription: 0.5161994483413404
		});
    }

// https://blog.angular-university.io/angular-2-rxjs-common-pitfalls/
// https://medium.com/codingthesmartway-com-blog/getting-started-with-rxjs-part-3-hot-and-cold-observables-4713757c9a88
// https://alligator.io/rxjs/hot-cold-observables/
// https://blog.thoughtram.io/angular/2016/06/16/cold-vs-hot-observables.html

    coldMakeHot() {
    	const observable$ = Observable.create((observer) => {
			observer.next(Math.random());
			// setTimeout(() => {
			// 	observer.next(Math.random());
			// }, 1000);
		}).pipe(
			// share()
			// OR publish & connect
			publish()
		);

		observable$.connect();

		observable$.subscribe((data) => {
			console.log('First subscription:', data); // First subscription: 0.5346840507763866
		});

		observable$.subscribe((data) => {
			console.log('Second subscription:', data); // Second subscription: 0.5346840507763866
		});
    }

    hot() {
    	const random = Math.random(); // Data produced outside observable

		const observable$ = Observable.create((observer) => {
		    observer.next(random);
		});

		observable$.subscribe((data) => {
		  console.log('First subscription:', data); // First subscription: 0.9839217198820209
		});

		observable$.subscribe((data) => {
		   console.log('Second subscription:', data); // Second subscription: 0.9839217198820209
		});
    }

}
