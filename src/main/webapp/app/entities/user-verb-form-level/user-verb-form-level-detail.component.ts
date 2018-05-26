import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { UserVerbFormLevel } from './user-verb-form-level.model';
import { UserVerbFormLevelService } from './user-verb-form-level.service';

@Component({
    selector: 'jhi-user-verb-form-level-detail',
    templateUrl: './user-verb-form-level-detail.component.html'
})
export class UserVerbFormLevelDetailComponent implements OnInit, OnDestroy {

    userVerbFormLevel: UserVerbFormLevel;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private userVerbFormLevelService: UserVerbFormLevelService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInUserVerbFormLevels();
    }

    load(id) {
        this.userVerbFormLevelService.find(id)
            .subscribe((userVerbFormLevelResponse: HttpResponse<UserVerbFormLevel>) => {
                this.userVerbFormLevel = userVerbFormLevelResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInUserVerbFormLevels() {
        this.eventSubscriber = this.eventManager.subscribe(
            'userVerbFormLevelListModification',
            (response) => this.load(this.userVerbFormLevel.id)
        );
    }
}
