import { animate, AnimationBuilder, style } from '@angular/animations';
import { Directive, ElementRef, Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { map, Observable, pairwise, Subject, switchMap } from 'rxjs';

@Directive({
  selector: '[glidePosition]'
})
export class GlidePositionDirective implements OnChanges, OnDestroy {
  @Input('glidePosition') key: any;

  private glideSubject: Subject<void> = new Subject();
  private glide$ = this.glideSubject
    .pipe(
      map(() => this.elementRef.nativeElement.getBoundingClientRect()),
      pairwise(),
      map(([startRect, endRect]) => this.animationBuilder.build([
        style({ transform: `translate(${startRect.x - endRect.x}px, ${startRect.y - endRect.y}px)` }),
        animate('500ms ease-out', style({ transform: '*' }))
      ])),
      map((glideAnimation) => glideAnimation.create(this.elementRef.nativeElement)),
      switchMap((glidePlayer) => {
        var play$ = new Observable((subscriber) => {
          glidePlayer.onDone(() => subscriber.next());
          glidePlayer.onDestroy(() => subscriber.complete());
          return () => {
            glidePlayer.finish();
            glidePlayer.destroy();
          }
        });
        glidePlayer.play();
        return play$;
      })
    );

  private subscription = this.glide$.subscribe();

  constructor(
    private animationBuilder: AnimationBuilder,
    private elementRef: ElementRef<Element>
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.glideSubject.next();
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
