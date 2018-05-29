import { Component, OnInit, OnDestroy, ViewChildren } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiAlertService, JhiEventManager } from 'ng-jhipster';
import { Observable } from 'rxjs/Observable';
import { Principal, User } from '../../shared';

import { Answer } from '../answer/answer.model';
import { AnswerService } from '../answer/answer.service';
import { Verb } from '../verb/verb.model';
import { VerbService } from '../verb/verb.service';
import { ConjugatedVerb } from '../conjugated-verb/conjugated-verb.model';
import { ConjugatedVerbService } from '../conjugated-verb/conjugated-verb.service';

@Component({
    selector: 'jhi-verb',
    templateUrl: './lesson.component.html'
})
export class LessonComponent implements OnInit, OnDestroy {

    verb: Verb;
    conjugatedVerbs: ConjugatedVerb[];
    currentAccount: any;
    eventSubscriber: Subscription;
    predicate: any;
    correct: boolean;
    user: User;
    isError: boolean;
    nothingMoreToStudy: boolean;
    @ViewChildren('inputFocus') inputFocus;

    constructor(
        private verbService: VerbService,
        private conjugatedVerbService: ConjugatedVerbService,
        private answerService: AnswerService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal,
    ) {
        this.isError = false;
        this.nothingMoreToStudy = false;
        this.correct = undefined;
        this.principal = principal;
    }

    loadAll() {
        this.verbService.findForStudy().subscribe(
            (res: HttpResponse<Verb>) => this.onSuccess(res.body, res.headers),
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    reset() {
        this.verb = undefined;
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

    check() {
      // if they didn't provide an answer at all do nothing
      if (!this.verb.answer) {
        return;
      }
      if (this.verb.answer === this.verb.kanjiText) {
        this.correct = true;
      } else {
        this.correct = false;
      }

      const a = new Answer(
        undefined,
        this.correct,
        new Date().toISOString().replace( 'Z', '' ),
        this.verb.answer,
        this.currentAccount,
        this.verb,
        undefined
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
        this.jhiAlertService.error('doushiApp.answer.error', null, null);
    }

  　next() {
      console.log('next');
      this.correct = undefined;
      this.verbService.findForStudy().subscribe(
            (res: HttpResponse<Verb>) => this.onSuccess(res.body, res.headers),
            (res: HttpErrorResponse) => this.onError(res.message)
      );
      if (this.inputFocus && this.inputFocus.first) {
        setTimeout(() => { this.inputFocus.first.nativeElement.focus(); }, 1000);
      }
    }

    private onSuccess(data, headers) {
        this.verb = data;
        this.conjugatedVerbService.queryByVerb(this.verb.id)
            .subscribe((conjugatedVerbResponse: HttpResponse<ConjugatedVerb[]>) => {
                this.conjugatedVerbs = conjugatedVerbResponse.body;
            });
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
        if (error.indexOf('404 Not Found') > -1) {
          this.nothingMoreToStudy = true;
          this.verb = undefined;
        }
    }
}
