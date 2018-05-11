import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { VerbDefinition } from './verb-definition.model';
import { VerbDefinitionPopupService } from './verb-definition-popup.service';
import { VerbDefinitionService } from './verb-definition.service';

@Component({
    selector: 'jhi-verb-definition-delete-dialog',
    templateUrl: './verb-definition-delete-dialog.component.html'
})
export class VerbDefinitionDeleteDialogComponent {

    verbDefinition: VerbDefinition;

    constructor(
        private verbDefinitionService: VerbDefinitionService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.verbDefinitionService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'verbDefinitionListModification',
                content: 'Deleted an verbDefinition'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-verb-definition-delete-popup',
    template: ''
})
export class VerbDefinitionDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private verbDefinitionPopupService: VerbDefinitionPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.verbDefinitionPopupService
                .open(VerbDefinitionDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
