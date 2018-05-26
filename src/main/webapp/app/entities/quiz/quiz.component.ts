import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';

import { ConjugatedVerb } from '../conjugated-verb/conjugated-verb.model';
import { ConjugatedVerbService } from '../conjugated-verb/conjugated-verb.service';
import { ITEMS_PER_PAGE, Principal } from '../../shared';

@Component({
    selector: 'jhi-verb',
    templateUrl: './quiz.component.html'
})
export class QuizComponent implements OnInit, OnDestroy {

    conjugatedVerb: ConjugatedVerb;
    conjugatedVerbs: ConjugatedVerb[];
    filter: string;
    currentAccount: any;
    eventSubscriber: Subscription;
    itemsPerPage: number;
    links: any;
    page: any;
    predicate: any;
    queryCount: any;
    reverse: any;
    totalItems: number;
    correct: boolean;

    constructor(
        private conjugatedVerbService: ConjugatedVerbService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private parseLinks: JhiParseLinks,
        private principal: Principal
    ) {
        this.conjugatedVerbs = [];
        this.itemsPerPage = 10000;
        this.page = 0;
        this.links = {
            last: 0
        };
        this.predicate = 'id';
        this.reverse = true;
        this.correct = undefined;
    }

    loadAll() {
        this.conjugatedVerbService.query({
            page: this.page,
            size: this.itemsPerPage,
            sort: this.sort()
        }).subscribe(
            (res: HttpResponse<ConjugatedVerb[]>) => this.onSuccess(res.body, res.headers),
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    reset() {
        this.page = 0;
        this.conjugatedVerbs = [];
        this.loadAll();
    }

    loadPage(page) {
        this.page = page;
        this.loadAll();
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInVerbs();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ConjugatedVerb) {
        return item.id;
    }
    registerChangeInVerbs() {
        this.eventSubscriber = this.eventManager.subscribe('verbListModification', (response) => this.reset());
    }

    sort() {
        const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
        if (this.predicate !== 'id') {
            result.push('id');
        }
        return result;
    }

    check() {
      console.log('check');
      console.log('this.correct', this.correct);
      // TODO validate the answer
      console.log(this.conjugatedVerb.answer);
      if (this.conjugatedVerb.answer === this.conjugatedVerb.japanese) {
        this.correct = true;
      } else {
        this.correct = false;
      }
    }

  　next() {
      console.log('next');
      this.correct = undefined;
      const randomIndex = Math.floor(Math.random() * this.conjugatedVerbs.length);
      this.conjugatedVerb = this.conjugatedVerbs[randomIndex];
    }

    private onSuccess(data, headers) {
        this.links = this.parseLinks.parse(headers.get('link'));
        this.totalItems = headers.get('X-Total-Count');
        for (let i = 0; i < data.length; i++) {
            this.conjugatedVerbs.push(data[i]);
        }
      const randomIndex = Math.floor(Math.random() * this.conjugatedVerbs.length);
      this.conjugatedVerb = this.conjugatedVerbs[randomIndex];
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
