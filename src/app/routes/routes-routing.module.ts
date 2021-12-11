import { NgModule } from '@angular/core';
import { Routes, RouterModule ,Route} from '@angular/router';
import { environment } from '@env/environment';

import { AdminLayoutComponent } from '../theme/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from '../theme/auth-layout/auth-layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './sessions/login/login.component';
import { RegisterComponent } from './sessions/register/register.component';
import { Error403Component } from './sessions/403.component';
import { Error404Component } from './sessions/404.component';
import { Error500Component } from './sessions/500.component';
import { AuthGuard } from '@core';


export declare interface MyRoute  extends Route{
  name?:String
  id?:String
  children?: MyRoutes;
}

export declare type MyRoutes = MyRoute[];
const routes: MyRoutes = [
  {
    path: '',
    id:'0',
    component: AdminLayoutComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard',name:'首页',id:'1', component: DashboardComponent },
      { path: '',name:'系统页面',id:'2',
      children:[
        { path: '403',name:'403',id:'3', component: Error403Component },
      { path: '404',name:'404',id:'4', component: Error404Component },
      { path: '500',name:'500',id:'5', component: Error500Component },
      ]},
      { path: 'file', name:'文件管理',id:'6',  loadChildren: () => import('./file/file.module').then(m => m.FileModule) },
      { path: 'menu',  name:'菜单',id:'7', loadChildren: () => import('./menu/menu.module').then(m => m.MenuModule) },
    ],
  },
  {
    path: 'auth',
    component: AuthLayoutComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
    ],
  },
  { path: '**', redirectTo: 'dashboard' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: environment.useHash,
    }),
  ],
  exports: [RouterModule],
})
export class RoutesRoutingModule {}
