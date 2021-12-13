import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { MenuRoutingModule } from './menu-routing.module';
import { MenuMenuListComponent } from './menu-list/menu-list.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { MenuMenuListMenuAddComponent } from './menu-list/menu-add/menu-add.component';
import { MenuMenuListMenuDeleteComponent } from './menu-list/menu-delete/menu-delete.component';

const COMPONENTS: any[] = [MenuMenuListComponent];
const COMPONENTS_DYNAMIC: any[] = [MenuMenuListMenuAddComponent, MenuMenuListMenuDeleteComponent];

@NgModule({
  imports: [
    SharedModule,
    MenuRoutingModule,
    DragDropModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_DYNAMIC
  ],
  entryComponents: COMPONENTS_DYNAMIC
})
export class MenuModule { }
