import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { AnswerComponent } from './answer.component';
import { AnswerDetailComponent } from './answer-detail.component';
import { AnswerPopupComponent } from './answer-dialog.component';
import { AnswerDeletePopupComponent } from './answer-delete-dialog.component';

export const answerRoute: Routes = [
    {
        path: 'answer',
        component: AnswerComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'doushiApp.answer.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'answer/:id',
        component: AnswerDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'doushiApp.answer.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const answerPopupRoute: Routes = [
    {
        path: 'answer-new',
        component: AnswerPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'doushiApp.answer.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'answer/:id/edit',
        component: AnswerPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'doushiApp.answer.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'answer/:id/delete',
        component: AnswerDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'doushiApp.answer.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
