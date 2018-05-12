import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { ConjugatedVerb } from './conjugated-verb.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<ConjugatedVerb>;

@Injectable()
export class ConjugatedVerbService {

    private resourceUrl =  SERVER_API_URL + 'api/conjugated-verbs';

    constructor(private http: HttpClient) { }

    create(conjugatedVerb: ConjugatedVerb): Observable<EntityResponseType> {
        const copy = this.convert(conjugatedVerb);
        return this.http.post<ConjugatedVerb>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(conjugatedVerb: ConjugatedVerb): Observable<EntityResponseType> {
        const copy = this.convert(conjugatedVerb);
        return this.http.put<ConjugatedVerb>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ConjugatedVerb>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<ConjugatedVerb[]>> {
        const options = createRequestOption(req);
        return this.http.get<ConjugatedVerb[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<ConjugatedVerb[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: ConjugatedVerb = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<ConjugatedVerb[]>): HttpResponse<ConjugatedVerb[]> {
        const jsonResponse: ConjugatedVerb[] = res.body;
        const body: ConjugatedVerb[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to ConjugatedVerb.
     */
    private convertItemFromServer(conjugatedVerb: ConjugatedVerb): ConjugatedVerb {
        const copy: ConjugatedVerb = Object.assign({}, conjugatedVerb);
        return copy;
    }

    /**
     * Convert a ConjugatedVerb to a JSON which can be sent to the server.
     */
    private convert(conjugatedVerb: ConjugatedVerb): ConjugatedVerb {
        const copy: ConjugatedVerb = Object.assign({}, conjugatedVerb);
        return copy;
    }
}
