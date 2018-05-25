import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Verb } from '../verb/verb.model';
import { VerbService } from '../verb/verb.service';
import { ConjugatedVerb } from '../conjugated-verb/conjugated-verb.model';
import { ConjugatedVerbService } from '../conjugated-verb/conjugated-verb.service';

@Component({
    selector: 'jhi-study-sheet-detail',
    templateUrl: './study-sheet-detail.component.html'
})
export class StudySheetDetailComponent implements OnInit, OnDestroy {

    verb: Verb;
    conjugatedVerbs: ConjugatedVerb[];
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private verbService: VerbService,
        private conjugatedVerbService: ConjugatedVerbService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInVerbs();
    }

    load(id) {
        this.verbService.find(id)
            .subscribe((verbResponse: HttpResponse<Verb>) => {
                this.verb = verbResponse.body;
            });
        this.conjugatedVerbService.queryByVerb(id)
            .subscribe((conjugatedVerbResponse: HttpResponse<ConjugatedVerb[]>) => {
                this.conjugatedVerbs = conjugatedVerbResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInVerbs() {
        this.eventSubscriber = this.eventManager.subscribe(
            'studySheetListModification',
            (response) => this.load(this.verb.id)
        );
    }
}
