import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlertComponentCustom } from './alert.component';

@NgModule({
    imports: [CommonModule],
    declarations: [AlertComponentCustom],
    exports: [AlertComponentCustom]
})
export class AlertModule { }