import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { UserVerbFormLevelComponent } from './user-verb-form-level.component';
import { UserVerbFormLevelDetailComponent } from './user-verb-form-level-detail.component';
import { UserVerbFormLevelPopupComponent } from './user-verb-form-level-dialog.component';
import { UserVerbFormLevelDeletePopupComponent } from './user-verb-form-level-delete-dialog.component';

export const userVerbFormLevelRoute: Routes = [
    {
        path: 'user-verb-form-level',
        component: UserVerbFormLevelComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'doushiApp.userVerbFormLevel.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'user-verb-form-level/:id',
        component: UserVerbFormLevelDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'doushiApp.userVerbFormLevel.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const userVerbFormLevelPopupRoute: Routes = [
    {
        path: 'user-verb-form-level-new',
        component: UserVerbFormLevelPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'doushiApp.userVerbFormLevel.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'user-verb-form-level/:id/edit',
        component: UserVerbFormLevelPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'doushiApp.userVerbFormLevel.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'user-verb-form-level/:id/delete',
        component: UserVerbFormLevelDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'doushiApp.userVerbFormLevel.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
