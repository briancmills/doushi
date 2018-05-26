import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DoushiSharedModule } from '../../shared';
import { DoushiAdminModule } from '../../admin/admin.module';
import {
    UserVerbFormLevelService,
    UserVerbFormLevelPopupService,
    UserVerbFormLevelComponent,
    UserVerbFormLevelDetailComponent,
    UserVerbFormLevelDialogComponent,
    UserVerbFormLevelPopupComponent,
    UserVerbFormLevelDeletePopupComponent,
    UserVerbFormLevelDeleteDialogComponent,
    userVerbFormLevelRoute,
    userVerbFormLevelPopupRoute,
} from './';

const ENTITY_STATES = [
    ...userVerbFormLevelRoute,
    ...userVerbFormLevelPopupRoute,
];

@NgModule({
    imports: [
        DoushiSharedModule,
        DoushiAdminModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        UserVerbFormLevelComponent,
        UserVerbFormLevelDetailComponent,
        UserVerbFormLevelDialogComponent,
        UserVerbFormLevelDeleteDialogComponent,
        UserVerbFormLevelPopupComponent,
        UserVerbFormLevelDeletePopupComponent,
    ],
    entryComponents: [
        UserVerbFormLevelComponent,
        UserVerbFormLevelDialogComponent,
        UserVerbFormLevelPopupComponent,
        UserVerbFormLevelDeleteDialogComponent,
        UserVerbFormLevelDeletePopupComponent,
    ],
    providers: [
        UserVerbFormLevelService,
        UserVerbFormLevelPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DoushiUserVerbFormLevelModule {}
