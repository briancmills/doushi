import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { ConjugatedVerb } from './conjugated-verb.model';
import { ConjugatedVerbService } from './conjugated-verb.service';

@Component({
    selector: 'jhi-conjugated-verb-detail',
    templateUrl: './conjugated-verb-detail.component.html'
})
export class ConjugatedVerbDetailComponent implements OnInit, OnDestroy {

    conjugatedVerb: ConjugatedVerb;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private conjugatedVerbService: ConjugatedVerbService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInConjugatedVerbs();
    }

    load(id) {
        this.conjugatedVerbService.find(id)
            .subscribe((conjugatedVerbResponse: HttpResponse<ConjugatedVerb>) => {
                this.conjugatedVerb = conjugatedVerbResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInConjugatedVerbs() {
        this.eventSubscriber = this.eventManager.subscribe(
            'conjugatedVerbListModification',
            (response) => this.load(this.conjugatedVerb.id)
        );
    }
}
