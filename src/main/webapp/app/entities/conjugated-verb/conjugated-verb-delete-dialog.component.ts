import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ConjugatedVerb } from './conjugated-verb.model';
import { ConjugatedVerbPopupService } from './conjugated-verb-popup.service';
import { ConjugatedVerbService } from './conjugated-verb.service';

@Component({
    selector: 'jhi-conjugated-verb-delete-dialog',
    templateUrl: './conjugated-verb-delete-dialog.component.html'
})
export class ConjugatedVerbDeleteDialogComponent {

    conjugatedVerb: ConjugatedVerb;

    constructor(
        private conjugatedVerbService: ConjugatedVerbService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.conjugatedVerbService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'conjugatedVerbListModification',
                content: 'Deleted an conjugatedVerb'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-conjugated-verb-delete-popup',
    template: ''
})
export class ConjugatedVerbDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private conjugatedVerbPopupService: ConjugatedVerbPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.conjugatedVerbPopupService
                .open(ConjugatedVerbDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
