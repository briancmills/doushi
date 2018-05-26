/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { DoushiTestModule } from '../../../test.module';
import { UserVerbFormLevelComponent } from '../../../../../../main/webapp/app/entities/user-verb-form-level/user-verb-form-level.component';
import { UserVerbFormLevelService } from '../../../../../../main/webapp/app/entities/user-verb-form-level/user-verb-form-level.service';
import { UserVerbFormLevel } from '../../../../../../main/webapp/app/entities/user-verb-form-level/user-verb-form-level.model';

describe('Component Tests', () => {

    describe('UserVerbFormLevel Management Component', () => {
        let comp: UserVerbFormLevelComponent;
        let fixture: ComponentFixture<UserVerbFormLevelComponent>;
        let service: UserVerbFormLevelService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DoushiTestModule],
                declarations: [UserVerbFormLevelComponent],
                providers: [
                    UserVerbFormLevelService
                ]
            })
            .overrideTemplate(UserVerbFormLevelComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(UserVerbFormLevelComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(UserVerbFormLevelService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new UserVerbFormLevel(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.userVerbFormLevels[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
