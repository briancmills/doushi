import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { VerbComponent } from './verb.component';
import { VerbDetailComponent } from './verb-detail.component';
import { VerbPopupComponent } from './verb-dialog.component';
import { VerbDeletePopupComponent } from './verb-delete-dialog.component';

export const verbRoute: Routes = [
    {
        path: 'verb',
        component: VerbComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'doushiApp.verb.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'verb/:id',
        component: VerbDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'doushiApp.verb.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const verbPopupRoute: Routes = [
    {
        path: 'verb-new',
        component: VerbPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'doushiApp.verb.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'verb/:id/edit',
        component: VerbPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'doushiApp.verb.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'verb/:id/delete',
        component: VerbDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'doushiApp.verb.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
