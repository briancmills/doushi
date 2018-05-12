/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { DoushiTestModule } from '../../../test.module';
import { ConjugatedVerbDefinitionDetailComponent } from '../../../../../../main/webapp/app/entities/conjugated-verb-definition/conjugated-verb-definition-detail.component';
import { ConjugatedVerbDefinitionService } from '../../../../../../main/webapp/app/entities/conjugated-verb-definition/conjugated-verb-definition.service';
import { ConjugatedVerbDefinition } from '../../../../../../main/webapp/app/entities/conjugated-verb-definition/conjugated-verb-definition.model';

describe('Component Tests', () => {

    describe('ConjugatedVerbDefinition Management Detail Component', () => {
        let comp: ConjugatedVerbDefinitionDetailComponent;
        let fixture: ComponentFixture<ConjugatedVerbDefinitionDetailComponent>;
        let service: ConjugatedVerbDefinitionService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DoushiTestModule],
                declarations: [ConjugatedVerbDefinitionDetailComponent],
                providers: [
                    ConjugatedVerbDefinitionService
                ]
            })
            .overrideTemplate(ConjugatedVerbDefinitionDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ConjugatedVerbDefinitionDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ConjugatedVerbDefinitionService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new ConjugatedVerbDefinition(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.conjugatedVerbDefinition).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
