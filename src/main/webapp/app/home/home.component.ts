import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';
import { UserProgress } from '../entities/user-verb-form-level/user-progress.model';
import { UserVerbFormLevelService } from '../entities/user-verb-form-level/user-verb-form-level.service';

import { Account, LoginModalService, Principal } from '../shared';

@Component({
    selector: 'jhi-home',
    templateUrl: './home.component.html',
    styleUrls: [
        'home.scss'
    ]

})
export class HomeComponent implements OnInit {
    account: Account;
    modalRef: NgbModalRef;
    levelProgress: any;

    constructor(
        private principal: Principal,
        private loginModalService: LoginModalService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private userVerbFormLevelService: UserVerbFormLevelService,
    ) {
      this.levelProgress = undefined;
    }

    ngOnInit() {
        this.principal.identity().then((account) => {
            this.account = account;
            this.refreshProgress();
        });
        this.registerAuthenticationSuccess();
    }

    registerAuthenticationSuccess() {
        this.eventManager.subscribe('authenticationSuccess', (message) => {
            this.principal.identity().then((account) => {
                this.account = account;
                this.refreshProgress();
            });
        });
    }

    refreshProgress() {
        this.userVerbFormLevelService.getProgress().subscribe(
            (res: HttpResponse<UserProgress>) => this.onSuccess(res.body, res.headers),
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    private onSuccess(data, headers) {
        this.levelProgress = data.progress;
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }

    isAuthenticated() {
        return this.principal.isAuthenticated();
    }

    login() {
        this.modalRef = this.loginModalService.open();
    }
}
