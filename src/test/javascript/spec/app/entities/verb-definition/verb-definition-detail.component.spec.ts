/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { DoushiTestModule } from '../../../test.module';
import { VerbDefinitionDetailComponent } from '../../../../../../main/webapp/app/entities/verb-definition/verb-definition-detail.component';
import { VerbDefinitionService } from '../../../../../../main/webapp/app/entities/verb-definition/verb-definition.service';
import { VerbDefinition } from '../../../../../../main/webapp/app/entities/verb-definition/verb-definition.model';

describe('Component Tests', () => {

    describe('VerbDefinition Management Detail Component', () => {
        let comp: VerbDefinitionDetailComponent;
        let fixture: ComponentFixture<VerbDefinitionDetailComponent>;
        let service: VerbDefinitionService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DoushiTestModule],
                declarations: [VerbDefinitionDetailComponent],
                providers: [
                    VerbDefinitionService
                ]
            })
            .overrideTemplate(VerbDefinitionDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(VerbDefinitionDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(VerbDefinitionService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new VerbDefinition(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.verbDefinition).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
