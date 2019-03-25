import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Response } from '@angular/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ReactiveFormsService {

    constructor(private http: HttpClient) { }

    getFriends(): Observable<Object> {
        return this.http.get('/api/friends.json')
            .pipe(
                //map((response: Response) => response.json()),
                catchError((error: HttpErrorResponse) => throwError(error))
            );
    }
}
