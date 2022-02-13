import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class VisualFeedbackService {

    loadingChange$ = new BehaviorSubject<boolean>(false);

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

    showSnackbar(message: string) {
        
    }
}