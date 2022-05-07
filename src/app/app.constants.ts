import { InjectionToken } from '@angular/core'

export const QRIOUS_OPTIONS = new InjectionToken<QRiousOptions>(
  "QRIOUS_OPTIONS",
  {
    providedIn: 'root',
    factory: () => ({
      foreground: '#303030',
      backgroundAlpha: 0.5,
      size: 400
    })
  }
);
