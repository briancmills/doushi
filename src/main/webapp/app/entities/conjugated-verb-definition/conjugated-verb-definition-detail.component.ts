import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { ConjugatedVerbDefinition } from './conjugated-verb-definition.model';
import { ConjugatedVerbDefinitionService } from './conjugated-verb-definition.service';

@Component({
    selector: 'jhi-conjugated-verb-definition-detail',
    templateUrl: './conjugated-verb-definition-detail.component.html'
})
export class ConjugatedVerbDefinitionDetailComponent implements OnInit, OnDestroy {

    conjugatedVerbDefinition: ConjugatedVerbDefinition;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private conjugatedVerbDefinitionService: ConjugatedVerbDefinitionService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInConjugatedVerbDefinitions();
    }

    load(id) {
        this.conjugatedVerbDefinitionService.find(id)
            .subscribe((conjugatedVerbDefinitionResponse: HttpResponse<ConjugatedVerbDefinition>) => {
                this.conjugatedVerbDefinition = conjugatedVerbDefinitionResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInConjugatedVerbDefinitions() {
        this.eventSubscriber = this.eventManager.subscribe(
            'conjugatedVerbDefinitionListModification',
            (response) => this.load(this.conjugatedVerbDefinition.id)
        );
    }
}
