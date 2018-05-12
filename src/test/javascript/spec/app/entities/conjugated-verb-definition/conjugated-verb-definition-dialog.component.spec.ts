/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { DoushiTestModule } from '../../../test.module';
import { ConjugatedVerbDefinitionDialogComponent } from '../../../../../../main/webapp/app/entities/conjugated-verb-definition/conjugated-verb-definition-dialog.component';
import { ConjugatedVerbDefinitionService } from '../../../../../../main/webapp/app/entities/conjugated-verb-definition/conjugated-verb-definition.service';
import { ConjugatedVerbDefinition } from '../../../../../../main/webapp/app/entities/conjugated-verb-definition/conjugated-verb-definition.model';
import { ConjugatedVerbService } from '../../../../../../main/webapp/app/entities/conjugated-verb';

describe('Component Tests', () => {

    describe('ConjugatedVerbDefinition Management Dialog Component', () => {
        let comp: ConjugatedVerbDefinitionDialogComponent;
        let fixture: ComponentFixture<ConjugatedVerbDefinitionDialogComponent>;
        let service: ConjugatedVerbDefinitionService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DoushiTestModule],
                declarations: [ConjugatedVerbDefinitionDialogComponent],
                providers: [
                    ConjugatedVerbService,
                    ConjugatedVerbDefinitionService
                ]
            })
            .overrideTemplate(ConjugatedVerbDefinitionDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ConjugatedVerbDefinitionDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ConjugatedVerbDefinitionService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new ConjugatedVerbDefinition(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.conjugatedVerbDefinition = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'conjugatedVerbDefinitionListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new ConjugatedVerbDefinition();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.conjugatedVerbDefinition = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'conjugatedVerbDefinitionListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
