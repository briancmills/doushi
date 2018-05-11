import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { VerbDefinitionComponent } from './verb-definition.component';
import { VerbDefinitionDetailComponent } from './verb-definition-detail.component';
import { VerbDefinitionPopupComponent } from './verb-definition-dialog.component';
import { VerbDefinitionDeletePopupComponent } from './verb-definition-delete-dialog.component';

export const verbDefinitionRoute: Routes = [
    {
        path: 'verb-definition',
        component: VerbDefinitionComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'doushiApp.verbDefinition.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'verb-definition/:id',
        component: VerbDefinitionDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'doushiApp.verbDefinition.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const verbDefinitionPopupRoute: Routes = [
    {
        path: 'verb-definition-new',
        component: VerbDefinitionPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'doushiApp.verbDefinition.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'verb-definition/:id/edit',
        component: VerbDefinitionPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'doushiApp.verbDefinition.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'verb-definition/:id/delete',
        component: VerbDefinitionDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'doushiApp.verbDefinition.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
