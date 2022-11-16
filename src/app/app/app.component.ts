import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { delay, filter } from 'rxjs/operators';
import { VisualFeedbackService } from './shared/visual-feedback/visual-feedback.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  title = 'cuic-frontend';
  loading = false;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private visualFeedbackService: VisualFeedbackService,
    private titleService: Title,
    private snackBar: MatSnackBar
  ) {}
  // Dynamically Setting the Title of the Webpage
  ngOnInit() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        const rt = this.getChild(this.activatedRoute);
        rt.data.subscribe((data) => {
          this.titleService.setTitle(data.title);
        });
      });
      
      this.visualFeedbackService.loadingChange$.pipe(delay(0)).subscribe((loading) => {

        this.loading = loading
      });

      this.visualFeedbackService.snackBarTrigger$.subscribe((data) => {

        //show snackbar
        this.snackBar.open(data.message, '', {duration: data.delay || 1500});
      })
  }
  
  getChild(activatedRoute: ActivatedRoute) {
    if (activatedRoute.firstChild) {
      return this.getChild(activatedRoute.firstChild);
    } else {
      return activatedRoute;
    }
  }
}
