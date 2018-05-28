import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { LessonComponent } from './lesson.component';

export const lessonRoute: Routes = [
    {
        path: 'lesson',
        component: LessonComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'doushiApp.lesson.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];
