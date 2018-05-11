import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Verb } from './verb.model';
import { VerbPopupService } from './verb-popup.service';
import { VerbService } from './verb.service';

@Component({
    selector: 'jhi-verb-dialog',
    templateUrl: './verb-dialog.component.html'
})
export class VerbDialogComponent implements OnInit {

    verb: Verb;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private verbService: VerbService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.verb.id !== undefined) {
            this.subscribeToSaveResponse(
                this.verbService.update(this.verb));
        } else {
            this.subscribeToSaveResponse(
                this.verbService.create(this.verb));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Verb>>) {
        result.subscribe((res: HttpResponse<Verb>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Verb) {
        this.eventManager.broadcast({ name: 'verbListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-verb-popup',
    template: ''
})
export class VerbPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private verbPopupService: VerbPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.verbPopupService
                    .open(VerbDialogComponent as Component, params['id']);
            } else {
                this.verbPopupService
                    .open(VerbDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
