import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { FileRoutingModule } from './file-routing.module';
import { FileFileDownloadComponent } from './file-download/file-download.component';
import { FileFileListComponent } from './file-list/file-list.component';

const COMPONENTS: any[] = [FileFileDownloadComponent, FileFileListComponent];
const COMPONENTS_DYNAMIC: any[] = [];

@NgModule({
  imports: [
    SharedModule,
    FileRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_DYNAMIC
  ],
  entryComponents: COMPONENTS_DYNAMIC
})
export class FileModule { }
