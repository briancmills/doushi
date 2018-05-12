import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ConjugatedVerbDefinition } from './conjugated-verb-definition.model';
import { ConjugatedVerbDefinitionPopupService } from './conjugated-verb-definition-popup.service';
import { ConjugatedVerbDefinitionService } from './conjugated-verb-definition.service';

@Component({
    selector: 'jhi-conjugated-verb-definition-delete-dialog',
    templateUrl: './conjugated-verb-definition-delete-dialog.component.html'
})
export class ConjugatedVerbDefinitionDeleteDialogComponent {

    conjugatedVerbDefinition: ConjugatedVerbDefinition;

    constructor(
        private conjugatedVerbDefinitionService: ConjugatedVerbDefinitionService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.conjugatedVerbDefinitionService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'conjugatedVerbDefinitionListModification',
                content: 'Deleted an conjugatedVerbDefinition'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-conjugated-verb-definition-delete-popup',
    template: ''
})
export class ConjugatedVerbDefinitionDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private conjugatedVerbDefinitionPopupService: ConjugatedVerbDefinitionPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.conjugatedVerbDefinitionPopupService
                .open(ConjugatedVerbDefinitionDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
