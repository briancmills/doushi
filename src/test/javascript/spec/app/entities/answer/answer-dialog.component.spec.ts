/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { DoushiTestModule } from '../../../test.module';
import { AnswerDialogComponent } from '../../../../../../main/webapp/app/entities/answer/answer-dialog.component';
import { AnswerService } from '../../../../../../main/webapp/app/entities/answer/answer.service';
import { Answer } from '../../../../../../main/webapp/app/entities/answer/answer.model';
import { UserService } from '../../../../../../main/webapp/app/shared';
import { VerbService } from '../../../../../../main/webapp/app/entities/verb';
import { ConjugatedVerbService } from '../../../../../../main/webapp/app/entities/conjugated-verb';

describe('Component Tests', () => {

    describe('Answer Management Dialog Component', () => {
        let comp: AnswerDialogComponent;
        let fixture: ComponentFixture<AnswerDialogComponent>;
        let service: AnswerService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DoushiTestModule],
                declarations: [AnswerDialogComponent],
                providers: [
                    UserService,
                    VerbService,
                    ConjugatedVerbService,
                    AnswerService
                ]
            })
            .overrideTemplate(AnswerDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AnswerDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AnswerService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Answer(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.answer = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'answerListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Answer();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.answer = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'answerListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
