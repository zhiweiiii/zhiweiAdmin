import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {ResultVo} from "@core";
import {CdkDragDrop, moveItemInArray} from "@angular/cdk/drag-drop";

export interface Note {
  id:String,
    title:String,
  text:String,
  createTime:Date,
  finishTime:Date,
  planTime:Date,
  type:String,
  status:String
}

@Component({
  selector: 'app-dashboard-children',
  templateUrl: './dashboard-children.component.html',
  styleUrls: ['./dashboard-children.component.scss']
})
export class DashboardChildrenComponent implements OnInit {

  constructor(protected http: HttpClient,private cdr: ChangeDetectorRef) { }
  panelOpenState:boolean=false;
  noteList?:Note[];

  ngOnInit() {
    this.loadData()
  }

  loadData(){
    const params = new HttpParams()
      .set('page', 1)
      .set('pageSize', 10);
    this.http.get<ResultVo<any>>("/api/mall/note/findPage",{params:params}).subscribe(
      result=>{
        if(result.code==="200"){
          this.noteList=result.data.records;
          this.cdr.markForCheck();
          this.cdr.detectChanges();
        }
      }
    )
  }

  finishNote(note:Note){
    this.http.put<ResultVo<any>>("/api/mall/note/finishNote",note).subscribe(
      result=>{
        if(result.code==="200"){
          this.loadData();
        }
      }
    )
  }

  drop(event: CdkDragDrop<any>,til:any) {
    moveItemInArray(til, event.previousIndex, event.currentIndex);
  }




}
