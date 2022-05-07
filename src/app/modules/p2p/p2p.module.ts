import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { QrScannerComponent } from 'src/app/modules/p2p/components/qr-scanner/qr-scanner.component';
import { MatModule } from 'src/app/mat.module';
import { P2pBottomComponent } from './components/p2p-bottom/p2p-bottom.component';
import { P2pGuestComponent } from './components/p2p-guest/p2p-guest.component';
import { P2pHostConnectionComponent } from './components/p2p-host/p2p-host-connection.component';
import { P2pHostComponent } from './components/p2p-host/p2p-host.component';
import { P2pMainComponent } from './components/p2p-main/p2p-main.component';
import { P2pTopComponent } from './components/p2p-top/p2p-top.component';
import { P2pComponent } from './p2p.component';
import { SharedModule } from 'shared/shared.module';
import { CommonModule } from '@angular/common';
import { P2pHelpComponent } from './components/p2p-help/p2p-help.component';

const routes: Routes = [
  { path: '', component: P2pComponent }
];

@NgModule({
  declarations: [
    P2pComponent,
    P2pBottomComponent,
    P2pMainComponent,
    P2pHostComponent,
    P2pHostConnectionComponent,
    P2pGuestComponent,
    P2pTopComponent,
    QrScannerComponent,
    P2pHelpComponent,
    
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatModule,
    RouterModule.forChild(routes),
    SharedModule,
    ZXingScannerModule
  ]
})
export class P2pModule { }
