interface QRiousStatic {
  new(options?: QRiousOptions): QRiousStatic;
  toDataURL(mime?: string): string;
}

type CorrectionLevel = 'L' | 'M' | 'Q' | 'H';

interface QRiousOptions {
  background?: string;
  backgroundAlpha?: number;
  element?: HTMLElement,
  foreground?: string,
  foregroundAlpha?: number,
  level?: CorrectionLevel;
  padding?: number,
  size?: number,
  value?: string
}


declare module "qrious" {
  export = QRious;
}

declare var QRious: QRiousStatic;
