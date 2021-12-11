import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MenuMenuListComponent } from './menu-list/menu-list.component';
import { MyRoutes } from '../routes-routing.module';


const routes: MyRoutes = [{ path: 'menuList',name:"菜单列表",id:"1001", component: MenuMenuListComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenuRoutingModule { }
