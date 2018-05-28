import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiAlertService, JhiEventManager } from 'ng-jhipster';

import { Observable } from 'rxjs/Observable';
import { ConjugatedVerb } from '../conjugated-verb/conjugated-verb.model';
import { Answer } from '../answer/answer.model';
import { AnswerService } from '../answer/answer.service';
import { ConjugatedVerbService } from '../conjugated-verb/conjugated-verb.service';
import { Principal, User } from '../../shared';

@Component({
    selector: 'jhi-verb',
    templateUrl: './quiz.component.html'
})
export class QuizComponent implements OnInit, OnDestroy {

    conjugatedVerb: ConjugatedVerb;
    currentAccount: any;
    eventSubscriber: Subscription;
    predicate: any;
    correct: boolean;
    user: User;
    isError: boolean;

    constructor(
        private conjugatedVerbService: ConjugatedVerbService,
        private answerService: AnswerService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal,
    ) {
        this.isError = false;
        this.correct = undefined;
        this.principal = principal;
    }

    loadAll() {
        this.conjugatedVerbService.findForStudy().subscribe(
            (res: HttpResponse<ConjugatedVerb>) => this.onSuccess(res.body, res.headers),
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    reset() {
        this.conjugatedVerb = undefined;
        this.loadAll();
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
    }

    ngOnDestroy() {
    }

    trackId(index: number, item: ConjugatedVerb) {
        return item.id;
    }

    check() {
      // if they didn't provide an answer at all do nothing
      if (!this.conjugatedVerb.answer) {
        return;
      }
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
        if (this.correct) {
          setTimeout(() => { this.next(); }, 3000);
          this.eventManager.broadcast({
              name: 'quizTaken',
              content: 'Quiz Was Taken'
          });
        }
    }

    private onSaveError() {
        this.isError = true;
    }

  　next() {
      console.log('next');
      this.correct = undefined;
      this.conjugatedVerbService.findForStudy().subscribe(
            (res: HttpResponse<ConjugatedVerb>) => this.onSuccess(res.body, res.headers),
            (res: HttpErrorResponse) => this.onError(res.message)
      );
    }

    private onSuccess(data, headers) {
        this.conjugatedVerb = data;
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
