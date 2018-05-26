import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { Verb } from './verb.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Verb>;

@Injectable()
export class VerbService {

    private resourceUrl =  SERVER_API_URL + 'api/verbs';

    constructor(private http: HttpClient) { }

    create(verb: Verb): Observable<EntityResponseType> {
        const copy = this.convert(verb);
        return this.http.post<Verb>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(verb: Verb): Observable<EntityResponseType> {
        const copy = this.convert(verb);
        return this.http.put<Verb>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Verb>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Verb[]>> {
        const options = createRequestOption(req);
        return this.http.get<Verb[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Verb[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Verb = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Verb[]>): HttpResponse<Verb[]> {
        const jsonResponse: Verb[] = res.body;
        const body: Verb[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Verb.
     */
    private convertItemFromServer(verb: Verb): Verb {
        const copy: Verb = Object.assign({}, verb);
        copy.searchText = copy.definition + ' ' + copy.kanjiText + ' ' + copy.type + ' ' + ' ' + copy.romanjiText + ' ';
        return copy;
    }

    /**
     * Convert a Verb to a JSON which can be sent to the server.
     */
    private convert(verb: Verb): Verb {
        const copy: Verb = Object.assign({}, verb);
        copy.searchText = copy.definition + ' ' + copy.kanjiText + ' ' + copy.type + ' ' + ' ' + copy.romanjiText + ' ';
        return copy;
    }
}
