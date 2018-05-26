/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { DoushiTestModule } from '../../../test.module';
import { UserVerbFormLevelDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/user-verb-form-level/user-verb-form-level-delete-dialog.component';
import { UserVerbFormLevelService } from '../../../../../../main/webapp/app/entities/user-verb-form-level/user-verb-form-level.service';

describe('Component Tests', () => {

    describe('UserVerbFormLevel Management Delete Component', () => {
        let comp: UserVerbFormLevelDeleteDialogComponent;
        let fixture: ComponentFixture<UserVerbFormLevelDeleteDialogComponent>;
        let service: UserVerbFormLevelService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DoushiTestModule],
                declarations: [UserVerbFormLevelDeleteDialogComponent],
                providers: [
                    UserVerbFormLevelService
                ]
            })
            .overrideTemplate(UserVerbFormLevelDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(UserVerbFormLevelDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(UserVerbFormLevelService);
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
