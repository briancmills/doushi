/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { DoushiTestModule } from '../../../test.module';
import { VerbDefinitionComponent } from '../../../../../../main/webapp/app/entities/verb-definition/verb-definition.component';
import { VerbDefinitionService } from '../../../../../../main/webapp/app/entities/verb-definition/verb-definition.service';
import { VerbDefinition } from '../../../../../../main/webapp/app/entities/verb-definition/verb-definition.model';

describe('Component Tests', () => {

    describe('VerbDefinition Management Component', () => {
        let comp: VerbDefinitionComponent;
        let fixture: ComponentFixture<VerbDefinitionComponent>;
        let service: VerbDefinitionService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DoushiTestModule],
                declarations: [VerbDefinitionComponent],
                providers: [
                    VerbDefinitionService
                ]
            })
            .overrideTemplate(VerbDefinitionComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(VerbDefinitionComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(VerbDefinitionService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new VerbDefinition(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.verbDefinitions[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
