import { HttpClient } from '@angular/common/http';
import { Component, OnInit,Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ResultVo } from '@core';
import { Toast, ToastrService } from 'ngx-toastr';
import { MyMenu, MyMenus } from '../menu-list.component';

@Component({
  selector: 'app-menu-menu-list-menu-add',
  templateUrl: './menu-add.component.html',
  styleUrls: ['./menu-add.component.scss']
})
export class MenuMenuListMenuAddComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data:MyMenu|any,
    private formBuilder: FormBuilder,
    protected http: HttpClient,
    private toast: ToastrService,
    public dialogRef: MatDialogRef<MenuMenuListMenuAddComponent>) { }

  menu?:MyMenu=this.data.menu;
  isAdd :boolean=this.data.isAdd
  menuForm:FormGroup= this.formBuilder.group({
    'name': [this.isAdd?null:this.menu?.name, Validators.required],
    'route': [this.isAdd?null:this.menu?.route, Validators.required],
    'type': [this.isAdd?"link":this.menu?.type, Validators.required],
    'pid':[this.isAdd?this.menu?.id?this.menu?.id:"0":this.menu?.pid],
    'id':[this.isAdd?null:this.menu?.id]

  });

  ngOnInit() {

  }

  onSubmit() {
    console.log("thismenu",this.menu)
    if(this.menuForm.invalid){
      return;
    }
    this.http.post<ResultVo<any>>('/api/mall/menu/saveMenu',this.menuForm.value ).subscribe(
      (res:ResultVo<any>)=>{
          if(res.code==="200"){
            this.toast.success("保存成功");
            this.dialogRef.close(res);
          }
    });

  }

}
