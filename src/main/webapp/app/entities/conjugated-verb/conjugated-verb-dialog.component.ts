import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ConjugatedVerb } from './conjugated-verb.model';
import { ConjugatedVerbPopupService } from './conjugated-verb-popup.service';
import { ConjugatedVerbService } from './conjugated-verb.service';
import { Verb, VerbService } from '../verb';

@Component({
    selector: 'jhi-conjugated-verb-dialog',
    templateUrl: './conjugated-verb-dialog.component.html'
})
export class ConjugatedVerbDialogComponent implements OnInit {

    conjugatedVerb: ConjugatedVerb;
    isSaving: boolean;

    verbs: Verb[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private conjugatedVerbService: ConjugatedVerbService,
        private verbService: VerbService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.verbService.query()
            .subscribe((res: HttpResponse<Verb[]>) => { this.verbs = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.conjugatedVerb.id !== undefined) {
            this.subscribeToSaveResponse(
                this.conjugatedVerbService.update(this.conjugatedVerb));
        } else {
            this.subscribeToSaveResponse(
                this.conjugatedVerbService.create(this.conjugatedVerb));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ConjugatedVerb>>) {
        result.subscribe((res: HttpResponse<ConjugatedVerb>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: ConjugatedVerb) {
        this.eventManager.broadcast({ name: 'conjugatedVerbListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackVerbById(index: number, item: Verb) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-conjugated-verb-popup',
    template: ''
})
export class ConjugatedVerbPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private conjugatedVerbPopupService: ConjugatedVerbPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.conjugatedVerbPopupService
                    .open(ConjugatedVerbDialogComponent as Component, params['id']);
            } else {
                this.conjugatedVerbPopupService
                    .open(ConjugatedVerbDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
