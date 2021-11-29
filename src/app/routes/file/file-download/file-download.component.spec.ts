import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { FileFileDownloadComponent } from './file-download.component';

describe('FileFileDownloadComponent', () => {
  let component: FileFileDownloadComponent;
  let fixture: ComponentFixture<FileFileDownloadComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FileFileDownloadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileFileDownloadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
