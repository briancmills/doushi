/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { DoushiTestModule } from '../../../test.module';
import { ConjugatedVerbDefinitionComponent } from '../../../../../../main/webapp/app/entities/conjugated-verb-definition/conjugated-verb-definition.component';
import { ConjugatedVerbDefinitionService } from '../../../../../../main/webapp/app/entities/conjugated-verb-definition/conjugated-verb-definition.service';
import { ConjugatedVerbDefinition } from '../../../../../../main/webapp/app/entities/conjugated-verb-definition/conjugated-verb-definition.model';

describe('Component Tests', () => {

    describe('ConjugatedVerbDefinition Management Component', () => {
        let comp: ConjugatedVerbDefinitionComponent;
        let fixture: ComponentFixture<ConjugatedVerbDefinitionComponent>;
        let service: ConjugatedVerbDefinitionService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DoushiTestModule],
                declarations: [ConjugatedVerbDefinitionComponent],
                providers: [
                    ConjugatedVerbDefinitionService
                ]
            })
            .overrideTemplate(ConjugatedVerbDefinitionComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ConjugatedVerbDefinitionComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ConjugatedVerbDefinitionService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new ConjugatedVerbDefinition(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.conjugatedVerbDefinitions[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
