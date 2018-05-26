import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';

import { Observable } from 'rxjs/Observable';
import { ConjugatedVerb } from '../conjugated-verb/conjugated-verb.model';
import { Answer } from '../answer/answer.model';
import { AnswerService } from '../answer/answer.service';
import { ConjugatedVerbService } from '../conjugated-verb/conjugated-verb.service';
import { Principal, User, UserService } from '../../shared';

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
    user: User;
    isError: boolean;

    constructor(
        private conjugatedVerbService: ConjugatedVerbService,
        private answerService: AnswerService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private parseLinks: JhiParseLinks,
        private principal: Principal,
        private userService: UserService
    ) {
        this.isError = false;
        this.conjugatedVerbs = [];
        this.itemsPerPage = 10000;
        this.page = 0;
        this.links = {
            last: 0
        };
        this.predicate = 'id';
        this.reverse = true;
        this.correct = undefined;
        this.principal = principal;
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
            console.log('ngOnInit', account);
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
      const a = new Answer(
        undefined,
        this.correct,
        new Date().toISOString().replace( 'Z', '' ),
        this.conjugatedVerb.answer,
        this.currentAccount,
        undefined,
        this.conjugatedVerb
      );
      console.log('answer', a);
      this.subscribeToSaveAnswerResponse(
          this.answerService.create(a));
    }

    private subscribeToSaveAnswerResponse(result: Observable<HttpResponse<Answer>>) {
        result.subscribe((res: HttpResponse<Answer>) =>
            this.onSaveAnswerSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveAnswerSuccess(result: Answer) {
        this.eventManager.broadcast({ name: 'answerListModification', content: 'OK'});
    }

    private onSaveError() {
        this.isError = true;
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
