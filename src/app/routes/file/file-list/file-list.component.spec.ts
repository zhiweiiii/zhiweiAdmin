import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { FileFileListComponent } from './file-list.component';

describe('FileFileListComponent', () => {
  let component: FileFileListComponent;
  let fixture: ComponentFixture<FileFileListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FileFileListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileFileListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
