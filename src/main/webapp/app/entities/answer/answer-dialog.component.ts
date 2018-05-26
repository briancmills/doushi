import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Answer } from './answer.model';
import { AnswerPopupService } from './answer-popup.service';
import { AnswerService } from './answer.service';
import { User, UserService } from '../../shared';
import { Verb, VerbService } from '../verb';
import { ConjugatedVerb, ConjugatedVerbService } from '../conjugated-verb';

@Component({
    selector: 'jhi-answer-dialog',
    templateUrl: './answer-dialog.component.html'
})
export class AnswerDialogComponent implements OnInit {

    answer: Answer;
    isSaving: boolean;

    users: User[];

    verbs: Verb[];

    conjugatedverbs: ConjugatedVerb[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private answerService: AnswerService,
        private userService: UserService,
        private verbService: VerbService,
        private conjugatedVerbService: ConjugatedVerbService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.userService.query()
            .subscribe((res: HttpResponse<User[]>) => { this.users = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.verbService.query()
            .subscribe((res: HttpResponse<Verb[]>) => { this.verbs = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.conjugatedVerbService.query()
            .subscribe((res: HttpResponse<ConjugatedVerb[]>) => { this.conjugatedverbs = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.answer.id !== undefined) {
            this.subscribeToSaveResponse(
                this.answerService.update(this.answer));
        } else {
            this.subscribeToSaveResponse(
                this.answerService.create(this.answer));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Answer>>) {
        result.subscribe((res: HttpResponse<Answer>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Answer) {
        this.eventManager.broadcast({ name: 'answerListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackUserById(index: number, item: User) {
        return item.id;
    }

    trackVerbById(index: number, item: Verb) {
        return item.id;
    }

    trackConjugatedVerbById(index: number, item: ConjugatedVerb) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-answer-popup',
    template: ''
})
export class AnswerPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private answerPopupService: AnswerPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.answerPopupService
                    .open(AnswerDialogComponent as Component, params['id']);
            } else {
                this.answerPopupService
                    .open(AnswerDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
