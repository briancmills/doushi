/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { DoushiTestModule } from '../../../test.module';
import { AnswerComponent } from '../../../../../../main/webapp/app/entities/answer/answer.component';
import { AnswerService } from '../../../../../../main/webapp/app/entities/answer/answer.service';
import { Answer } from '../../../../../../main/webapp/app/entities/answer/answer.model';

describe('Component Tests', () => {

    describe('Answer Management Component', () => {
        let comp: AnswerComponent;
        let fixture: ComponentFixture<AnswerComponent>;
        let service: AnswerService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DoushiTestModule],
                declarations: [AnswerComponent],
                providers: [
                    AnswerService
                ]
            })
            .overrideTemplate(AnswerComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AnswerComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AnswerService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Answer(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.answers[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
