import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { UserVerbFormLevel } from './user-verb-form-level.model';
import { UserVerbFormLevelPopupService } from './user-verb-form-level-popup.service';
import { UserVerbFormLevelService } from './user-verb-form-level.service';

@Component({
    selector: 'jhi-user-verb-form-level-delete-dialog',
    templateUrl: './user-verb-form-level-delete-dialog.component.html'
})
export class UserVerbFormLevelDeleteDialogComponent {

    userVerbFormLevel: UserVerbFormLevel;

    constructor(
        private userVerbFormLevelService: UserVerbFormLevelService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.userVerbFormLevelService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'userVerbFormLevelListModification',
                content: 'Deleted an userVerbFormLevel'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-user-verb-form-level-delete-popup',
    template: ''
})
export class UserVerbFormLevelDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private userVerbFormLevelPopupService: UserVerbFormLevelPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.userVerbFormLevelPopupService
                .open(UserVerbFormLevelDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
