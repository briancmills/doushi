import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Answer } from './answer.model';
import { AnswerPopupService } from './answer-popup.service';
import { AnswerService } from './answer.service';

@Component({
    selector: 'jhi-answer-delete-dialog',
    templateUrl: './answer-delete-dialog.component.html'
})
export class AnswerDeleteDialogComponent {

    answer: Answer;

    constructor(
        private answerService: AnswerService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.answerService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'answerListModification',
                content: 'Deleted an answer'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-answer-delete-popup',
    template: ''
})
export class AnswerDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private answerPopupService: AnswerPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.answerPopupService
                .open(AnswerDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
