import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { AoeHexRow } from 'models/aoe-hex-row';
import { combineLatest, Observable, Subject } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { ImageService } from 'services/image.service';

@Component({
  selector: 'aoe',
  templateUrl: './aoe.component.html',
  styleUrls: ['./aoe.component.scss']
})
export class AoeComponent implements OnInit {
  @Input() rows!: AoeHexRow[];
  @ViewChild('canvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;

  private initSubject: Subject<void> = new Subject();

  private subscription = this.initSubject
    .pipe(
      switchMap(() => combineLatest([this.imageService.actorHexBlob$, this.imageService.targetHexBlob$])),
      tap(() => {
        const context = this.canvasRef.nativeElement.getContext('2d');
        const widthHexes = Math.max(
          ...this.rows
            .map(row => row.length + (row.offset ?? 0))
        );
        const svgWidth = 65
        const svgHeight = 75;
        const targetWidth = 180;
        const targetHeight = 90;
        const scaleX = targetWidth / (svgWidth * widthHexes);
        const scaleY = targetHeight / (svgHeight * this.rows.length);
        const scale = Math.min(scaleX, scaleY);
        context?.scale(scale, scale);
      }),
      switchMap(([actorHexBlob, targetHexBlob]) => combineLatest([
        new Observable<void>((subscriber) => {
          const targetHexUrl = URL.createObjectURL(targetHexBlob);
          const targetImage = new Image;
          const context = this.canvasRef.nativeElement.getContext('2d');

          const oddOffset = 63;
          const hexWidth = 126;
          const rows = this.rows;

          targetImage.addEventListener('load', function () {
            rows.forEach((row, index) => {
              const offset = ((row.offset ?? 0) * hexWidth) + (((index + 1) % 2) * oddOffset);
              new Array(row.length)
                .fill(void(0))
                .map((_, hexIndex) => hexIndex)
                .filter((hexIndex) => hexIndex !== row.actor)
                .forEach((hexIndex) => {
                  context?.drawImage(this, offset + (hexIndex * hexWidth), (index * 110));
                });
            });
            URL.revokeObjectURL(targetHexUrl);
            subscriber.next();
            subscriber.complete();
          });

          targetImage.src = targetHexUrl;
  
          return () => {
            URL.revokeObjectURL(targetHexUrl);
          };
        }),
        new Observable<void>((subscriber) => {
          const actorHexUrl = URL.createObjectURL(actorHexBlob);
          const actorImage = new Image;
          const context = this.canvasRef.nativeElement.getContext('2d');

          const oddOffset = 63;
          const hexWidth = 126;
          const rows = this.rows;
          
          actorImage.addEventListener('load', function () {
            rows.forEach((row, index) => {
              const offset = ((row.offset ?? 0) * hexWidth) + (((index + 1) % 2) * oddOffset);
              new Array(row.length)
                .fill(void(0))
                .map((_, hexIndex) => hexIndex)
                .filter((hexIndex) => hexIndex === row.actor)
                .forEach((hexIndex) => {
                  context?.drawImage(this, offset + (hexIndex * hexWidth), (index * 110));
                });
            });
            URL.revokeObjectURL(actorHexUrl);
            subscriber.next();
            subscriber.complete();
          });

          actorImage.src = actorHexUrl;
  
          return () => {
            URL.revokeObjectURL(actorHexUrl);
          };
        })
      ])
      )
      // tap(() => {
      //   const context = this.canvasRef.nativeElement.getContext('2d');
      //   context?.scale(0.1, 0.1);
      // })
    )
    .subscribe();

  constructor(private imageService: ImageService) { }

  ngOnInit(): void {
    this.initSubject.next();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
