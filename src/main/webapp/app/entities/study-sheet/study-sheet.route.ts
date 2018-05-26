import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { StudySheetComponent } from './study-sheet.component';
import { StudySheetDetailComponent } from './study-sheet-detail.component';

export const studySheetRoute: Routes = [
    {
        path: 'study-sheet',
        component: StudySheetComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'doushiApp.studySheet.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'study-sheet/:id',
        component: StudySheetDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'doushiApp.studySheet.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];
