import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { ConjugatedVerbComponent } from './conjugated-verb.component';
import { ConjugatedVerbDetailComponent } from './conjugated-verb-detail.component';
import { ConjugatedVerbPopupComponent } from './conjugated-verb-dialog.component';
import { ConjugatedVerbDeletePopupComponent } from './conjugated-verb-delete-dialog.component';

export const conjugatedVerbRoute: Routes = [
    {
        path: 'conjugated-verb',
        component: ConjugatedVerbComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'doushiApp.conjugatedVerb.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'conjugated-verb/:id',
        component: ConjugatedVerbDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'doushiApp.conjugatedVerb.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const conjugatedVerbPopupRoute: Routes = [
    {
        path: 'conjugated-verb-new',
        component: ConjugatedVerbPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'doushiApp.conjugatedVerb.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'conjugated-verb/:id/edit',
        component: ConjugatedVerbPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'doushiApp.conjugatedVerb.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'conjugated-verb/:id/delete',
        component: ConjugatedVerbDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'doushiApp.conjugatedVerb.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
