import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent implements OnInit {
  constructor(private cdr: ChangeDetectorRef) {}
  tiles: any[] = [
    {text: '1',rows: 1, color: 'lightblue'},
    {text: '2', rows: 1, color: 'lightpink'},
    {text: '3',  rows: 1, color: 'lightgreen'},
    {text: '4',  rows: 1, color: '#DDBDF1'},
    {text: 'Four',  rows: 1, color: '#DDBDF1'},
    {text: 'Four',  rows: 1, color: '#DDBDF1'},
    {text: 'Four',  rows: 1, color: '#DDBDF1'},
  ];
  ngOnInit() {}


  drop(event: CdkDragDrop<any>,til:any) {
    moveItemInArray(til, event.previousIndex, event.currentIndex);
  }


}
