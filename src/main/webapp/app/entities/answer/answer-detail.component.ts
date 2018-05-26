import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Answer } from './answer.model';
import { AnswerService } from './answer.service';

@Component({
    selector: 'jhi-answer-detail',
    templateUrl: './answer-detail.component.html'
})
export class AnswerDetailComponent implements OnInit, OnDestroy {

    answer: Answer;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private answerService: AnswerService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInAnswers();
    }

    load(id) {
        this.answerService.find(id)
            .subscribe((answerResponse: HttpResponse<Answer>) => {
                this.answer = answerResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInAnswers() {
        this.eventSubscriber = this.eventManager.subscribe(
            'answerListModification',
            (response) => this.load(this.answer.id)
        );
    }
}
