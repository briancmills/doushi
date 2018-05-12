/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { DoushiTestModule } from '../../../test.module';
import { ConjugatedVerbDialogComponent } from '../../../../../../main/webapp/app/entities/conjugated-verb/conjugated-verb-dialog.component';
import { ConjugatedVerbService } from '../../../../../../main/webapp/app/entities/conjugated-verb/conjugated-verb.service';
import { ConjugatedVerb } from '../../../../../../main/webapp/app/entities/conjugated-verb/conjugated-verb.model';
import { VerbService } from '../../../../../../main/webapp/app/entities/verb';

describe('Component Tests', () => {

    describe('ConjugatedVerb Management Dialog Component', () => {
        let comp: ConjugatedVerbDialogComponent;
        let fixture: ComponentFixture<ConjugatedVerbDialogComponent>;
        let service: ConjugatedVerbService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DoushiTestModule],
                declarations: [ConjugatedVerbDialogComponent],
                providers: [
                    VerbService,
                    ConjugatedVerbService
                ]
            })
            .overrideTemplate(ConjugatedVerbDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ConjugatedVerbDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ConjugatedVerbService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new ConjugatedVerb(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.conjugatedVerb = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'conjugatedVerbListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new ConjugatedVerb();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.conjugatedVerb = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'conjugatedVerbListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
