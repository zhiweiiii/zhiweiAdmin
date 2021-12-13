import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ResultVo } from '@core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-menu-menu-list-menu-delete',
  templateUrl: './menu-delete.component.html',
  styleUrls: ['./menu-delete.component.scss']
})
export class MenuMenuListMenuDeleteComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data:any,
  protected http: HttpClient,
  private toast: ToastrService,
  public dialogRef: MatDialogRef<MenuMenuListMenuDeleteComponent>) { }

  name:String=this.data.menu.name;

  ngOnInit() {
  }

  onClose(){
    this.http.post<ResultVo<any>>('/api/mall/menu/deleteMenu/'+this.data.menu.id,{} ).subscribe(
      (res:ResultVo<any>)=>{
          if(res.code==="200"){
            this.toast.success("删除成功");
            this.dialogRef.close(res);
          }
    });

  }
  onlyClose(){
    this.dialogRef.close(null);
  }

}
