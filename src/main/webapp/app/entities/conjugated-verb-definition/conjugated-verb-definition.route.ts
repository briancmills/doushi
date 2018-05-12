import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { ConjugatedVerbDefinitionComponent } from './conjugated-verb-definition.component';
import { ConjugatedVerbDefinitionDetailComponent } from './conjugated-verb-definition-detail.component';
import { ConjugatedVerbDefinitionPopupComponent } from './conjugated-verb-definition-dialog.component';
import { ConjugatedVerbDefinitionDeletePopupComponent } from './conjugated-verb-definition-delete-dialog.component';

export const conjugatedVerbDefinitionRoute: Routes = [
    {
        path: 'conjugated-verb-definition',
        component: ConjugatedVerbDefinitionComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'doushiApp.conjugatedVerbDefinition.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'conjugated-verb-definition/:id',
        component: ConjugatedVerbDefinitionDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'doushiApp.conjugatedVerbDefinition.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const conjugatedVerbDefinitionPopupRoute: Routes = [
    {
        path: 'conjugated-verb-definition-new',
        component: ConjugatedVerbDefinitionPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'doushiApp.conjugatedVerbDefinition.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'conjugated-verb-definition/:id/edit',
        component: ConjugatedVerbDefinitionPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'doushiApp.conjugatedVerbDefinition.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'conjugated-verb-definition/:id/delete',
        component: ConjugatedVerbDefinitionDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'doushiApp.conjugatedVerbDefinition.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
