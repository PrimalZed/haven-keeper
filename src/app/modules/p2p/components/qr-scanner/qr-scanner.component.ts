import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'qr-scanner',
  templateUrl: './qr-scanner.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QrScannerComponent {
  @Output('scanSuccess') scanSuccessEmitter: EventEmitter<string> = new EventEmitter();

  scanning: boolean = false;
  cameras: MediaDeviceInfo[] = [];
  activeCamera: MediaDeviceInfo | undefined;
  
  constructor(private changeDetectorRef: ChangeDetectorRef) { }

  startScan() {
    this.scanning = true;
    this.changeDetectorRef.markForCheck();
  }

  stopScan() {
    this.scanning = false;
    this.changeDetectorRef.markForCheck();
  }

  camerasFound(cameras: MediaDeviceInfo[]) {
    this.cameras = cameras;
    this.changeDetectorRef.markForCheck();
  }

  scanSuccess(value: string) {
    this.scanSuccessEmitter.emit(value);
  }
}
