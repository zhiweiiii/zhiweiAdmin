import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';


export interface File {
  id: string;
  name: string;
  create_time: string;
  path: string;
}


@Component({
  selector: 'app-file-fileList',
  templateUrl: './file-list.component.html',
  styleUrls: ['./file-list.component.scss']
})
export class FileFileListComponent implements OnInit {

  fileList:File[] =new Array;
  
  constructor() {
   
   }

  ngOnInit() {
    
    this.fileList=[];

  }

}
