import { Component, OnInit } from '@angular/core';
import { MyRoutes,MyRoute } from 'app/routes/routes-routing.module';
import { ResultVo } from '@core/authentication/interface';
import { HttpClient } from '@angular/common/http';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import { ToastrService } from 'ngx-toastr';


export interface MyMenu extends MyRoute {
  completed?:boolean;
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


  constructor(protected http: HttpClient,private toast: ToastrService) { }

  menus:MyMenus=[];

  ngOnInit() {
    this.loadData();
  }

  loadData(){
    this.http.get<ResultVo<MyMenus>>('/api/mall/menu/getMenuList',{}).subscribe(
      data => {
        this.menus=data.data;
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
      delete menus.completed;
      delete menus.id;
      delete menus.id;
      
      return true;
    });

    console.log(result);
    this.toast.success("保存成功",'',{
       positionClass: "toast-center-center",
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

}
