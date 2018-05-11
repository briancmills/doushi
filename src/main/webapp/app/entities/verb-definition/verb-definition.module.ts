import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DoushiSharedModule } from '../../shared';
import {
    VerbDefinitionService,
    VerbDefinitionPopupService,
    VerbDefinitionComponent,
    VerbDefinitionDetailComponent,
    VerbDefinitionDialogComponent,
    VerbDefinitionPopupComponent,
    VerbDefinitionDeletePopupComponent,
    VerbDefinitionDeleteDialogComponent,
    verbDefinitionRoute,
    verbDefinitionPopupRoute,
} from './';

const ENTITY_STATES = [
    ...verbDefinitionRoute,
    ...verbDefinitionPopupRoute,
];

@NgModule({
    imports: [
        DoushiSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        VerbDefinitionComponent,
        VerbDefinitionDetailComponent,
        VerbDefinitionDialogComponent,
        VerbDefinitionDeleteDialogComponent,
        VerbDefinitionPopupComponent,
        VerbDefinitionDeletePopupComponent,
    ],
    entryComponents: [
        VerbDefinitionComponent,
        VerbDefinitionDialogComponent,
        VerbDefinitionPopupComponent,
        VerbDefinitionDeleteDialogComponent,
        VerbDefinitionDeletePopupComponent,
    ],
    providers: [
        VerbDefinitionService,
        VerbDefinitionPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DoushiVerbDefinitionModule {}
