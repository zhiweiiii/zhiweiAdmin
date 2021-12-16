import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import {Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, NgModule} from '@angular/core';
import {DashboardChildrenComponent} from "./dashboard-children/dashboard-children.component";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls:['./dashboard.scss']
})
export class DashboardComponent implements OnInit {
  constructor(private cdr: ChangeDetectorRef) {}
  tiles: any[] = [
    {text: '1'},
    {text: '3'},
  ];
  title:String="首页"
  ngOnInit() {

  }


  drop(event: CdkDragDrop<any>,til:any) {
    moveItemInArray(til, event.previousIndex, event.currentIndex);
  }


}
