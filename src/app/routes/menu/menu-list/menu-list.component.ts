import { Component, OnInit } from '@angular/core';
import { MyRoutes,MyRoute } from 'app/routes/routes-routing.module';
import { ResultVo } from '@core/authentication/interface';
import { HttpClient } from '@angular/common/http';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import { ToastrService } from 'ngx-toastr';
import { MenuMenuListMenuAddComponent } from './menu-add/menu-add.component';
import { MatDialog } from '@angular/material/dialog';
import { MenuMenuListMenuDeleteComponent } from './menu-delete/menu-delete.component';


export interface MyMenu extends MyRoute {
  completed?:boolean;
  route:String;
  type:String;
  pid:String;
  children?: MyMenus;
}
export declare type MyMenus = MyMenu[];

export interface MenuCreate {
  name :string;
  path :string;
  children: MenuCreate[];
}

@Component({
  selector: 'app-menu-menuList',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.scss']
})
export class MenuMenuListComponent implements OnInit {


  constructor(protected http: HttpClient,private toast: ToastrService,public dialog: MatDialog) { }

  menus:MyMenus=[];

  ngOnInit() {
    this.loadData();
  }

  loadData(){
    this.http.get<ResultVo<MyMenus>>('/api/mall/menu/getMenuList',{}).subscribe(
      data => {
        this.menus=data.data;
        console.log("menuDATA",this.menus)
      });

  }

  saveMenu() {
    var result:MyMenus=JSON.parse(JSON.stringify(this.menus));
    result =result.filter(menus=>{
      if(!menus.completed){
        return false;
      }
      menus.children=menus.children?.filter(children=>{
        if(!children.completed){
          return false;
        }
        return true;
      })

      return true;
    });
    this.http.post<ResultVo<any>>('/api/mall/menu/saveUserMenu',result).subscribe(
      (data)=>{
      if(data.code ==="200"){
        this.toast.success("保存成功",'',{
          positionClass: "toast-center-center",
      });
      }
    });
  }

  updateAllComplete(menu:MyMenu,children:MyMenu) {
    if(menu.children?.filter(t => t.completed===true).length===0){
      menu.completed=false;
    }else{
      menu.completed=true;
    }
  }

  setAll(menu:MyMenu) {
    menu.children?.forEach(t => (t.completed = menu.completed));
  }

  drop(event: CdkDragDrop<MyMenus>,menu:MyMenus) {
    moveItemInArray(menu, event.previousIndex, event.currentIndex);
  }

  addDialog(menu?:MyMenu){
    const dialogRef=this.dialog.open(MenuMenuListMenuAddComponent, {
      height: 'auto',
      width: '600px',
      data: {menu,"isAdd":true},

    });
    dialogRef.afterClosed().subscribe(result => {
      if(result.code==="200"){
      this.loadData();
      }
    });
  }
  editDialog(menu:MyMenu){
    const dialogRef =this.dialog.open(MenuMenuListMenuAddComponent, {
      height: 'auto',
      width: '600px',
      data: {menu,"isAdd":false},
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result.code==="200"){
        this.loadData();
        }
    });
  }

  deleteDialog(menu:MyMenu){
    const dialogRef =this.dialog.open(MenuMenuListMenuDeleteComponent, {
      height: 'auto',
      width: '600px',
      data: {menu:menu},
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result.code==="200"){
        this.loadData();
        }
    });
  }


}
