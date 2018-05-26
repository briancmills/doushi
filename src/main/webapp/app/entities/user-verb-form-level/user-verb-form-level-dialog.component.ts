import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { UserVerbFormLevel } from './user-verb-form-level.model';
import { UserVerbFormLevelPopupService } from './user-verb-form-level-popup.service';
import { UserVerbFormLevelService } from './user-verb-form-level.service';
import { User, UserService } from '../../shared';
import { Verb, VerbService } from '../verb';
import { ConjugatedVerb, ConjugatedVerbService } from '../conjugated-verb';

@Component({
    selector: 'jhi-user-verb-form-level-dialog',
    templateUrl: './user-verb-form-level-dialog.component.html'
})
export class UserVerbFormLevelDialogComponent implements OnInit {

    userVerbFormLevel: UserVerbFormLevel;
    isSaving: boolean;

    users: User[];

    verbs: Verb[];

    conjugatedverbs: ConjugatedVerb[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private userVerbFormLevelService: UserVerbFormLevelService,
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
        if (this.userVerbFormLevel.id !== undefined) {
            this.subscribeToSaveResponse(
                this.userVerbFormLevelService.update(this.userVerbFormLevel));
        } else {
            this.subscribeToSaveResponse(
                this.userVerbFormLevelService.create(this.userVerbFormLevel));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<UserVerbFormLevel>>) {
        result.subscribe((res: HttpResponse<UserVerbFormLevel>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: UserVerbFormLevel) {
        this.eventManager.broadcast({ name: 'userVerbFormLevelListModification', content: 'OK'});
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
    selector: 'jhi-user-verb-form-level-popup',
    template: ''
})
export class UserVerbFormLevelPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private userVerbFormLevelPopupService: UserVerbFormLevelPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.userVerbFormLevelPopupService
                    .open(UserVerbFormLevelDialogComponent as Component, params['id']);
            } else {
                this.userVerbFormLevelPopupService
                    .open(UserVerbFormLevelDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
