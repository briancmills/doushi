/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { DoushiTestModule } from '../../../test.module';
import { ConjugatedVerbDetailComponent } from '../../../../../../main/webapp/app/entities/conjugated-verb/conjugated-verb-detail.component';
import { ConjugatedVerbService } from '../../../../../../main/webapp/app/entities/conjugated-verb/conjugated-verb.service';
import { ConjugatedVerb } from '../../../../../../main/webapp/app/entities/conjugated-verb/conjugated-verb.model';

describe('Component Tests', () => {

    describe('ConjugatedVerb Management Detail Component', () => {
        let comp: ConjugatedVerbDetailComponent;
        let fixture: ComponentFixture<ConjugatedVerbDetailComponent>;
        let service: ConjugatedVerbService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DoushiTestModule],
                declarations: [ConjugatedVerbDetailComponent],
                providers: [
                    ConjugatedVerbService
                ]
            })
            .overrideTemplate(ConjugatedVerbDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ConjugatedVerbDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ConjugatedVerbService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new ConjugatedVerb(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.conjugatedVerb).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
