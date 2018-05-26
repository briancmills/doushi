/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { DoushiTestModule } from '../../../test.module';
import { UserVerbFormLevelDetailComponent } from '../../../../../../main/webapp/app/entities/user-verb-form-level/user-verb-form-level-detail.component';
import { UserVerbFormLevelService } from '../../../../../../main/webapp/app/entities/user-verb-form-level/user-verb-form-level.service';
import { UserVerbFormLevel } from '../../../../../../main/webapp/app/entities/user-verb-form-level/user-verb-form-level.model';

describe('Component Tests', () => {

    describe('UserVerbFormLevel Management Detail Component', () => {
        let comp: UserVerbFormLevelDetailComponent;
        let fixture: ComponentFixture<UserVerbFormLevelDetailComponent>;
        let service: UserVerbFormLevelService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DoushiTestModule],
                declarations: [UserVerbFormLevelDetailComponent],
                providers: [
                    UserVerbFormLevelService
                ]
            })
            .overrideTemplate(UserVerbFormLevelDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(UserVerbFormLevelDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(UserVerbFormLevelService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new UserVerbFormLevel(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.userVerbFormLevel).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
