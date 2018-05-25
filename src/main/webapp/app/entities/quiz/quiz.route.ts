import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { QuizComponent } from './quiz.component';

export const quizRoute: Routes = [
    {
        path: 'quiz',
        component: QuizComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'doushiApp.quiz.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];
