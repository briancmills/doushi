import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';
import { UserVerbFormLevel } from '../entities/user-verb-form-level/user-verb-form-level.model';
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
    }

    ngOnInit() {
        this.principal.identity().then((account) => {
            this.account = account;
        });
        this.registerAuthenticationSuccess();
    }

    registerAuthenticationSuccess() {
        this.eventManager.subscribe('authenticationSuccess', (message) => {
            this.principal.identity().then((account) => {
                this.account = account;
            });
        });

        this.userVerbFormLevelService.findMine().subscribe(
            (res: HttpResponse<UserVerbFormLevel[]>) => this.onSuccess(res.body, res.headers),
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    private onSuccess(data, headers) {
        this.levelProgress = {};
        for (let i = 0; i < data.length; i++) {
            const l = data[i];
            if (!this.levelProgress[l.level]) {
              this.levelProgress[l.level] = 1;
            } else {
              this.levelProgress[l.level]++;
            }
        }
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
