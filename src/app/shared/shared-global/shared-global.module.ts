import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule} from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatProgressBarModule} from '@angular/material/progress-bar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTreeModule } from '@angular/material/tree';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { NgxCurrencyModule } from "ngx-currency";
import { NgxMaskModule, IConfig } from 'ngx-mask'

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BaseDialogErrorComponent } from '../components/base-dialog-error/base-dialog-error.component';
import { BaseListFilterComponent } from '../components/base-list-filter/base-list-filter.component';
import { BaseListRegisterComponent } from '../components/base-list-register/base-list-register.component';
import { BaseRegisterComponent } from '../components/base-register/base-register.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BaseComboFilterComponent } from '../components/base-combo-filter/base-combo-filter.component';
import { BaseFormDebugComponent } from '../components/base-form-debug/base-form-debug.component';

const maskConfig: Partial<IConfig> = {
  validation: false,
};

@NgModule({
  declarations: [
    BaseDialogErrorComponent,
    BaseListFilterComponent,
    BaseListRegisterComponent,
    BaseRegisterComponent,
    BaseComboFilterComponent,
  ],
  imports: [
    NgxMaskModule.forRoot(maskConfig),
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    MatMenuModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatFormFieldModule,  
    MatIconModule,
    MatInputModule,
    MatInputModule,
    MatListModule,
    MatProgressBarModule,
    MatSidenavModule,
    MatTableModule,
    MatToolbarModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    MatSlideToggleModule,
    MatSelectModule,
    NgxMatSelectSearchModule,
    MatTreeModule,
    DragDropModule,
    //NgxCurrencyModule,

    ScrollingModule,
  ],
  exports:[
    BaseDialogErrorComponent,
    BaseListFilterComponent,
    BaseListRegisterComponent,
    BaseRegisterComponent,
    BaseComboFilterComponent,

    MatMenuModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatFormFieldModule,  
    MatIconModule,
    MatInputModule,
    MatInputModule,
    MatListModule,
    MatProgressBarModule,
    MatSidenavModule,
    MatTableModule,
    MatToolbarModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    MatSlideToggleModule,
    MatSelectModule,
    NgxMatSelectSearchModule,
    MatTreeModule,
    DragDropModule,
    //NgxCurrencyModule,

    ScrollingModule,

  ]
})
export class SharedGlobalModule { }
