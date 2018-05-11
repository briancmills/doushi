import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { VerbDefinition } from './verb-definition.model';
import { VerbDefinitionService } from './verb-definition.service';

@Component({
    selector: 'jhi-verb-definition-detail',
    templateUrl: './verb-definition-detail.component.html'
})
export class VerbDefinitionDetailComponent implements OnInit, OnDestroy {

    verbDefinition: VerbDefinition;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private verbDefinitionService: VerbDefinitionService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInVerbDefinitions();
    }

    load(id) {
        this.verbDefinitionService.find(id)
            .subscribe((verbDefinitionResponse: HttpResponse<VerbDefinition>) => {
                this.verbDefinition = verbDefinitionResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInVerbDefinitions() {
        this.eventSubscriber = this.eventManager.subscribe(
            'verbDefinitionListModification',
            (response) => this.load(this.verbDefinition.id)
        );
    }
}
