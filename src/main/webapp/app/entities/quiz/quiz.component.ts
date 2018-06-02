import { Component, OnInit, OnDestroy, ViewChildren } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiAlertService, JhiEventManager } from 'ng-jhipster';

import { Observable } from 'rxjs/Observable';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { ConjugatedVerb } from '../conjugated-verb/conjugated-verb.model';
import { ConjugatedVerbService } from '../conjugated-verb/conjugated-verb.service';
import { Verb } from '../verb/verb.model';
import { VerbService } from '../verb/verb.service';
import { Answer } from '../answer/answer.model';
import { AnswerService } from '../answer/answer.service';
import { Principal, User } from '../../shared';
declare var wanakana: any;

@Component({
    selector: 'jhi-verb',
    templateUrl: './quiz.component.html'
})
export class QuizComponent implements OnInit, OnDestroy {

    conjugatedVerb: ConjugatedVerb;
    verb: Verb;
    currentAccount: any;
    eventSubscriber: Subscription;
    predicate: any;
    correct: boolean;
    user: User;
    isError: boolean;
    noMoreVerbs: boolean;
    noMoreConjugatedVerbs: boolean;
    @ViewChildren('inputFocus') inputFocus;
    @ViewChildren('inputFocus2') inputFocus2;
    lastQuizWasVerb: boolean;
    loading: boolean;

    constructor(
        private conjugatedVerbService: ConjugatedVerbService,
        private verbService: VerbService,
        private answerService: AnswerService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal,
    ) {
        this.isError = false;
        this.noMoreVerbs = false;
        this.noMoreConjugatedVerbs = false;
        this.correct = undefined;
        this.principal = principal;
        this.lastQuizWasVerb = false;
    }

    loadAll() {
        this.loading = true;
        const conjugatedVerbRequest = this.conjugatedVerbService.findForStudy();
        const verbRequest = this.verbService.findForStudy();
        conjugatedVerbRequest.subscribe(
            (res: HttpResponse<ConjugatedVerb>) => this.onConjugatedVerbSuccess(res.body, res.headers),
            (res: HttpErrorResponse) => this.onConjugatedVerbError(res.message)
        );
        verbRequest.subscribe(
            (res: HttpResponse<ConjugatedVerb>) => this.onVerbSuccess(res.body, res.headers),
            (res: HttpErrorResponse) => this.onVerbError(res.message)
        );
        forkJoin([conjugatedVerbRequest, verbRequest]).subscribe(
          (results) => this.onBothDone(),
          (res: HttpErrorResponse) => this.onBothDone());
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
      if (!(this.conjugatedVerb && this.conjugatedVerb.answer) && !(this.verb && this.verb.answer)) {
        return;
      }

      if (this.conjugatedVerb && this.conjugatedVerb.answer) {
        if (wanakana.toKana(this.conjugatedVerb.answer) === wanakana.toKana(this.conjugatedVerb.romanjiText)) {
          this.correct = true;
        } else {
          // hack to get the display text to be in kana
          this.conjugatedVerb.kanaText = wanakana.toKana(this.conjugatedVerb.romanjiText);
          this.correct = false;
        }
      } else {
        if (wanakana.toKana(this.verb.answer) === wanakana.toKana(this.verb.romanjiText)) {
          this.correct = true;
        } else {
          // hack to get the display text to be in kana
          this.verb.kanaText = wanakana.toKana(this.verb.romanjiText);
          this.correct = false;
        }
      }

      const a = new Answer(
        undefined,
        this.correct,
        undefined, // let the backend fill the date in
        wanakana.toKana(this.conjugatedVerb && this.conjugatedVerb.answer ? this.conjugatedVerb.answer : this.verb.answer),
        this.currentAccount,
        this.verb && this.verb.answer ? this.verb : undefined,
        this.conjugatedVerb && this.conjugatedVerb.answer ? this.conjugatedVerb : undefined
      );

      this.subscribeToSaveAnswerResponse(
          this.answerService.create(a));
    }

    private subscribeToSaveAnswerResponse(result: Observable<HttpResponse<Answer>>) {
        result.subscribe((res: HttpResponse<Answer>) =>
            this.onSaveAnswerSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveAnswerSuccess(result: Answer) {
        if (this.correct) {
          setTimeout(() => { this.next(); }, 2000);
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
      this.correct = undefined;
      this.loadAll();
    }

    private onConjugatedVerbSuccess(data, headers) {
        this.conjugatedVerb = data;
    }
    private onVerbSuccess(data, headers) {
        this.verb = data;
    }
    private onBothDone() {
      if (this.lastQuizWasVerb) {
        if (this.conjugatedVerb) {
          this.lastQuizWasVerb = false;
        } else if (this.verb) {
          this.lastQuizWasVerb = true;
        }
      } else {
        if (this.verb) {
          this.lastQuizWasVerb = true;
        } else if (this.conjugatedVerb) {
          this.lastQuizWasVerb = false;
        }
      }
      this.loading = false;
      setTimeout(() => {
        if (this.inputFocus && this.inputFocus.first) {
          wanakana.bind(this.inputFocus.first.nativeElement);
          this.inputFocus.first.nativeElement.focus();
        } else if (this.inputFocus2 && this.inputFocus2.first) {
          wanakana.bind(this.inputFocus2.first.nativeElement);
          this.inputFocus2.first.nativeElement.focus();
        }
      }, 1000);
    }

    private onVerbError(error) {
        this.jhiAlertService.error(error.message, null, null);
        if (error.indexOf('404') > -1) {
          this.noMoreVerbs = true;
          this.verb = undefined;
        }
    }

    private onConjugatedVerbError(error) {
        this.jhiAlertService.error(error.message, null, null);
        if (error.indexOf('404') > -1) {
          this.noMoreConjugatedVerbs = true;
          this.conjugatedVerb = undefined;
        }
    }
}
