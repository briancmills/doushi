/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { DoushiTestModule } from '../../../test.module';
import { ConjugatedVerbComponent } from '../../../../../../main/webapp/app/entities/conjugated-verb/conjugated-verb.component';
import { ConjugatedVerbService } from '../../../../../../main/webapp/app/entities/conjugated-verb/conjugated-verb.service';
import { ConjugatedVerb } from '../../../../../../main/webapp/app/entities/conjugated-verb/conjugated-verb.model';

describe('Component Tests', () => {

    describe('ConjugatedVerb Management Component', () => {
        let comp: ConjugatedVerbComponent;
        let fixture: ComponentFixture<ConjugatedVerbComponent>;
        let service: ConjugatedVerbService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DoushiTestModule],
                declarations: [ConjugatedVerbComponent],
                providers: [
                    ConjugatedVerbService
                ]
            })
            .overrideTemplate(ConjugatedVerbComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ConjugatedVerbComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ConjugatedVerbService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new ConjugatedVerb(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.conjugatedVerbs[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
