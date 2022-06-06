import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { shareReplay } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  public actorHexBlob$ = this.http.get(`${environment.basePath}/assets/images/general/aoe-actor.svg`, { responseType: 'blob' })
    .pipe(shareReplay(1));
  public targetHexBlob$ = this.http.get(`${environment.basePath}/assets/images/general/aoe-target.svg`, { responseType: 'blob' })
    .pipe(shareReplay(1));
    
  constructor(private http: HttpClient) { }
}
