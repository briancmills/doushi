import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { StudySheetComponent } from './study-sheet.component';

export const studySheetRoute: Routes = [
    {
        path: 'study-sheet',
        component: StudySheetComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'doushiApp.verb.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];
