/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { DoushiTestModule } from '../../../test.module';
import { ConjugatedVerbDefinitionDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/conjugated-verb-definition/conjugated-verb-definition-delete-dialog.component';
import { ConjugatedVerbDefinitionService } from '../../../../../../main/webapp/app/entities/conjugated-verb-definition/conjugated-verb-definition.service';

describe('Component Tests', () => {

    describe('ConjugatedVerbDefinition Management Delete Component', () => {
        let comp: ConjugatedVerbDefinitionDeleteDialogComponent;
        let fixture: ComponentFixture<ConjugatedVerbDefinitionDeleteDialogComponent>;
        let service: ConjugatedVerbDefinitionService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DoushiTestModule],
                declarations: [ConjugatedVerbDefinitionDeleteDialogComponent],
                providers: [
                    ConjugatedVerbDefinitionService
                ]
            })
            .overrideTemplate(ConjugatedVerbDefinitionDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ConjugatedVerbDefinitionDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ConjugatedVerbDefinitionService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(Observable.of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
