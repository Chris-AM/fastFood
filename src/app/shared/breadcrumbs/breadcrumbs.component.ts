import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: [],
})
export class BreadcrumbsComponent implements OnInit, OnDestroy {
  public title = '';
  public titleSubs: Subscription;

  constructor(private readonly router: Router) {
    this.titleSubs = this.getRoutesTitle().subscribe({
      next: ({ title }) => {
        (this.title = title), (document.title = `Tu Restoran - ${title}`);
      },
    });
  }

  ngOnInit(): void {}

  getRoutesTitle() {
    return this.router.events.pipe(
      filter((event) => event instanceof ActivationEnd),
      filter((event: ActivationEnd) => event.snapshot.firstChild === null),
      map((event: ActivationEnd) => event.snapshot.data)
    );
  }

  ngOnDestroy(): void {
    this.titleSubs.unsubscribe();
  }
}
