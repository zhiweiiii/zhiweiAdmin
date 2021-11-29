import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FileFileDownloadComponent } from './file-download/file-download.component';
import { FileFileListComponent } from './file-list/file-list.component';

const routes: Routes = [{ path: 'fileDownload', component: FileFileDownloadComponent },
{ path: 'fileList', component: FileFileListComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FileRoutingModule { }
