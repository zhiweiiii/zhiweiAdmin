import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { MenuRoutingModule } from './menu-routing.module';
import { MenuMenuListComponent } from './menu-list/menu-list.component';
import {DragDropModule} from '@angular/cdk/drag-drop';

const COMPONENTS: any[] = [MenuMenuListComponent];
const COMPONENTS_DYNAMIC: any[] = [];

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
