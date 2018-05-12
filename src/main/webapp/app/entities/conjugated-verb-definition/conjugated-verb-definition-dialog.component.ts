import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ConjugatedVerbDefinition } from './conjugated-verb-definition.model';
import { ConjugatedVerbDefinitionPopupService } from './conjugated-verb-definition-popup.service';
import { ConjugatedVerbDefinitionService } from './conjugated-verb-definition.service';
import { ConjugatedVerb, ConjugatedVerbService } from '../conjugated-verb';

@Component({
    selector: 'jhi-conjugated-verb-definition-dialog',
    templateUrl: './conjugated-verb-definition-dialog.component.html'
})
export class ConjugatedVerbDefinitionDialogComponent implements OnInit {

    conjugatedVerbDefinition: ConjugatedVerbDefinition;
    isSaving: boolean;

    conjugatedverbs: ConjugatedVerb[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private conjugatedVerbDefinitionService: ConjugatedVerbDefinitionService,
        private conjugatedVerbService: ConjugatedVerbService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.conjugatedVerbService.query()
            .subscribe((res: HttpResponse<ConjugatedVerb[]>) => { this.conjugatedverbs = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.conjugatedVerbDefinition.id !== undefined) {
            this.subscribeToSaveResponse(
                this.conjugatedVerbDefinitionService.update(this.conjugatedVerbDefinition));
        } else {
            this.subscribeToSaveResponse(
                this.conjugatedVerbDefinitionService.create(this.conjugatedVerbDefinition));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ConjugatedVerbDefinition>>) {
        result.subscribe((res: HttpResponse<ConjugatedVerbDefinition>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: ConjugatedVerbDefinition) {
        this.eventManager.broadcast({ name: 'conjugatedVerbDefinitionListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackConjugatedVerbById(index: number, item: ConjugatedVerb) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-conjugated-verb-definition-popup',
    template: ''
})
export class ConjugatedVerbDefinitionPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private conjugatedVerbDefinitionPopupService: ConjugatedVerbDefinitionPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.conjugatedVerbDefinitionPopupService
                    .open(ConjugatedVerbDefinitionDialogComponent as Component, params['id']);
            } else {
                this.conjugatedVerbDefinitionPopupService
                    .open(ConjugatedVerbDefinitionDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
