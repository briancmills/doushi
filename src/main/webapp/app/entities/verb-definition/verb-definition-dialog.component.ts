import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { VerbDefinition } from './verb-definition.model';
import { VerbDefinitionPopupService } from './verb-definition-popup.service';
import { VerbDefinitionService } from './verb-definition.service';
import { Verb, VerbService } from '../verb';

@Component({
    selector: 'jhi-verb-definition-dialog',
    templateUrl: './verb-definition-dialog.component.html'
})
export class VerbDefinitionDialogComponent implements OnInit {

    verbDefinition: VerbDefinition;
    isSaving: boolean;

    verbs: Verb[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private verbDefinitionService: VerbDefinitionService,
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
        if (this.verbDefinition.id !== undefined) {
            this.subscribeToSaveResponse(
                this.verbDefinitionService.update(this.verbDefinition));
        } else {
            this.subscribeToSaveResponse(
                this.verbDefinitionService.create(this.verbDefinition));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<VerbDefinition>>) {
        result.subscribe((res: HttpResponse<VerbDefinition>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: VerbDefinition) {
        this.eventManager.broadcast({ name: 'verbDefinitionListModification', content: 'OK'});
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
    selector: 'jhi-verb-definition-popup',
    template: ''
})
export class VerbDefinitionPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private verbDefinitionPopupService: VerbDefinitionPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.verbDefinitionPopupService
                    .open(VerbDefinitionDialogComponent as Component, params['id']);
            } else {
                this.verbDefinitionPopupService
                    .open(VerbDefinitionDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
