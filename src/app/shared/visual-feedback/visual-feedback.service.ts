import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, of, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class VisualFeedbackService {

    ///////////////////
    // Loading
    ///////////////////

    loadingChange$ = new BehaviorSubject<boolean>(false);

    get loading(): boolean {

        return this.loadingChange$.value;
    }

    loadingMap = new Map<string, boolean>();

    setLoading(url: string, loading: boolean) {

        if (!url) {

            throw new Error('The request URL must be provided to the VisualFeedbackService.setLoading function');
        }

        if (loading === true) {

            this.loadingMap.set(url, loading);

            this.loadingChange$.next(true);

        }else if (loading === false && this.loadingMap.has(url)) {

          this.loadingMap.delete(url);
        }

        if (this.loadingMap.size === 0) {

            this.loadingChange$.next(false);
        }
    }

    ////////////////////
    // Snackbar
    ////////////////////

    snackBarTrigger$ = new Subject<string>();

    set snackBar(message: string) {

        this.snackBarTrigger$.next(message);
    }

    ////////////////////
    // Error Handling
    ////////////////////
    
    standardApiErrorHandling(err?: HttpErrorResponse, caught?: unknown) {

        console.log(err.error.response.message.error);

        this.snackBar = err.error.response.message.error;

        return of(null);
    }
}