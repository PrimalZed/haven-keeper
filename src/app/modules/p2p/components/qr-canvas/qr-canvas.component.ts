import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, ElementRef, Input, OnDestroy, ViewChild } from '@angular/core';
import * as Qrious from 'qrious';
import { combineLatest, ReplaySubject, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'qr-canvas',
  templateUrl: './qr-canvas.component.html'
})
export class QrCanvasComponent implements OnDestroy {
  @Input() set value(v: string) {
    this.drawQrSubject.next(v)
  }

  @ViewChild('qrCanvas', { static: true }) canvasRef!: ElementRef<HTMLElement>;

  private drawQrSubject: Subject<string> = new ReplaySubject(1);
  private drawQr$ = combineLatest([
    this.drawQrSubject,
    this.breakpointObserver.observe([
      Breakpoints.XSmall,
      Breakpoints.Small,
      Breakpoints.Medium,
      Breakpoints.Large,
      Breakpoints.XLarge
    ])
  ])
    .pipe(
      tap(([value, { breakpoints }]) => {
        new Qrious({
          element: this.canvasRef.nativeElement,
          value: value,
          foreground: '#303030',
          backgroundAlpha: 0.5,
          size: (() => {
            if (breakpoints[Breakpoints.XSmall]) {
              return 250;
            }
            else if (breakpoints[Breakpoints.Small]) {
              return 300;
            }
            else if (breakpoints[Breakpoints.Medium]) {
              return 400;
            }
            else if (breakpoints[Breakpoints.Large]) {
              return 400;
            }
            // XLarge
            return 400;
          })()
        });
      })
    );

  private subscription = this.drawQr$.subscribe();
  
  constructor(
    private breakpointObserver: BreakpointObserver
  ) { }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
