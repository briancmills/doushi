/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { DoushiTestModule } from '../../../test.module';
import { VerbComponent } from '../../../../../../main/webapp/app/entities/verb/verb.component';
import { VerbService } from '../../../../../../main/webapp/app/entities/verb/verb.service';
import { Verb } from '../../../../../../main/webapp/app/entities/verb/verb.model';

describe('Component Tests', () => {

    describe('Verb Management Component', () => {
        let comp: VerbComponent;
        let fixture: ComponentFixture<VerbComponent>;
        let service: VerbService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DoushiTestModule],
                declarations: [VerbComponent],
                providers: [
                    VerbService
                ]
            })
            .overrideTemplate(VerbComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(VerbComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(VerbService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Verb(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.verbs[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
