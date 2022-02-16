import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, pipe, Subject, UnaryFunction } from 'rxjs';
import { catchError, filter } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

@Injectable({
    providedIn: 'root',
})
export class VisualFeedbackService {

    constructor(private authService: AuthService) { }

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

    snackBarTrigger$ = new Subject<{message: string, delay?: number}>();

    snackBar(message: string, delay?: number) {

        this.snackBarTrigger$.next({message, delay});
    }

    ////////////////////
    // Error Handling
    ////////////////////

    standardApiErrorHandling(): UnaryFunction<Observable<any>, Observable<any>> {
            
        const snackBar = (snackBarMessage: string) => {

            this.snackBar(snackBarMessage, 5000);
        }

        return pipe(

            catchError((err: HttpErrorResponse) => {

                //check if token expired and logout if yes
                if('is_expired' in err.error) {
                    console.log("Fdfd");
                    if(err.error.is_expired) {

                        this.authService.logout();
                    }

                } else {

                    console.log(err);
                }

                snackBar(err.error.response?.message.error || 'Something went wrong');

                return of(null);
            }),

            filter((res) => res !== null)
                
        )
        
    }
}