/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { DoushiTestModule } from '../../../test.module';
import { VerbDetailComponent } from '../../../../../../main/webapp/app/entities/verb/verb-detail.component';
import { VerbService } from '../../../../../../main/webapp/app/entities/verb/verb.service';
import { Verb } from '../../../../../../main/webapp/app/entities/verb/verb.model';

describe('Component Tests', () => {

    describe('Verb Management Detail Component', () => {
        let comp: VerbDetailComponent;
        let fixture: ComponentFixture<VerbDetailComponent>;
        let service: VerbService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DoushiTestModule],
                declarations: [VerbDetailComponent],
                providers: [
                    VerbService
                ]
            })
            .overrideTemplate(VerbDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(VerbDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(VerbService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new Verb(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.verb).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
