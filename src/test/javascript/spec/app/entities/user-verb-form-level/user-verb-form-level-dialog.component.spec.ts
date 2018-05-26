/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { DoushiTestModule } from '../../../test.module';
import { UserVerbFormLevelDialogComponent } from '../../../../../../main/webapp/app/entities/user-verb-form-level/user-verb-form-level-dialog.component';
import { UserVerbFormLevelService } from '../../../../../../main/webapp/app/entities/user-verb-form-level/user-verb-form-level.service';
import { UserVerbFormLevel } from '../../../../../../main/webapp/app/entities/user-verb-form-level/user-verb-form-level.model';
import { UserService } from '../../../../../../main/webapp/app/shared';
import { VerbService } from '../../../../../../main/webapp/app/entities/verb';
import { ConjugatedVerbService } from '../../../../../../main/webapp/app/entities/conjugated-verb';

describe('Component Tests', () => {

    describe('UserVerbFormLevel Management Dialog Component', () => {
        let comp: UserVerbFormLevelDialogComponent;
        let fixture: ComponentFixture<UserVerbFormLevelDialogComponent>;
        let service: UserVerbFormLevelService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DoushiTestModule],
                declarations: [UserVerbFormLevelDialogComponent],
                providers: [
                    UserService,
                    VerbService,
                    ConjugatedVerbService,
                    UserVerbFormLevelService
                ]
            })
            .overrideTemplate(UserVerbFormLevelDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(UserVerbFormLevelDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(UserVerbFormLevelService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new UserVerbFormLevel(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.userVerbFormLevel = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'userVerbFormLevelListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new UserVerbFormLevel();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.userVerbFormLevel = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'userVerbFormLevelListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
