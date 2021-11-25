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
import { MatDatepickerModule} from '@angular/material/datepicker';
import { MatTabsModule } from '@angular/material/tabs';
import { MatRadioModule } from '@angular/material/radio';

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
import { MatNativeDateModule } from '@angular/material/core';
import { BaseListSelectComponent } from '../components/base-list-select/base-list-select.component';
import { BaseUploadFilesComponent } from '../components/base-upload-files/base-upload-files.component';
import { NgxFileDropModule } from 'ngx-file-drop';
import { FileUploadModule } from '@iplab/ngx-file-upload';
import { BaseDialogComponent } from '../components/base-dialog/base-dialog.component';
import { BaseTreeviewComponent } from '../components/base-treeview/base-treeview.component';
import { TreeviewModule } from 'ngx-treeview';
import { BasePaginationComponent } from '../components/base-pagination/base-pagination.component';

const maskConfig: Partial<IConfig> = {
  validation: false,
};

@NgModule({
  declarations: [
    BaseDialogComponent,
    BaseDialogErrorComponent,
    BaseListFilterComponent,
    BaseListRegisterComponent,
    BaseListSelectComponent,
    BaseRegisterComponent,
    BaseComboFilterComponent,
    BaseFormDebugComponent,
    BaseUploadFilesComponent,
    BaseTreeviewComponent,   
    BasePaginationComponent,
  ],
  imports: [
    NgxMaskModule.forRoot(maskConfig),
    TreeviewModule.forRoot(),
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxFileDropModule,
    FileUploadModule,

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
    MatDatepickerModule,
    MatTabsModule,
    MatRadioModule,
    ScrollingModule,

    DragDropModule,
  ],
  exports:[
    BaseDialogComponent,
    BaseDialogErrorComponent,
    BaseListFilterComponent,
    BaseListRegisterComponent,
    BaseRegisterComponent,
    BaseComboFilterComponent,
    BaseFormDebugComponent,
    BaseListSelectComponent,
    BaseUploadFilesComponent,
    BaseTreeviewComponent,   
    BasePaginationComponent,

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
    MatDatepickerModule,
    MatNativeDateModule,
    DragDropModule,
    MatTabsModule,
    MatRadioModule,
    NgxCurrencyModule,

    ScrollingModule,

  ]
})
export class SharedGlobalModule { }
